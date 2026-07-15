// Admin Dashboard - register voters
const registerForm = document.getElementById("registerVoterForm");
const voterMessage = document.getElementById("voterMessage");
const logoutButton = document.getElementById("logoutButton");
const adminGreeting = document.getElementById("adminGreeting");
const votersList = document.getElementById("votersList");
const generateReportBtn = document.getElementById('generateReport');
const downloadCsvBtn = document.getElementById('downloadCsv');
const reportContainer = document.getElementById('reportContainer');

// Admin info display
const infoName = document.getElementById("infoName");
const infoIdType = document.getElementById("infoIdType");
const infoIdValue = document.getElementById("infoIdValue");
const infoProvince = document.getElementById("infoProvince");
const infoDistrict = document.getElementById("infoDistrict");

function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem("adminSession"));
  } catch (e) {
    return null;
  }
}

function showVoterMessage(text, isError = false) {
  voterMessage.textContent = text;
  voterMessage.style.color = isError ? "#d00000" : "#0b7285";
}

function getLocalArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function loadAdminInfo() {
  const admin = getAdminSession();
  if (!admin) {
    // redirect to login if no session
    window.location.href = "admin.html";
    return;
  }

  adminGreeting.textContent = `Welcome, ${admin.name}!`;
  infoName.textContent = admin.name;
  infoIdType.textContent = admin.id_type;
  infoIdValue.textContent = admin.id_value;
  infoProvince.textContent = admin.province;
  infoDistrict.textContent = admin.district;
}

function fetchRegisteredVoters() {
  const voters = getLocalArray("voters");
  return voters.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)).slice(0, 10);
}

function renderVotersList(voters) {
  if (voters.length === 0) {
    votersList.innerHTML = "<p>No voters registered yet.</p>";
    return;
  }

  votersList.innerHTML = voters
    .map(
      (voter) => `
        <div class="history-row">
          <div>
            <strong>${voter.name}</strong>
            <div>${voter.district} • ${voter.id_value}</div>
          </div>
          <div>${voter.id_type}</div>
        </div>`
    )
    .join("");
}

async function loadVoters() {
  const voters = await fetchRegisteredVoters();
  renderVotersList(voters);
}

function maskId(idValue) {
  if (!idValue) return '';
  const s = String(idValue);
  const last = s.slice(-4);
  const masked = last.padStart(s.length, '•');
  return masked;
}

function fetchVotesReport() {
  return getLocalArray("votes");
}

function renderReport(votes) {
  if (!reportContainer) return;
  if (!votes || votes.length === 0) {
    reportContainer.innerHTML = '<p>No votes recorded.</p>';
    return;
  }

  const rows = votes.map(v => {
    const candidate = v.selected_candidate || '';
    const ts = v.timestamp ? new Date(v.timestamp).toLocaleString() : '';
    return `
      <div class="history-row" style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.03);">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700">${escapeHtml(v.name || '')}</div>
          <div style="font-size:0.9rem;color:var(--muted,#9fb3c8)">${escapeHtml(v.district || '')} • ${escapeHtml(maskId(v.voter_id || v.voterId || ''))}</div>
        </div>
        <div style="width:220px;text-align:right">
          <div style="font-weight:600">${escapeHtml(candidate)}</div>
          <div style="font-size:0.9rem;color:var(--muted,#9fb3c8)">${escapeHtml(ts)}</div>
        </div>
      </div>`;
  });

  reportContainer.innerHTML = rows.join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function downloadCsv(votes) {
  if (!votes || votes.length === 0) return;
  const headers = ['name','district','masked_voter_id','selected_candidate','timestamp'];
  const lines = [headers.join(',')];
  votes.forEach(v => {
    const row = [
      csvCell(v.name),
      csvCell(v.district),
      csvCell(maskId(v.voter_id || v.voterId || '')),
      csvCell(v.selected_candidate),
      csvCell(v.timestamp)
    ];
    lines.push(row.join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `votes_report_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvCell(val) {
  if (val == null) return '""';
  const s = String(val).replace(/"/g, '""');
  return `"${s}"`;
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("voterName").value.trim();
  const idType = document.getElementById("voterIdType").value;
  const idNumber = document.getElementById("voterIdNumber").value.trim();
  const district = document.getElementById("voterDistrict").value.trim();

  if (!name || !idNumber || !district) {
    showVoterMessage("Please complete all fields.", true);
    return;
  }

  const voters = getLocalArray("voters");
  if (voters.some((v) => v.id_value === idNumber)) {
    showVoterMessage("A voter with this ID is already registered.", true);
    return;
  }

  voters.unshift({
    name,
    id_type: idType,
    id_value: idNumber,
    district,
    created_at: new Date().toISOString()
  });
  saveLocalArray("voters", voters);

  registerForm.reset();
  showVoterMessage("Voter registered successfully.", false);
  loadVoters();
});

logoutButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminSession");
    window.location.href = "admin.html";
  }
});

// Initialize on page load
loadAdminInfo();
loadVoters();

// report wiring
if (generateReportBtn) {
  generateReportBtn.addEventListener('click', async () => {
    generateReportBtn.disabled = true;
    generateReportBtn.textContent = 'Loading...';
    const votes = await fetchVotesReport();
    renderReport(votes);
    generateReportBtn.disabled = false;
    generateReportBtn.textContent = 'Generate Report';
  });
}

if (downloadCsvBtn) {
  downloadCsvBtn.addEventListener('click', async () => {
    downloadCsvBtn.disabled = true;
    downloadCsvBtn.textContent = 'Preparing...';
    const votes = await fetchVotesReport();
    downloadCsv(votes);
    downloadCsvBtn.disabled = false;
    downloadCsvBtn.textContent = 'Download CSV';
  });
}
