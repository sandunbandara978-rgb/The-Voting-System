import React from 'react';
import { ShieldCheck, CheckCircle2, AlertOctagon, MapPin, User, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';

interface EligibilityPageProps {
  onNavigate: (tab: string) => void;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { voter } = useVoting();

  if (!voter) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
        <AlertOctagon className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">No Verified Identity Found</h2>
        <p className="text-slate-600 text-sm">Please verify your identity document before checking eligibility.</p>
        <button
          onClick={() => onNavigate('verify')}
          className="px-6 py-2.5 bg-[#0B192C] text-white font-bold rounded-xl text-sm"
        >
          Go to Identity Verification
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center gap-3 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          <span>Step 2 of 6 — Electoral Roll Status</span>
        </div>
        <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {t('eligibilityCheck')}
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Review your verified details and official electoral registration.
        </p>
      </div>

      {/* Verified Details Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Overall Status Badge */}
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${
          voter.hasVoted
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-emerald-50 border-emerald-300 text-emerald-950'
        }`}>
          {voter.hasVoted ? (
            <AlertOctagon className="w-8 h-8 text-amber-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          )}
          <div>
            <div className={`font-extrabold ${isSeniorMode ? 'text-2xl' : 'text-lg'}`}>
              {voter.hasVoted ? t('alreadyVoted') : t('eligibleToVote')}
            </div>
            <div className="text-xs text-slate-600">
              {voter.hasVoted
                ? 'Your vote was already cast and confirmed.'
                : 'All identity and age requirements have been verified.'}
            </div>
          </div>
        </div>

        {/* Verification Checklist Items */}
        <div className="space-y-4 border-t border-slate-100 pt-4">
          
          {/* Check 1: Identity Verified */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-slate-900 text-base">{t('idVerified')}</div>
              <div className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>{voter.fullName} ({voter.identityType}: {voter.documentNumber})</span>
              </div>
            </div>
          </div>

          {/* Check 2: Age Check */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-slate-900 text-base">{t('ageRequirement')}</div>
              <div className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Age: {voter.age} Years (Date of Birth: {voter.dateOfBirth})</span>
              </div>
            </div>
          </div>

          {/* Check 3: District Assignment */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-slate-900 text-base">{t('districtAssigned')}</div>
              <div className="text-sm text-slate-600 flex items-center gap-2 mt-0.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Colombo District (Code: COL) • Polling Division: {voter.divisionName}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onNavigate('verify')}
            className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
          >
            Change Identity Document
          </button>

          {!voter.hasVoted && (
            <button
              onClick={() => onNavigate('info')}
              className={`flex-1 flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all ${
                isSeniorMode ? 'py-5 text-2xl' : 'py-3.5 text-base md:text-lg'
              }`}
            >
              <span>{t('continueToBallot')}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
