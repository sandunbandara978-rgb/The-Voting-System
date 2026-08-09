import React, { createContext, useContext, useState } from 'react';
import type { VoterProfile } from '../types';

interface VotingContextType {
  voter: VoterProfile | null;
  setVoter: (voter: VoterProfile | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  selectedPartyId: string | null;
  setSelectedPartyId: (partyId: string | null) => void;
  selectedCandidateIds: string[];
  setSelectedCandidateIds: (ids: string[]) => void;
  toggleCandidateSelection: (candidateId: string) => void;
  receiptCode: string | null;
  setReceiptCode: (code: string | null) => void;
  resetVotingSession: () => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voter, setVoter] = useState<VoterProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [receiptCode, setReceiptCode] = useState<string | null>(null);

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidateIds(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      } else {
        if (prev.length >= 3) return prev; // Max 3 candidates
        return [...prev, candidateId];
      }
    });
  };

  const resetVotingSession = () => {
    setVoter(null);
    setToken(null);
    setSelectedPartyId(null);
    setSelectedCandidateIds([]);
    setReceiptCode(null);
  };

  return (
    <VotingContext.Provider
      value={{
        voter,
        setVoter,
        token,
        setToken,
        selectedPartyId,
        setSelectedPartyId,
        selectedCandidateIds,
        setSelectedCandidateIds,
        toggleCandidateSelection,
        receiptCode,
        setReceiptCode,
        resetVotingSession
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) throw new Error('useVoting must be used within VotingProvider');
  return context;
};
