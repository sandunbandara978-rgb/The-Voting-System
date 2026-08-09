import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';
import { PartySymbolBadge } from '../components/ballot/PartySymbolBadge';
import { apiService } from '../services/apiService';
import type { PoliticalParty, Candidate } from '../types';

interface ReviewPageProps {
  onNavigate: (tab: string) => void;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { voter, selectedPartyId, selectedCandidateIds, setReceiptCode } = useVoting();

  const [party, setParty] = useState<PoliticalParty | null>(null);
  const [chosenCandidates, setChosenCandidates] = useState<Candidate[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviewData() {
      if (!selectedPartyId) return;
      try {
        const parties = await apiService.getParties();
        const foundParty = parties.find(p => p.id === selectedPartyId) || null;
        setParty(foundParty);

        if (selectedCandidateIds.length > 0) {
          const allCandidates = await apiService.getCandidates(voter?.districtId || 'dist-01');
          const matched = allCandidates.filter(c => selectedCandidateIds.includes(c.id));
          setChosenCandidates(matched);
        }
      } catch (err) {
        console.error('Error loading review details', err);
      }
    }
    loadReviewData();
  }, [selectedPartyId, selectedCandidateIds, voter]);

  const handleConfirmSubmit = async () => {
    if (!voter || !selectedPartyId) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await apiService.castVote(
        voter.id,
        voter.districtId || 'dist-01',
        selectedPartyId,
        selectedCandidateIds
      );

      if (res.success) {
        setReceiptCode(res.receiptCode);
        onNavigate('confirmation');
      } else {
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to record vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!party) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">No Ballot Choices Selected</h2>
        <button onClick={() => onNavigate('ballot')} className="px-6 py-2.5 bg-[#0B192C] text-white font-bold rounded-xl text-sm">
          Return to Digital Ballot
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center gap-3 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          <span>Step 5 of 6 — Final Vote Confirmation</span>
        </div>
        <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {t('reviewTitle')}
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Double-check your choices before casting your irreversible ballot into the anonymous vault.
        </p>
      </div>

      {/* Warning Box */}
      <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-xl text-amber-950 font-semibold text-sm flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          {t('reviewWarning')}
        </div>
      </div>

      {/* Selected Party Summary Card */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          {t('chosenParty')}
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <PartySymbolBadge symbolSvg={party.symbolSvg} partyCode={party.code} partyColor={party.color} size="lg" />
          <div>
            <span className="px-2.5 py-0.5 rounded bg-[#0B192C] text-[#C5A059] text-xs font-extrabold uppercase">
              {party.code}
            </span>
            <h3 className="font-extrabold text-slate-900 text-xl mt-1">
              {party.nameEn}
            </h3>
            <p className="text-xs text-slate-500">
              {party.nameSi} • {party.nameTa}
            </p>
          </div>
        </div>

        {/* Selected Candidates List */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
            {t('chosenCandidates')} ({chosenCandidates.length} Selected)
          </div>

          {chosenCandidates.length === 0 ? (
            <div className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200">
              No individual candidate preferences chosen (Party vote only).
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {chosenCandidates.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <img src={c.photoUrl} alt={c.fullNameEn} className="w-10 h-10 rounded-full border border-slate-300 bg-white" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0B192C]">No. {c.candidateNumber}</div>
                    <div className="text-xs font-semibold text-slate-800 truncate">{c.fullNameEn}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error display */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-800 text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={() => onNavigate('ballot')}
          disabled={submitting}
          className="px-6 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-base hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('goBack')}</span>
        </button>

        <button
          onClick={handleConfirmSubmit}
          disabled={submitting}
          className={`flex-1 flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow-xl transition-all ${
            isSeniorMode ? 'py-5 text-2xl' : 'py-4 text-lg'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('submittingVote')}</span>
            </>
          ) : (
            <>
              <Lock className="w-6 h-6" />
              <span>{t('confirmSubmitBtn')}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
