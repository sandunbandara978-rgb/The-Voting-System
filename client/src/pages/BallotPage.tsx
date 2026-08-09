import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';
import { PartySymbolBadge } from '../components/ballot/PartySymbolBadge';
import { apiService } from '../services/apiService';
import type { PoliticalParty, Candidate } from '../types';

interface BallotPageProps {
  onNavigate: (tab: string) => void;
}

export const BallotPage: React.FC<BallotPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { voter, selectedPartyId, setSelectedPartyId, selectedCandidateIds, toggleCandidateSelection } = useVoting();

  const [parties, setParties] = useState<PoliticalParty[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBallotData() {
      try {
        setLoading(true);
        const fetchedParties = await apiService.getParties();
        setParties(fetchedParties);

        // Fetch candidates for current district (or default district)
        const distId = voter?.districtId || 'dist-01';
        const fetchedCandidates = await apiService.getCandidates(distId);
        setCandidates(fetchedCandidates);
      } catch (err) {
        console.error('Failed to load ballot data', err);
      } finally {
        setLoading(false);
      }
    }
    loadBallotData();
  }, [voter]);

  const selectedParty = parties.find(p => p.id === selectedPartyId);
  const partyCandidates = candidates.filter(c => c.partyId === selectedPartyId);

  const getPartyName = (p: PoliticalParty) => {
    if (language === 'si') return p.nameSi;
    if (language === 'ta') return p.nameTa;
    return p.nameEn;
  };

  const getCandidateName = (c: Candidate) => {
    if (language === 'si') return c.fullNameSi;
    if (language === 'ta') return c.fullNameTa;
    return c.fullNameEn;
  };

  const getCandidateOcc = (c: Candidate) => {
    if (language === 'si') return c.occupationSi;
    if (language === 'ta') return c.occupationTa;
    return c.occupationEn;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Step 4 of 6 — Official Digital Ballot</span>
            </div>
            <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
              {t('digitalBallot')}
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Colombo Electoral District (19 Seats) • Select Party & Up to 3 Candidate Preferences
            </p>
          </div>

          <div className="hidden sm:block text-right bg-slate-900/90 border border-slate-700 p-3 rounded-xl">
            <div className="text-xs text-[#C5A059] font-bold uppercase">Selection Counter</div>
            <div className="text-sm font-extrabold text-white">
              {selectedParty ? selectedParty.code : 'No Party Selected'}
            </div>
            <div className="text-xs text-slate-400">
              Preferences: {selectedCandidateIds.length}/3
            </div>
          </div>
        </div>
      </div>

      {/* Ballot Instructions Callout */}
      <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl text-amber-950 font-medium text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Voting Instructions:</strong> {t('ballotInstructions')}
        </div>
      </div>

      {/* SECTION 1: Political Parties / Groups Selection */}
      <section className="space-y-4">
        <h2 className={`font-extrabold text-slate-900 ${isSeniorMode ? 'text-2xl' : 'text-xl'}`}>
          {t('selectParty')}
        </h2>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading digital ballot options...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parties.map((party) => {
              const isSelected = party.id === selectedPartyId;
              return (
                <div
                  key={party.id}
                  onClick={() => setSelectedPartyId(party.id)}
                  className={`cursor-pointer p-5 rounded-2xl border-3 transition-all relative flex items-start gap-4 ${
                    isSelected
                      ? 'border-[#0B192C] bg-white ring-4 ring-[#C5A059]/40 shadow-xl'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Party Symbol Badge */}
                  <PartySymbolBadge symbolSvg={party.symbolSvg} partyCode={party.code} partyColor={party.color} size="lg" />

                  {/* Party Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-900 text-xs font-extrabold uppercase">
                        {party.code}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{party.symbolName}</span>
                    </div>

                    <h3 className={`font-extrabold text-slate-900 mt-1 truncate ${isSeniorMode ? 'text-xl' : 'text-base md:text-lg'}`}>
                      {getPartyName(party)}
                    </h3>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {language === 'si' ? party.sloganSi : language === 'ta' ? party.sloganTa : party.sloganEn}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-[#0B192C] bg-[#0B192C] text-[#C5A059]'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: Candidate Preferences (Displays if Party Selected) */}
      {selectedParty && (
        <section className="space-y-4 pt-6 border-t-2 border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className={`font-extrabold text-slate-900 ${isSeniorMode ? 'text-2xl' : 'text-xl'}`}>
                {t('selectPreferences')} ({selectedParty.code})
              </h2>
              <p className="text-xs text-slate-500">
                Tap candidate numbers to select up to 3 preferences. (Selected: {selectedCandidateIds.length}/3)
              </p>
            </div>
            {selectedCandidateIds.length > 0 && (
              <button
                onClick={() => toggleCandidateSelection(selectedCandidateIds[0])}
                className="text-xs font-bold text-red-600 hover:underline self-start sm:self-auto"
              >
                Clear Preferences
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {partyCandidates.map((cand) => {
              const isCandSelected = selectedCandidateIds.includes(cand.id);
              return (
                <div
                  key={cand.id}
                  onClick={() => toggleCandidateSelection(cand.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                    isCandSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-400 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Candidate Photo / Avatar */}
                  <img
                    src={cand.photoUrl}
                    alt={cand.fullNameEn}
                    className="w-14 h-14 rounded-full border-2 border-slate-300 bg-slate-100 object-cover shrink-0"
                  />

                  {/* Candidate Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#0B192C] text-[#C5A059] text-xs font-extrabold flex items-center justify-center shrink-0">
                        {cand.candidateNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase">{t('candidateNumber')} {cand.candidateNumber}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-1 truncate">
                      {getCandidateName(cand)}
                    </h4>

                    <p className="text-xs text-slate-500 truncate">
                      {getCandidateOcc(cand)}
                    </p>
                  </div>

                  {/* Preference Indicator Checkbox */}
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                    isCandSelected
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-300 bg-white text-transparent'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Review Vote Button (Main) */}
      <div className="pt-8 border-t border-slate-200">
        <button
          disabled={!selectedPartyId}
          onClick={() => onNavigate('review')}
          className={`w-full flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b58f47] disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-950 font-extrabold rounded-xl shadow-lg transition-all ${
            isSeniorMode ? 'py-5 text-2xl' : 'py-4 text-lg'
          }`}
        >
          <UserCheck className="w-6 h-6" />
          <span>{t('reviewSelectionBtn')}</span>
          <ArrowRight className="w-6 h-6 ml-1" />
        </button>
      </div>

      {/* Sticky Bottom Bar for Mobile & Polling Station Touchscreens */}
      {selectedParty && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0B192C] text-white p-3.5 border-t-2 border-[#C5A059] shadow-2xl md:hidden flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-[#C5A059] font-bold uppercase truncate">
              {selectedParty.code} • {selectedCandidateIds.length}/3 Candidates
            </div>
            <div className="text-xs font-bold text-white truncate">
              {getPartyName(selectedParty)}
            </div>
          </div>
          <button
            onClick={() => onNavigate('review')}
            className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold text-xs rounded-lg shrink-0 shadow-md flex items-center gap-1"
          >
            <span>Review Vote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
