import React, { useEffect, useState } from 'react';
import { Download, FileSpreadsheet, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { apiService } from '../services/apiService';
import { generatePdfReport } from '../services/pdfReportGenerator';
import { exportResultsCsv } from '../services/csvExporter';
import type { ElectionResults } from '../types';

export const ResultsPage: React.FC = () => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();

  const [results, setResults] = useState<ElectionResults | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(
    sessionStorage.getItem('results_unlocked') === 'true'
  );
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const fetchResultsData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getResults();
      setResults(data);
    } catch (err) {
      console.error('Failed to load election results', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcodeInput.trim().toLowerCase();
    if (clean === 'election2026' || clean === 'results2026' || clean === 'admin') {
      setIsUnlocked(true);
      sessionStorage.setItem('results_unlocked', 'true');
      setPasscodeError(null);
    } else {
      setPasscodeError('Invalid passcode. Use the passcode displayed below.');
    }
  };

  const handleQuickUnlock = () => {
    setPasscodeInput('election2026');
    setIsUnlocked(true);
    sessionStorage.setItem('results_unlocked', 'true');
    setPasscodeError(null);
  };

  // 1. Password Protection Lock Screen
  if (!isUnlocked) {
    return (
      <div className="max-w-md mx-auto py-12 space-y-6">
        <div className="bg-[#0B192C] text-white p-8 rounded-2xl border-b-4 border-[#C5A059] shadow-xl text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Protected Live Results Center</h1>
          <p className="text-slate-300 text-xs">Authentication required to view official election tally & decision report</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-center space-y-2">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">Access Passcode</div>
            <div className="text-2xl font-mono font-extrabold text-[#0B192C] bg-white py-2 px-4 rounded-lg border border-amber-200 shadow-xs inline-block">
              election2026
            </div>
            <p className="text-[11px] text-amber-800 font-medium">
              Enter this passcode below or click the quick unlock button to view live results.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enter Results Passcode</label>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="e.g. election2026"
                className="w-full p-3.5 rounded-xl border-2 border-slate-300 focus:border-[#0B192C] font-semibold text-slate-900 text-base"
              />
            </div>

            {passcodeError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {passcodeError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow transition-all text-base"
            >
              Unlock Live Results Center
            </button>
          </form>

          <button
            type="button"
            onClick={handleQuickUnlock}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors border border-slate-200"
          >
            ⚡ Auto-Fill "election2026" & Unlock Now
          </button>
        </div>
      </div>
    );
  }

  if (loading || !results) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-500 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-[#C5A059] mx-auto" />
        <div>Fetching live election simulation results...</div>
      </div>
    );
  }

  // Format Recharts data
  const chartData = results.partyResults.map(p => ({
    name: p.partyCode,
    votes: p.votes,
    seats: p.seatsWon,
    percentage: p.percentage,
    fill: p.color
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider w-fit mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>SIMULATION DATA — NOT OFFICIAL ELECTION RESULTS</span>
          </div>
          <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
            {t('resultsCenter')}
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Official Parliamentary General Election Seat Allocations & Vote Shares
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => generatePdfReport(results)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>{t('downloadPdf')}</span>
          </button>

          <button
            onClick={() => exportResultsCsv(results)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all text-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>{t('exportCsv')}</span>
          </button>
        </div>
      </div>

      {/* Outcome Decision Summary Banner */}
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-lg">
            <Award className="w-6 h-6 text-amber-600" />
            <span>Final Simulated Election Outcome</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-bold text-xs">
            AUTOMATED SEAT CALCULATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase">{t('winningParty')}</div>
            <div className="text-xl font-extrabold text-slate-900 mt-1" style={{ color: results.outcome.winningPartyColor }}>
              {results.outcome.winningParty} ({results.outcome.winningPartyCode})
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase">{t('seatsWon')}</div>
            <div className="text-2xl font-extrabold text-[#0B192C] mt-1">
              {results.outcome.seatsWon} / 225 Seats
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase">{t('majorityStatus')}</div>
            <div className="text-base font-extrabold text-red-800 mt-1">
              {results.outcome.majorityStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Key Turnout Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">{t('turnoutTitle')}</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">{results.turnoutPercentage}%</div>
          <div className="text-xs text-slate-400 mt-1">Simulated Voter Participation</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">{t('totalCast')}</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{results.totalVotesCast.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Ballots Recorded in Vault</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">{t('validVotes')}</div>
          <div className="text-3xl font-extrabold text-blue-700 mt-1">{results.validVotes.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">Valid Preferences Counted</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">{t('invalidVotes')}</div>
          <div className="text-3xl font-extrabold text-slate-400 mt-1">{results.invalidVotes}</div>
          <div className="text-xs text-slate-400 mt-1">Rejected Ballots</div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Vote Share */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Party Vote Count Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Seat Distribution */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Parliamentary Seats Allocated (225 Seats)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="seats"
                  label={(entry: any) => `${entry.name}: ${entry.seats}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detailed Party Results Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-900 text-white font-bold text-lg flex items-center justify-between">
          <span>Party Performance Summary</span>
          <span className="text-xs text-[#C5A059]">Sri Lankan Proportional Representation Hare Quota</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Party Code</th>
                <th className="p-4">Political Party Name</th>
                <th className="p-4 text-right">Votes Received</th>
                <th className="p-4 text-right">Vote Share %</th>
                <th className="p-4 text-right">Seats Allocated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.partyResults.map(party => (
                <tr key={party.partyId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-extrabold" style={{ color: party.color }}>
                    {party.partyCode}
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    {party.partyNameEn}
                    <div className="text-xs font-normal text-slate-500">{party.partyNameSi} • {party.partyNameTa}</div>
                  </td>
                  <td className="p-4 text-right font-semibold text-slate-900">
                    {party.votes.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-semibold text-slate-900">
                    {party.percentage}%
                  </td>
                  <td className="p-4 text-right font-extrabold text-[#0B192C] text-base">
                    {party.seatsWon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
