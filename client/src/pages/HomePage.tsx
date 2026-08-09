import React, { useState, useEffect } from 'react';
import { Vote, ShieldCheck, Accessibility, Eye, ArrowRight, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSeniorMode } from '../context/SeniorModeContext';
import { PartySymbolBadge } from '../components/ballot/PartySymbolBadge';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isSeniorMode, toggleSeniorMode } = useSeniorMode();

  // Simulated Countdown Timer to Election Day
  const [timeLeft, setTimeLeft] = useState({ days: 97, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes > 0 ? prev.minutes - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative bg-[#0B192C] text-white rounded-2xl overflow-hidden shadow-2xl border-b-4 border-[#C5A059] p-8 md:p-14">
        {/* Subtle Civic Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Sri Lanka Parliamentary Election Simulation</span>
          </div>

          <h1 className={`font-extrabold tracking-tight text-white leading-tight ${isSeniorMode ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
            {t('heroTitle')}
          </h1>

          <p className={`text-slate-300 max-w-2xl leading-relaxed ${isSeniorMode ? 'text-2xl font-medium' : 'text-lg'}`}>
            {t('heroSubtitle')}
          </p>

          <div className="bg-slate-900/80 backdrop-blur border border-slate-700/80 p-4 rounded-xl max-w-xl text-amber-300 font-semibold text-sm flex items-center gap-3">
            <Award className="w-6 h-6 text-[#C5A059] shrink-0" />
            <span>{t('tagline')}</span>
          </div>

          {/* Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('verify')}
              className={`flex items-center gap-3 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 ${
                isSeniorMode ? 'px-8 py-4 text-2xl' : 'px-6 py-3.5 text-base md:text-lg'
              }`}
            >
              <Vote className="w-6 h-6" />
              <span>{t('startVoting')}</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('results')}
              className={`flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 transition-all ${
                isSeniorMode ? 'px-6 py-4 text-xl' : 'px-5 py-3 text-base'
              }`}
            >
              <Eye className="w-5 h-5 text-[#C5A059]" />
              <span>{t('exploreResults')}</span>
            </button>

            <button
              onClick={toggleSeniorMode}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${
                isSeniorMode
                  ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                  : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:border-[#C5A059]'
              }`}
            >
              <Accessibility className="w-4 h-4 text-[#C5A059]" />
              <span>{isSeniorMode ? 'Senior Mode Enabled' : 'Senior Accessibility (18-100 Yrs)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Countdown & Live Election State */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Countdown Timer Card */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Simulated Election Countdown</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
              STATUS: POLLS OPEN
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#0B192C]">{timeLeft.days}</div>
              <div className="text-xs font-medium text-slate-500 uppercase">Days</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#0B192C]">{timeLeft.hours}</div>
              <div className="text-xs font-medium text-slate-500 uppercase">Hours</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="text-2xl md:text-3xl font-extrabold text-[#0B192C]">{timeLeft.minutes}</div>
              <div className="text-xs font-medium text-slate-500 uppercase">Minutes</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="text-2xl md:text-3xl font-extrabold text-amber-600">{timeLeft.seconds}</div>
              <div className="text-xs font-medium text-slate-500 uppercase">Seconds</div>
            </div>
          </div>
        </div>

        {/* Quick Identity Verification Entry Card */}
        <div className="bg-[#0B192C] text-white rounded-xl p-6 shadow-sm border-l-4 border-[#C5A059] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-[#F8F9FA] font-bold text-lg mb-1">Verify Eligibility</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Use your Sri Lankan National Identity Card (NIC), Passport, or Driving Licence to verify voting eligibility.
            </p>
          </div>
          <button
            onClick={() => onNavigate('verify')}
            className="w-full py-2.5 bg-[#C5A059] hover:bg-[#b58f47] text-slate-950 font-bold rounded-lg text-sm transition-colors text-center"
          >
            Enter Document Details
          </button>
        </div>

      </section>

      {/* Interactive Teaser: Digital Ballot Preview */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Sample Sri Lankan Digital Voting Ballot Preview
            </h2>
            <p className="text-slate-500 text-sm">
              Clear party photographs, symbols, and candidate preferences designed for maximum clarity.
            </p>
          </div>
          <button
            onClick={() => onNavigate('verify')}
            className="px-4 py-2 bg-slate-900 text-white font-semibold text-sm rounded-lg hover:bg-slate-800 transition-colors self-start md:self-auto"
          >
            Try Voting Flow
          </button>
        </div>

        {/* Sample Ballot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-xl bg-slate-50/50 space-y-3 transition-all">
            <div className="flex items-center gap-3">
              <PartySymbolBadge symbolSvg="compass" partyCode="NPP" partyColor="#D32F2F" size="md" />
              <div>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">PARTY CODE: NPP</span>
                <h4 className="font-bold text-slate-900 text-base">National People's Power</h4>
                <p className="text-xs text-slate-500">ජාතික ජන බලවේගය • திசைக்காட்டி</p>
              </div>
            </div>
            <div className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200">
              Symbol: Compass (මාලිමාව)
            </div>
          </div>

          <div className="border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-xl bg-slate-50/50 space-y-3 transition-all">
            <div className="flex items-center gap-3">
              <PartySymbolBadge symbolSvg="phone" partyCode="SJB" partyColor="#1976D2" size="md" />
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">PARTY CODE: SJB</span>
                <h4 className="font-bold text-slate-900 text-base">Samagi Jana Balawegaya</h4>
                <p className="text-xs text-slate-500">සමගි ජන බලවේගය • தொலைபேசி</p>
              </div>
            </div>
            <div className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200">
              Symbol: Telephone (දුරකථනය)
            </div>
          </div>

          <div className="border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-xl bg-slate-50/50 space-y-3 transition-all">
            <div className="flex items-center gap-3">
              <PartySymbolBadge symbolSvg="flower" partyCode="SLPP" partyColor="#8E24AA" size="md" />
              <div>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">PARTY CODE: SLPP</span>
                <h4 className="font-bold text-slate-900 text-base">Sri Lanka Podujana Peramuna</h4>
                <p className="text-xs text-slate-500">ශ්‍රී ලංකා පොදුජන පෙරමුණ • மொட்டு</p>
              </div>
            </div>
            <div className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200">
              Symbol: Flower Bud (පොහොට්ටුව)
            </div>
          </div>

        </div>
      </section>

      {/* Core Civic Technology Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Cryptographic Ballot Secrecy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strictly separates voter verification from vote selections. No administrator can link a specific voter to their chosen candidate in the database.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Ages 18–100 Accessibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Designed for intuitive use by voters of all ages. Includes Senior-Friendly Mode with large touch elements and voice read-aloud support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Trilingual Sri Lanka Experience</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Complete language support for English, Sinhala (සිංහල), and Tamil (தமிழ்) across all screens, candidate information, and reports.
          </p>
        </div>
      </section>

    </div>
  );
};
