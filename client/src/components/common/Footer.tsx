import React from 'react';
import { ShieldCheck, Vote, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t-4 border-[#C5A059] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#C5A059] font-bold text-lg">
              <Vote className="w-6 h-6" />
              <span>Sri Lanka General Election</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Digital Voting Platform Simulation designed for educational and software engineering demonstration. Built with cryptographic ballot secrecy and senior citizen accessibility.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[#F8F9FA] font-bold text-sm mb-3 uppercase tracking-wider">Election Pillars</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Identity Verification</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Anonymous Ballot Vault</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Senior Accessibility Mode</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Real-time Decision Report</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[#F8F9FA] font-bold text-sm mb-3 uppercase tracking-wider">Trilingual Access</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p>සිංහල: නිල ඩිජිටල් ඡන්ද අනුකරණය</p>
              <p>தமிழ்: அதிகாரப்பூர்வ டிஜிட்டல் மாதிரி</p>
              <p>English: Secure Digital Voting Prototype</p>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[#F8F9FA] font-bold text-sm mb-3 uppercase tracking-wider">Educational Notice</h4>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded text-xs text-amber-300/90 leading-relaxed">
              <BookOpen className="w-4 h-4 text-amber-400 mb-1 inline mr-1" />
              This application is an educational prototype. It uses synthetic mock data and does not connect to real Sri Lankan government databases.
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Sri Lanka General Election Voting System Simulation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors">Privacy & Ballot Secrecy</span>
            <span className="hover:text-white transition-colors">Accessibility Guidelines</span>
            <span className="hover:text-white transition-colors">Audit Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
