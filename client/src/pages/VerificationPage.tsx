import React, { useState } from 'react';
import { ShieldCheck, CreditCard, FileText, Car, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';
import { apiService } from '../services/apiService';
import type { IdentityType } from '../types';

interface VerificationPageProps {
  onNavigate: (tab: string) => void;
}

export const VerificationPage: React.FC<VerificationPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { setVoter, setToken } = useVoting();

  const [docType, setDocType] = useState<IdentityType>('NIC');
  const [docNumber, setDocNumber] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick Demo Test Profiles
  const sampleTestProfiles = [
    { type: 'NIC', number: '199012345678', name: 'Kasun Bandara (36 Yrs)', district: 'Colombo' },
    { type: 'NIC', number: '194888776655', name: 'Gamini Wijesuriya (Senior 78 Yrs)', district: 'Colombo (Senior Mode)' },
    { type: 'PASSPORT', number: 'N1234567', name: 'Sinthuja (28 Yrs)', district: 'Jaffna' },
    { type: 'DRIVING_LICENCE', number: 'B1234567', name: 'Mohamed Rizan (22 Yrs)', district: 'Gampaha' },
    { type: 'NIC', number: '193555667788', name: 'Sirisena Gunaratne (Elderly 91 Yrs)', district: 'Galle' }
  ];

  const handleSelectSample = (sample: typeof sampleTestProfiles[0]) => {
    setDocType(sample.type as IdentityType);
    setDocNumber(sample.number);
    setErrorMsg(null);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber.trim()) {
      setErrorMsg('Please enter your document number.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await apiService.verifyIdentity(docType, docNumber.trim(), dob || undefined);
      setVoter(res.voter);
      setToken(res.token);
      onNavigate('eligibility');
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center gap-3 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          <span>Step 1 of 6 — Identity Verification</span>
        </div>
        <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          {t('verifyIdentity')}
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Verify your Sri Lankan citizenship document to check electoral eligibility.
        </p>
      </div>

      {/* Document Selection & Verification Form */}
      <form onSubmit={handleVerify} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Document Type Selector Tabs */}
        <div className="space-y-2">
          <label className={`block font-bold text-slate-900 ${isSeniorMode ? 'text-xl' : 'text-sm'}`}>
            {t('selectDocument')}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => { setDocType('NIC'); setErrorMsg(null); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                docType === 'NIC'
                  ? 'border-[#0B192C] bg-slate-900 text-white font-bold shadow-md'
                  : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
              }`}
            >
              <CreditCard className={`w-6 h-6 ${docType === 'NIC' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
              <div>
                <div className="font-bold text-sm">National ID (NIC)</div>
                <div className="text-xs opacity-80">12-Digit or Classic 'V'</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { setDocType('PASSPORT'); setErrorMsg(null); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                docType === 'PASSPORT'
                  ? 'border-[#0B192C] bg-slate-900 text-white font-bold shadow-md'
                  : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
              }`}
            >
              <FileText className={`w-6 h-6 ${docType === 'PASSPORT' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
              <div>
                <div className="font-bold text-sm">Passport</div>
                <div className="text-xs opacity-80">e.g. N1234567</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { setDocType('DRIVING_LICENCE'); setErrorMsg(null); }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                docType === 'DRIVING_LICENCE'
                  ? 'border-[#0B192C] bg-slate-900 text-white font-bold shadow-md'
                  : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
              }`}
            >
              <Car className={`w-6 h-6 ${docType === 'DRIVING_LICENCE' ? 'text-[#C5A059]' : 'text-slate-500'}`} />
              <div>
                <div className="font-bold text-sm">Driving Licence</div>
                <div className="text-xs opacity-80">e.g. B1234567</div>
              </div>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className={`block font-bold text-slate-900 mb-1.5 ${isSeniorMode ? 'text-xl' : 'text-sm'}`}>
              {t('enterDocNumber')} *
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              placeholder={
                docType === 'NIC' ? t('nicPlaceholder') : docType === 'PASSPORT' ? t('passportPlaceholder') : t('dlPlaceholder')
              }
              className={`w-full rounded-xl border-2 border-slate-300 focus:border-[#0B192C] focus:ring-2 focus:ring-[#C5A059] uppercase tracking-wider font-semibold text-slate-900 ${
                isSeniorMode ? 'p-4 text-2xl' : 'p-3 text-base md:text-lg'
              }`}
            />
          </div>

          <div>
            <label className={`block font-bold text-slate-900 mb-1.5 ${isSeniorMode ? 'text-xl' : 'text-sm'}`}>
              {t('enterDob')}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`w-full rounded-xl border-2 border-slate-300 focus:border-[#0B192C] font-medium text-slate-900 ${
                isSeniorMode ? 'p-4 text-xl' : 'p-3 text-base'
              }`}
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-800 text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl shadow-lg transition-all ${
            isSeniorMode ? 'py-5 text-2xl' : 'py-4 text-lg'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('verifying')}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6" />
              <span>{t('verifyBtn')}</span>
            </>
          )}
        </button>

      </form>

      {/* Demo Test Profiles Section */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Quick Demo Test Identifiers (Click any to test instant verification):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleTestProfiles.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="px-3 py-2 rounded-lg bg-white border border-amber-300 hover:border-amber-500 text-slate-800 text-xs font-semibold shadow-sm hover:shadow transition-all text-left"
            >
              <div className="font-bold text-slate-900">{sample.name}</div>
              <div className="text-[11px] text-slate-500">{sample.type}: {sample.number}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
