import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SimulationDisclaimerBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-amber-300 border-b border-amber-500/30 px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{t('simNotice')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2.5 py-0.5 rounded-full font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Global DB Vault Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ballot Secrecy Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
