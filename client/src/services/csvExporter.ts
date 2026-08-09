import type { ElectionResults } from '../types';

export function exportResultsCsv(results: ElectionResults) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  // Section 1: Election Summary
  csvContent += 'SRI LANKA GENERAL ELECTION SIMULATION 2026 - ELECTION RESULTS DATASET\n';
  csvContent += `Election Title,${results.election.titleEn}\n`;
  csvContent += `Report Generated At,${new Date().toISOString()}\n`;
  csvContent += `Total Registered Voters,${results.totalRegisteredVoters}\n`;
  csvContent += `Verified Voters,${results.verifiedVoters}\n`;
  csvContent += `Total Votes Cast,${results.totalVotesCast}\n`;
  csvContent += `Turnout Percentage,${results.turnoutPercentage}%\n\n`;

  // Section 2: Party Results Table
  csvContent += 'PARTY PERFORMANCE & SEATS ALLOCATED\n';
  csvContent += 'Party Code,Party Name,Votes Received,Vote Share %,Seats Won\n';

  results.partyResults.forEach(p => {
    csvContent += `"${p.partyCode}","${p.partyNameEn}",${p.votes},${p.percentage}%,${p.seatsWon}\n`;
  });

  csvContent += '\n';

  // Section 3: Final Decision Outcome
  csvContent += 'FINAL SIMULATED OUTCOME\n';
  csvContent += `Winning Party,${results.outcome.winningParty} (${results.outcome.winningPartyCode})\n`;
  csvContent += `Seats Won,${results.outcome.seatsWon}\n`;
  csvContent += `Majority Status,${results.outcome.majorityStatus}\n`;

  // Download Trigger
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `SriLanka_Election_Results_2026.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
