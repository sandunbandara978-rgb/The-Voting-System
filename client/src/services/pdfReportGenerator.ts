import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ElectionResults } from '../types';

export function generatePdfReport(results: ElectionResults) {
  const doc = new jsPDF();

  // Header & Styling Constants
  const navyColor = [11, 25, 44]; // #0B192C
  const goldColor = [197, 160, 89]; // #C5A059
  const textDark = [30, 41, 59];

  // Document Title Header
  doc.setFillColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA', 105, 12, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('PARLIAMENTARY GENERAL ELECTION 2026 — FINAL DECISION REPORT', 105, 20, { align: 'center' });
  
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SIMULATION REPORT — FOR EDUCATIONAL & SOFTWARE DEMONSTRATION PURPOSES', 105, 27, { align: 'center' });

  // Metadata Box
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(14, 38, 182, 22, 2, 2, 'FD');

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Election Title: ${results.election.titleEn}`, 18, 45);
  doc.text(`Report Date: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`, 18, 52);

  doc.text(`Status: ${results.election.status}`, 130, 45);
  doc.text(`Total Seats Allocated: 225`, 130, 52);

  // 1. Executive Summary Table
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('1. Executive Turnout Summary', 14, 69);

  autoTable(doc, {
    startY: 73,
    head: [['Metric Description', 'Count / Value', 'Percentage (%)']],
    body: [
      ['Total Registered Voters (Simulated Roll)', results.totalRegisteredVoters.toLocaleString(), '100.00%'],
      ['Verified Registered Voters', results.verifiedVoters.toLocaleString(), `${((results.verifiedVoters / results.totalRegisteredVoters) * 100).toFixed(2)}%`],
      ['Total Votes Cast (Ballots In Vault)', results.totalVotesCast.toLocaleString(), `${results.turnoutPercentage}%`],
      ['Valid Votes Recorded', results.validVotes.toLocaleString(), '100.00%'],
      ['Invalid / Rejected Ballots', results.invalidVotes.toLocaleString(), '0.00%']
    ],
    theme: 'grid',
    headStyles: { fillColor: navyColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { font: 'helvetica', fontSize: 9.5, cellPadding: 3 }
  });

  const summaryEnd = (doc as any).lastAutoTable.finalY + 10;

  // 2. Party Performance & Seats Allocation Table
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('2. Political Party Results & Parliamentary Seat Allocations', 14, summaryEnd);

  const partyRows = results.partyResults.map(p => [
    p.partyCode,
    p.partyNameEn,
    p.votes.toLocaleString(),
    `${p.percentage}%`,
    p.seatsWon.toString()
  ]);

  autoTable(doc, {
    startY: summaryEnd + 4,
    head: [['Code', 'Political Party / Group Name', 'Votes Received', 'Vote Share (%)', 'Seats Won']],
    body: partyRows,
    theme: 'grid',
    headStyles: { fillColor: navyColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { font: 'helvetica', fontSize: 9.5, cellPadding: 3 }
  });

  const partyEnd = (doc as any).lastAutoTable.finalY + 10;

  // 3. Final Simulated Outcome Box
  doc.setFillColor(244, 241, 234);
  doc.setDrawColor(197, 160, 89);
  doc.roundedRect(14, partyEnd, 182, 35, 3, 3, 'FD');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('3. Final Election Outcome & Government Formation Decision', 20, partyEnd + 8);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text(`Winning Party / Coalition: ${results.outcome.winningParty} (${results.outcome.winningPartyCode})`, 20, partyEnd + 17);

  doc.text(`Total Parliamentary Seats Won: ${results.outcome.seatsWon} / 225 Seats`, 20, partyEnd + 24);
  
  doc.setTextColor(183, 28, 28);
  doc.text(`Majority Status: ${results.outcome.majorityStatus}`, 20, partyEnd + 31);

  // Footer Audit stamp
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  doc.text('Certified by Sri Lanka Digital Election Simulation Platform Vault • Cryptographic Ballot Decoupling Enforced', 105, 285, { align: 'center' });

  // Save PDF file
  doc.save(`SriLanka_General_Election_2026_Final_Report.pdf`);
}
