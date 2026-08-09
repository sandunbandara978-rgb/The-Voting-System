export type Language = 'en' | 'si' | 'ta';

export type IdentityType = 'NIC' | 'PASSPORT' | 'DRIVING_LICENCE';

export interface VoterProfile {
  id: string;
  identityType: IdentityType;
  documentNumber: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  districtId: string;
  divisionName: string;
  isVerified: boolean;
  hasVoted: boolean;
  votedAt?: string;
}

export interface ElectoralDistrict {
  id: string;
  code: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  seats: number;
  registeredVoters: number;
  divisions: string[];
}

export interface PoliticalParty {
  id: string;
  code: string;
  nameEn: string;
  nameSi: string;
  nameTa: string;
  symbolName: string;
  symbolSvg: string;
  color: string;
  sloganEn: string;
  sloganSi: string;
  sloganTa: string;
}

export interface Candidate {
  id: string;
  candidateNumber: number;
  fullNameEn: string;
  fullNameSi: string;
  fullNameTa: string;
  partyId: string;
  districtId: string;
  photoUrl: string;
  occupationEn: string;
  occupationSi: string;
  occupationTa: string;
  isActive: boolean;
}

export interface ElectionInfo {
  id: string;
  titleEn: string;
  titleSi: string;
  titleTa: string;
  date: string;
  status: 'UPCOMING' | 'ACTIVE' | 'CLOSED' | 'FINALIZED';
  totalRegisteredVoters: number;
  maxCandidatePreferences: number;
}

export interface ElectionResults {
  election: ElectionInfo;
  totalRegisteredVoters: number;
  verifiedVoters: number;
  totalVotesCast: number;
  validVotes: number;
  invalidVotes: number;
  turnoutPercentage: number;
  partyResults: Array<{
    partyId: string;
    partyCode: string;
    partyNameEn: string;
    partyNameSi: string;
    partyNameTa: string;
    color: string;
    votes: number;
    percentage: number;
    seatsWon: number;
  }>;
  districtPartyVotesMap: Record<string, Record<string, number>>;
  candidateVotesMap: Record<string, number>;
  outcome: {
    winningParty: string;
    winningPartyCode: string;
    winningPartyColor: string;
    seatsWon: number;
    majorityStatus: string;
  };
}
