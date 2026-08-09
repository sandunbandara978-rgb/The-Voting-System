export type IdentityType = 'NIC' | 'PASSPORT' | 'DRIVING_LICENCE';

export interface VoterProfile {
  id: string;
  identityType: IdentityType;
  documentNumber: string;
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  age: number;
  districtId: string;
  divisionName: string;
  isVerified: boolean;
  hasVoted: boolean;
  votedAt?: string;
}

export interface ElectoralDistrict {
  id: string;
  code: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  seats: number;
  registeredVoters: number;
  divisions: string[];
}

export interface PoliticalParty {
  id: string;
  code: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  symbolName: string;
  symbolSvg: string; // SVG data or path
  color: string;
  sloganEn: string;
  sloganSi: string;
  sloganTa: string;
}

export interface Candidate {
  id: string;
  candidateNumber: number;
  fullNameEn: string;
  fullNameSi: string;
  fullNameTa: string;
  partyId: string;
  districtId: string;
  photoUrl: string;
  occupationEn: string;
  occupationSi: string;
  occupationTa: string;
  isActive: boolean;
}

export interface AnonymousBallot {
  id: string;
  electionId: string;
  districtId: string;
  partyId: string;
  candidateIds: string[];
  timestamp: string;
  hashReceipt: string;
}

export interface Election {
  id: string;
  titleEn: string;
  titleSi: string;
  titleTa: string;
  date: string;
  status: 'UPCOMING' | 'ACTIVE' | 'CLOSED' | 'FINALIZED';
  totalRegisteredVoters: number;
  maxCandidatePreferences: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  details: string;
  ipAddress?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'SUPER_ADMIN' | 'ELECTION_OFFICER';
  name: string;
}
