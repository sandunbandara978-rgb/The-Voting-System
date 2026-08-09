import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, PlusCircle, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import type { VoterProfile, PoliticalParty, ElectoralDistrict } from '../types';

export const AdminPage: React.FC = () => {
  const { adminToken, login, logout, isAdminLoggedIn } = useAuth();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('election2026');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Admin Dashboard State
  const [voters, setVoters] = useState<VoterProfile[]>([]);
  const [electionStatus, setElectionStatus] = useState<string>('ACTIVE');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'voters' | 'candidates'>('overview');

  // New Candidate Form State
  const [candNameEn, setCandNameEn] = useState('');
  const [candNameSi, setCandNameSi] = useState('');
  const [candNameTa, setCandNameTa] = useState('');
  const [candPartyId, setCandPartyId] = useState('party-npp');
  const [candDistrictId, setCandDistrictId] = useState('dist-01');
  const [candNumber, setCandNumber] = useState(4);
  const [candSuccessMsg, setCandSuccessMsg] = useState<string | null>(null);

  const [parties, setParties] = useState<PoliticalParty[]>([]);
  const [districts, setDistricts] = useState<ElectoralDistrict[]>([]);

  useEffect(() => {
    if (isAdminLoggedIn && adminToken) {
      loadAdminData();
    }
  }, [isAdminLoggedIn, adminToken]);

  const loadAdminData = async () => {
    try {
      if (adminToken) {
        const vList = await apiService.adminGetVoters(adminToken);
        setVoters(vList);
      }
      const fetchedParties = await apiService.getParties();
      setParties(fetchedParties);
      const fetchedDistricts = await apiService.getDistricts();
      setDistricts(fetchedDistricts);
      const elec = await apiService.getElectionInfo();
      setElectionStatus(elec.status);
    } catch (err) {
      console.error('Error loading admin data', err);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await apiService.adminLogin(username, password);
      login(res.token, res.user);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    }
  };

  const handleToggleStatus = async (newStatus: string) => {
    if (!adminToken) return;
    try {
      await apiService.adminUpdateStatus(newStatus, adminToken);
      setElectionStatus(newStatus);
    } catch (err: any) {
      alert(err.message || 'Failed to update election status');
    }
  };

  const handleAddCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken || !candNameEn) return;
    try {
      await apiService.adminAddCandidate({
        candidateNumber: candNumber,
        fullNameEn: candNameEn,
        fullNameSi: candNameSi || candNameEn,
        fullNameTa: candNameTa || candNameEn,
        partyId: candPartyId,
        districtId: candDistrictId,
        photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${candNameEn}`,
        occupationEn: 'Public Representative',
        occupationSi: 'ජනතා නියෝජිත',
        occupationTa: 'மக்கள் பிரதிநிதி',
        isActive: true
      }, adminToken);

      setCandSuccessMsg(`Candidate ${candNameEn} successfully registered!`);
      setCandNameEn('');
      setCandNameSi('');
      setCandNameTa('');
    } catch (err: any) {
      alert(err.message || 'Failed to add candidate');
    }
  };

  // Filtered Voters for search
  const filteredVoters = voters.filter(v => 
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If Not Logged In -> Show Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-12 space-y-6">
        <div className="bg-[#0B192C] text-white p-8 rounded-2xl border-b-4 border-[#C5A059] shadow-xl text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Official Election Officer Portal</h1>
          <p className="text-slate-300 text-xs">Administrative Login & Turnout Control</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Default demo username: admin</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Default demo password: election2026</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-bold">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow transition-all text-base"
          >
            Authenticate Admin Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="bg-[#0B192C] text-white p-6 rounded-2xl border-l-8 border-[#C5A059] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Chief Election Commissioner Control Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Election Administration</h1>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors self-start sm:self-auto"
        >
          Sign Out Admin
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'overview' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Election Control & Status
        </button>
        <button
          onClick={() => setActiveTab('voters')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'voters' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Voter Roll & Verification ({voters.length})
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'candidates' ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Candidate & Party Management
        </button>
      </div>

      {/* TAB 1: Election Control & Status */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Election Lifecycle State</h3>
            <div className="flex items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                electionStatus === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                STATUS: {electionStatus}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus('ACTIVE')}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Open Polls (ACTIVE)
                </button>
                <button
                  onClick={() => handleToggleStatus('CLOSED')}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Close Polls (CLOSED)
                </button>
                <button
                  onClick={() => handleToggleStatus('FINALIZED')}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Finalize & Publish (FINALIZED)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Voter Roll & Verification Audit */}
      {activeTab === 'voters' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Electoral Roll Verification Roll</h3>
              <p className="text-xs text-slate-500">Ballot secrecy enforced: Candidate choices are completely decoupled and hidden.</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search voter by name or NIC..."
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Doc Type</th>
                  <th className="p-3">Doc Number</th>
                  <th className="p-3">Voter Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3">Voting Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVoters.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-700">{v.identityType}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{v.documentNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{v.fullName}</td>
                    <td className="p-3 font-semibold text-slate-700">{v.age} Yrs</td>
                    <td className="p-3 text-slate-600">Colombo ({v.divisionName})</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        ✓ VERIFIED
                      </span>
                    </td>
                    <td className="p-3">
                      {v.hasVoted ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                          VOTE CAST
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold text-[10px]">
                          NOT YET VOTED
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Candidate & Party Management */}
      {activeTab === 'candidates' && (
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#C5A059]" />
            <span>Add Candidate to Election Roster</span>
          </h3>

          <form onSubmit={handleAddCandidateSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Candidate Full Name (English)</label>
              <input
                type="text"
                value={candNameEn}
                onChange={e => setCandNameEn(e.target.value)}
                placeholder="e.g. Dr. Malini Jayaratne"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Political Party</label>
                <select
                  value={candPartyId}
                  onChange={e => setCandPartyId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                >
                  {parties.map(p => (
                    <option key={p.id} value={p.id}>{p.code} - {p.nameEn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Electoral District</label>
                <select
                  value={candDistrictId}
                  onChange={e => setCandDistrictId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                >
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.code} - {d.nameEn}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Candidate Number</label>
                <input
                  type="number"
                  value={candNumber}
                  onChange={e => setCandNumber(parseInt(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                  min={1}
                  max={99}
                />
              </div>
            </div>

            {candSuccessMsg && (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs">
                {candSuccessMsg}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-bold rounded-xl text-sm transition-all shadow"
            >
              Register Candidate
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
