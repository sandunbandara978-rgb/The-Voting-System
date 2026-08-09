import React, { useState } from 'react';
import { Vote, Eye, ShieldAlert, Languages, Accessibility, Volume2, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSeniorMode } from '../../context/SeniorModeContext';
import { useVoting } from '../../context/VotingContext';
import type { Language } from '../../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isSeniorMode, toggleSeniorMode, readAloud } = useSeniorMode();
  const { voter } = useVoting();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
  };

  const navTo = (tab: string) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0B192C] text-white border-b-4 border-[#C5A059] sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Logo / Emblem Title */}
        <div
          onClick={() => navTo('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform shrink-0">
            <Vote className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h1 className={`font-bold tracking-wide text-[#F8F9FA] leading-snug ${isSeniorMode ? 'text-xl md:text-2xl' : 'text-base md:text-xl'}`}>
              {t('appTitle')}
            </h1>
            <p className="text-[10px] md:text-xs text-[#C5A059] font-medium tracking-wider uppercase">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Action Controls: Language, Senior Accessibility, Read-Aloud & Mobile Hamburger */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Read Aloud Button for Accessibility */}
          {isSeniorMode && (
            <button
              onClick={() => readAloud(t('seniorHelp'))}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-400 text-slate-900 font-bold text-xs md:text-sm hover:bg-amber-300 transition-colors shadow-sm"
              title="Read Aloud Instructions"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice</span>
            </button>
          )}

          {/* Senior Mode Toggle */}
          <button
            onClick={toggleSeniorMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-semibold text-xs md:text-sm border transition-all ${
              isSeniorMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md ring-2 ring-amber-300'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-[#C5A059]'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">{isSeniorMode ? t('seniorModeActive') : t('seniorMode')}</span>
            <span className="sm:hidden">{isSeniorMode ? 'Senior' : 'Accessibility'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-md p-0.5 text-xs">
            <Languages className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5 hidden xs:inline" />
            <button
              onClick={() => handleLangChange('si')}
              className={`px-2 py-1 rounded font-semibold transition-all ${
                language === 'si' ? 'bg-[#C5A059] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              සිංහල
            </button>
            <button
              onClick={() => handleLangChange('ta')}
              className={`px-2 py-1 rounded font-semibold transition-all ${
                language === 'ta' ? 'bg-[#C5A059] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => handleLangChange('en')}
              className={`px-2 py-1 rounded font-semibold transition-all ${
                language === 'en' ? 'bg-[#C5A059] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07101D] border-t border-slate-800 px-4 py-3 space-y-2">
          <button
            onClick={() => navTo('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${
              currentTab === 'home' ? 'bg-[#C5A059] text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navTo('verify')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${
              ['verify', 'eligibility', 'ballot', 'review', 'confirmation'].includes(currentTab)
                ? 'bg-[#C5A059] text-slate-950'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Vote className="w-4 h-4" />
            <span>{t('startVoting')}</span>
          </button>
          <button
            onClick={() => navTo('results')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${
              currentTab === 'results' ? 'bg-[#C5A059] text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{t('resultsCenter')}</span>
          </button>
          <button
            onClick={() => navTo('admin')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 ${
              currentTab === 'admin' ? 'bg-[#C5A059] text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t('adminAccess')}</span>
          </button>
          <button
            onClick={() => navTo('about')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold ${
              currentTab === 'about' ? 'bg-[#C5A059] text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            About System
          </button>
        </div>
      )}

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-[#07101D] border-t border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 md:gap-6 overflow-x-auto py-1">
            <button
              onClick={() => navTo('home')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                currentTab === 'home'
                  ? 'bg-[#C5A059] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navTo('verify')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                ['verify', 'eligibility', 'ballot', 'review', 'confirmation'].includes(currentTab)
                  ? 'bg-[#C5A059] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>{t('startVoting')}</span>
            </button>
            <button
              onClick={() => navTo('results')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                currentTab === 'results'
                  ? 'bg-[#C5A059] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{t('resultsCenter')}</span>
            </button>
            <button
              onClick={() => navTo('admin')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                currentTab === 'admin'
                  ? 'bg-[#C5A059] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t('adminAccess')}</span>
            </button>
            <button
              onClick={() => navTo('about')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                currentTab === 'about'
                  ? 'bg-[#C5A059] text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              About System
            </button>
          </div>

          {/* Active Voter Chip */}
          {voter && (
            <div className="hidden lg:flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Voter: {voter.fullName} ({voter.identityType})</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

