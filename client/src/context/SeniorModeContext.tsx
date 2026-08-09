import React, { createContext, useContext, useState } from 'react';
import { speakText, stopSpeech } from '../utils/speech';
import { useLanguage } from './LanguageContext';

interface SeniorModeContextType {
  isSeniorMode: boolean;
  setIsSeniorMode: (val: boolean) => void;
  toggleSeniorMode: () => void;
  readAloud: (text: string) => void;
  stopVoice: () => void;
}

const SeniorModeContext = createContext<SeniorModeContextType | undefined>(undefined);

export const SeniorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(false);
  const { language } = useLanguage();

  const toggleSeniorMode = () => {
    setIsSeniorMode(prev => !prev);
  };

  const readAloud = (text: string) => {
    speakText(text, language);
  };

  const stopVoice = () => {
    stopSpeech();
  };

  return (
    <SeniorModeContext.Provider value={{ isSeniorMode, setIsSeniorMode, toggleSeniorMode, readAloud, stopVoice }}>
      <div className={isSeniorMode ? 'senior-accessible-root font-sans text-xl leading-relaxed text-slate-900 bg-amber-50/40 min-h-screen' : 'standard-root font-sans text-slate-900 bg-slate-50 min-h-screen'}>
        {children}
      </div>
    </SeniorModeContext.Provider>
  );
};

export const useSeniorMode = () => {
  const context = useContext(SeniorModeContext);
  if (!context) throw new Error('useSeniorMode must be used within SeniorModeProvider');
  return context;
};
