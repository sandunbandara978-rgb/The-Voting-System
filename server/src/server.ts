import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { dbStore } from './db/store';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sri-lanka-voting-simulation-secret-2026';

app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Middleware for Admin Auth
function requireAdminAuth(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'SUPER_ADMIN' && decoded.role !== 'ELECTION_OFFICER') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    (req as any).adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// --- Public Endpoints ---

// 1. Get Election Info
app.get('/api/election', (req: Request, res: Response) => {
  const election = dbStore.getActiveElection();
  res.json({ election });
});

// Global Database Connection Status Endpoint
app.get('/api/db-status', (req: Request, res: Response) => {
  const status = dbStore.getDbStatus();
  res.json(status);
});

// 2. Get Electoral Districts
app.get('/api/districts', (req: Request, res: Response) => {
  const districts = dbStore.getDistricts();
  res.json({ districts });
});

// 3. Get Political Parties
app.get('/api/parties', (req: Request, res: Response) => {
  const parties = dbStore.getParties();
  res.json({ parties });
});

// 4. Get Candidates (by district & party)
app.get('/api/candidates', (req: Request, res: Response) => {
  const { districtId, partyId } = req.query as { districtId?: string; partyId?: string };
  const candidates = dbStore.getCandidates(districtId, partyId);
  res.json({ candidates });
});

// 5. Verify Voter Identity
app.post('/api/verify-identity', (req: Request, res: Response) => {
  const { identityType, documentNumber, dateOfBirth } = req.body;

  if (!identityType || !documentNumber) {
    return res.status(400).json({ error: 'Identification document type and document number are required.' });
  }

  const voter = dbStore.verifyVoterIdentity(identityType, documentNumber, dateOfBirth);

  if (!voter) {
    return res.status(404).json({ error: 'Voter record not found in the electoral roll.' });
  }

  // Issue temporary voter session token
  const token = jwt.sign(
    { voterId: voter.id, docNumber: voter.documentNumber, districtId: voter.districtId },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({
    message: 'Identity successfully verified.',
    voter,
    token
  });
});

// 6. Cast Anonymous Ballot
app.post('/api/cast-vote', (req: Request, res: Response) => {
  const { voterId, districtId, partyId, candidateIds } = req.body;

  if (!voterId || !districtId || !partyId) {
    return res.status(400).json({ error: 'Missing required voting parameters.' });
  }

  const result = dbStore.castBallot(voterId, districtId, partyId, candidateIds || []);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json({
    success: true,
    message: result.message,
    receiptCode: result.receipt,
    timestamp: new Date().toISOString()
  });
});

// 7. Get Election Results & Turnout
app.get('/api/results', (req: Request, res: Response) => {
  const results = dbStore.getResultsSummary();
  res.json(results);
});

// --- Admin Endpoints ---

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Simple secure demo credentials: admin / election2026
  if (username === 'admin' && (password === 'election2026' || password === 'admin')) {
    const token = jwt.sign(
      { id: 'admin-01', username: 'admin', role: 'SUPER_ADMIN', name: 'Chief Election Commissioner' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    return res.json({
      message: 'Admin authentication successful',
      token,
      user: { id: 'admin-01', username: 'admin', role: 'SUPER_ADMIN', name: 'Chief Election Commissioner' }
    });
  }

  res.status(401).json({ error: 'Invalid admin credentials.' });
});

// Admin: Toggle Election Status
app.post('/api/admin/election-status', requireAdminAuth, (req: Request, res: Response) => {
  const { status } = req.body;
  if (!['UPCOMING', 'ACTIVE', 'CLOSED', 'FINALIZED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid election status' });
  }

  const updated = dbStore.updateElectionStatus(status);
  res.json({ message: `Election status updated to ${status}`, election: updated });
});

// Admin: Add Candidate
app.post('/api/admin/candidates', requireAdminAuth, (req: Request, res: Response) => {
  const candidateData = req.body;
  if (!candidateData.fullNameEn || !candidateData.partyId || !candidateData.districtId) {
    return res.status(400).json({ error: 'Missing candidate details' });
  }

  const newCand = dbStore.addCandidate(candidateData);
  res.json({ message: 'Candidate added successfully', candidate: newCand });
});

// Admin: Get Voters List (Verification status only, no ballot choices exposed)
app.get('/api/admin/voters', requireAdminAuth, (req: Request, res: Response) => {
  const voters = dbStore.getVotersList();
  res.json({ voters });
});

// Admin: Get Audit Logs
app.get('/api/admin/audit-logs', requireAdminAuth, (req: Request, res: Response) => {
  const logs = dbStore.getAuditLogs();
  res.json({ logs });
});

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  Sri Lanka Election Digital Simulation API Server  `);
    console.log(`  Server running on http://localhost:${PORT}        `);
    console.log(`====================================================`);
  });
}

export default app;
