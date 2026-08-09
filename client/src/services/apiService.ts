import type { VoterProfile, ElectoralDistrict, PoliticalParty, Candidate, ElectionInfo, ElectionResults } from '../types';

const API_BASE = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' 
  ? '/api' 
  : 'http://localhost:5000/api';

export const apiService = {
  // Get active election details
  async getElectionInfo(): Promise<ElectionInfo> {
    const res = await fetch(`${API_BASE}/election`);
    if (!res.ok) throw new Error('Failed to fetch election details');
    const data = await res.json();
    return data.election;
  },

  // Get list of electoral districts
  async getDistricts(): Promise<ElectoralDistrict[]> {
    const res = await fetch(`${API_BASE}/districts`);
    if (!res.ok) throw new Error('Failed to fetch districts');
    const data = await res.json();
    return data.districts;
  },

  // Get political parties
  async getParties(): Promise<PoliticalParty[]> {
    const res = await fetch(`${API_BASE}/parties`);
    if (!res.ok) throw new Error('Failed to fetch parties');
    const data = await res.json();
    return data.parties;
  },

  // Get candidates (by district/party)
  async getCandidates(districtId?: string, partyId?: string): Promise<Candidate[]> {
    const query = new URLSearchParams();
    if (districtId) query.append('districtId', districtId);
    if (partyId) query.append('partyId', partyId);

    const res = await fetch(`${API_BASE}/candidates?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch candidates');
    const data = await res.json();
    return data.candidates;
  },

  // Verify identity (NIC / Passport / DL)
  async verifyIdentity(identityType: string, documentNumber: string, dateOfBirth?: string): Promise<{ voter: VoterProfile; token: string; message: string }> {
    const res = await fetch(`${API_BASE}/verify-identity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identityType, documentNumber, dateOfBirth })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    return data;
  },

  // Cast anonymous ballot
  async castVote(voterId: string, districtId: string, partyId: string, candidateIds: string[]): Promise<{ success: boolean; receiptCode: string; message: string }> {
    const res = await fetch(`${API_BASE}/cast-vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voterId, districtId, partyId, candidateIds })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit ballot');
    return data;
  },

  // Get live election results summary
  async getResults(): Promise<ElectionResults> {
    const res = await fetch(`${API_BASE}/results`);
    if (!res.ok) throw new Error('Failed to fetch election results');
    return await res.json();
  },

  // Admin Login
  async adminLogin(username: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Admin login failed');
    return data;
  },

  // Admin Update Status
  async adminUpdateStatus(status: string, token: string) {
    const res = await fetch(`${API_BASE}/admin/election-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status');
    return data;
  },

  // Admin Get Voters
  async adminGetVoters(token: string): Promise<VoterProfile[]> {
    const res = await fetch(`${API_BASE}/admin/voters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch voter roll');
    return data.voters;
  },

  // Admin Add Candidate
  async adminAddCandidate(candidateData: any, token: string): Promise<Candidate> {
    const res = await fetch(`${API_BASE}/admin/candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(candidateData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add candidate');
    return data.candidate;
  }
};
