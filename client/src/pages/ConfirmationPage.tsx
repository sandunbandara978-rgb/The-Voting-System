import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, Copy, Eye, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { useVoting } from '../context/VotingContext';

interface ConfirmationPageProps {
  onNavigate: (tab: string) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode } = useSeniorMode();
  const { receiptCode, resetVotingSession } = useVoting();

  const activeReceipt = receiptCode || 'SL-VOTE-2026-X8F9-A72K';

  useEffect(() => {
    // Trigger celebration confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(activeReceipt);
    alert('Vote confirmation receipt code copied to clipboard!');
  };

  const handleDone = (tab: string) => {
    resetVotingSession();
    onNavigate(tab);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16 pt-4 text-center">
      
      {/* Big Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <h1 className={`font-extrabold text-slate-900 ${isSeniorMode ? 'text-4xl' : 'text-3xl md:text-4xl'}`}>
          {t('voteSuccessTitle')}
        </h1>
        <p className="text-slate-600 text-base max-w-md mx-auto">
          Your ballot has been encrypted and recorded into the anonymous voting vault.
        </p>
      </div>

      {/* Confirmation Receipt Box */}
      <div className="bg-[#0B192C] text-white border-2 border-[#C5A059] rounded-2xl p-6 shadow-xl space-y-4 text-left">
        <div className="flex items-center justify-between text-[#C5A059] text-xs font-bold uppercase tracking-wider">
          <span>{t('receiptLabel')}</span>
          <ShieldCheck className="w-4 h-4" />
        </div>

        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-700">
          <code className="text-base sm:text-xl md:text-2xl font-mono font-bold text-amber-300 tracking-wider break-all">
            {activeReceipt}
          </code>
          <button
            onClick={handleCopyReceipt}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Copy Receipt Code"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
          {t('secrecyNotice')}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={() => handleDone('home')}
          className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold rounded-xl text-base transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>{t('returnHome')}</span>
        </button>

        <button
          onClick={() => handleDone('results')}
          className="flex-1 py-4 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-extrabold rounded-xl text-base shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Eye className="w-5 h-5" />
          <span>{t('viewLiveResults')}</span>
        </button>
      </div>

    </div>
  );
};
