import React from 'react';
import { ShieldCheck, BookOpen, Lock, Accessibility, CheckCircle2 } from 'lucide-react';
import { useSeniorMode } from '../context/SeniorModeContext';

export const AboutPage: React.FC = () => {
  const { isSeniorMode } = useSeniorMode();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl border-l-8 border-[#C5A059] shadow-lg">
        <div className="flex items-center gap-2 text-[#C5A059] mb-2 font-bold text-sm uppercase tracking-wider">
          <BookOpen className="w-5 h-5" />
          <span>Educational Simulation Transparency</span>
        </div>
        <h1 className={`font-extrabold text-white ${isSeniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
          About This Digital Voting System
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Architectural principles, accessibility standards, and ballot secrecy decoupling explanation.
        </p>
      </div>

      {/* Main Educational Notice Box */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm space-y-3 text-amber-950">
        <h3 className="font-extrabold text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Important Simulation Disclaimer</span>
        </h3>
        <ul className="space-y-2 text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span><strong>Educational Purpose:</strong> This application is a software project simulating a Sri Lankan General Election.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span><strong>Not an Official Service:</strong> It is not affiliated with or provided by the Election Commission of Sri Lanka or any Sri Lankan government authority.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span><strong>Synthetic Data:</strong> All identification numbers, candidate information, and political party statistics are simulated mock data.</span>
          </li>
        </ul>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A059] flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Cryptographic Ballot Secrecy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The backend architecture separates <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">voter_verifications</code> from <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">anonymous_ballots</code>. When a vote is submitted, the eligibility table marks <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">hasVoted = true</code> while an un-linkable ballot record is created with a cryptographic hash receipt.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A059] flex items-center justify-center">
            <Accessibility className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Senior & Universal Accessibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered for citizens aged 18 to 100 years old. Features customizable font scaling, 3px high-contrast touch targets, voice synthesis read-aloud via Web Speech API, and full trilingual support (English, Sinhala, Tamil).
          </p>
        </div>

      </div>

    </div>
  );
};
