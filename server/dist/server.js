"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store_1 = require("./db/store");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sri-lanka-voting-simulation-secret-2026';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
// Middleware for Admin Auth
function requireAdminAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded.role !== 'SUPER_ADMIN' && decoded.role !== 'ELECTION_OFFICER') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
        req.adminUser = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
// --- Public Endpoints ---
// 1. Get Election Info
app.get('/api/election', (req, res) => {
    const election = store_1.dbStore.getActiveElection();
    res.json({ election });
});
// Global Database Connection Status Endpoint
app.get('/api/db-status', (req, res) => {
    const status = store_1.dbStore.getDbStatus();
    res.json(status);
});
// 2. Get Electoral Districts
app.get('/api/districts', (req, res) => {
    const districts = store_1.dbStore.getDistricts();
    res.json({ districts });
});
// 3. Get Political Parties
app.get('/api/parties', (req, res) => {
    const parties = store_1.dbStore.getParties();
    res.json({ parties });
});
// 4. Get Candidates (by district & party)
app.get('/api/candidates', (req, res) => {
    const { districtId, partyId } = req.query;
    const candidates = store_1.dbStore.getCandidates(districtId, partyId);
    res.json({ candidates });
});
// 5. Verify Voter Identity
app.post('/api/verify-identity', (req, res) => {
    const { identityType, documentNumber, dateOfBirth } = req.body;
    if (!identityType || !documentNumber) {
        return res.status(400).json({ error: 'Identification document type and document number are required.' });
    }
    const voter = store_1.dbStore.verifyVoterIdentity(identityType, documentNumber, dateOfBirth);
    if (!voter) {
        return res.status(404).json({ error: 'Voter record not found in the electoral roll.' });
    }
    // Issue temporary voter session token
    const token = jsonwebtoken_1.default.sign({ voterId: voter.id, docNumber: voter.documentNumber, districtId: voter.districtId }, JWT_SECRET, { expiresIn: '2h' });
    res.json({
        message: 'Identity successfully verified.',
        voter,
        token
    });
});
// 6. Cast Anonymous Ballot
app.post('/api/cast-vote', (req, res) => {
    const { voterId, districtId, partyId, candidateIds } = req.body;
    if (!voterId || !districtId || !partyId) {
        return res.status(400).json({ error: 'Missing required voting parameters.' });
    }
    const result = store_1.dbStore.castBallot(voterId, districtId, partyId, candidateIds || []);
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
app.get('/api/results', (req, res) => {
    const results = store_1.dbStore.getResultsSummary();
    res.json(results);
});
// --- Admin Endpoints ---
// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Simple secure demo credentials: admin / election2026
    if (username === 'admin' && (password === 'election2026' || password === 'admin')) {
        const token = jsonwebtoken_1.default.sign({ id: 'admin-01', username: 'admin', role: 'SUPER_ADMIN', name: 'Chief Election Commissioner' }, JWT_SECRET, { expiresIn: '8h' });
        return res.json({
            message: 'Admin authentication successful',
            token,
            user: { id: 'admin-01', username: 'admin', role: 'SUPER_ADMIN', name: 'Chief Election Commissioner' }
        });
    }
    res.status(401).json({ error: 'Invalid admin credentials.' });
});
// Admin: Toggle Election Status
app.post('/api/admin/election-status', requireAdminAuth, (req, res) => {
    const { status } = req.body;
    if (!['UPCOMING', 'ACTIVE', 'CLOSED', 'FINALIZED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid election status' });
    }
    const updated = store_1.dbStore.updateElectionStatus(status);
    res.json({ message: `Election status updated to ${status}`, election: updated });
});
// Admin: Add Candidate
app.post('/api/admin/candidates', requireAdminAuth, (req, res) => {
    const candidateData = req.body;
    if (!candidateData.fullNameEn || !candidateData.partyId || !candidateData.districtId) {
        return res.status(400).json({ error: 'Missing candidate details' });
    }
    const newCand = store_1.dbStore.addCandidate(candidateData);
    res.json({ message: 'Candidate added successfully', candidate: newCand });
});
// Admin: Get Voters List (Verification status only, no ballot choices exposed)
app.get('/api/admin/voters', requireAdminAuth, (req, res) => {
    const voters = store_1.dbStore.getVotersList();
    res.json({ voters });
});
// Admin: Get Audit Logs
app.get('/api/admin/audit-logs', requireAdminAuth, (req, res) => {
    const logs = store_1.dbStore.getAuditLogs();
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
exports.default = app;
