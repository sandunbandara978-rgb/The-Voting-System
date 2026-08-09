import React from 'react';
import { ShieldCheck, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';

interface ElectionInfoPageProps {
  onNavigate: (tab: string) => void;
}

export const ElectionInfoPage: React.FC<ElectionInfoPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { voter } = useVoting();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center gap-3 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          <span>Step 3 of 6 — Election Instructions</span>
        </div>
        <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {t('electionInfo')}
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Review Sri Lankan General Election rules and voting instructions before casting your ballot.
        </p>
      </div>

      {/* Instructions Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* District Card */}
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#C5A059] font-bold uppercase tracking-wider">Assigned District</div>
            <div className="text-xl font-extrabold">Colombo Electoral District (COL)</div>
            <div className="text-xs text-slate-400 mt-0.5">Polling Division: {voter?.divisionName || 'Colombo Fort'} • 19 Allocated Seats</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-bold text-xl">
            19
          </div>
        </div>

        {/* Voting Rules List */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-600" />
            <span>Official Voting Rules & Procedure</span>
          </h3>

          <ul className="space-y-3 text-slate-700 text-sm md:text-base leading-relaxed">
            <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Party / Group Selection:</strong> You must select <strong>ONE</strong> Political Party or Independent Group on the digital ballot.
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Candidate Preferences:</strong> You may optionally choose up to <strong>3 candidate numbers</strong> from your selected party.
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Review & Confirmation:</strong> Before final submission, you will be shown a full review screen with party photographs and candidate preference numbers.
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Strict Ballot Secrecy:</strong> Once submitted, your vote is anonymized in the ballot vault. Duplicate voting is automatically prevented.
              </div>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={() => onNavigate('ballot')}
            className={`w-full flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all ${
              isSeniorMode ? 'py-5 text-2xl' : 'py-4 text-lg'
            }`}
          >
            <span>Proceed to Digital Voting Ballot</span>
            <ArrowRight className="w-6 h-6 ml-1" />
          </button>
        </div>

      </div>

    </div>
  );
};
