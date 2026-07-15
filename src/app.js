const candidates = [
  {
    id: "rw",
    name: "Ranil Wickremesinghe",
    party: "United National Party (UNP)"
  },
  {
    id: "sp",
    name: "Sajith Premadasa",
    party: "Sri Lanka Podujana Peramuna (SLPP)"
  },
  {
    id: "md",
    name: "Maithripala Sirisena",
    party: "Sri Lanka Freedom Party (SLFP)"
  },
  {
    id: "ad",
    name: "Anura Kumara Dissanayake",
    party: "National People's Power (NPP)"
  }
];

const voteForm = document.getElementById("voteForm");
const candidateList = document.getElementById("candidateList");
const resultsEl = document.getElementById("results");
const messageEl = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const verifyNotice = document.getElementById("verifyNotice");
const voterDetailsSection = document.getElementById("voterDetailsSection");
const detailsName = document.getElementById("detailsName");
const detailsVoterId = document.getElementById("detailsVoterId");
const detailsDistrict = document.getElementById("detailsDistrict");
const logoutVoterButton = document.getElementById("logoutVoterButton");
const confirmModal = document.getElementById("confirmModal");
const confirmText = document.getElementById("confirmText");
const confirmButton = document.getElementById("confirmButton");
const confirmCancel = document.getElementById("confirmCancel");

let pendingVote = null;

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

function getVerifiedVoter() {
  try {
    return JSON.parse(localStorage.getItem("verifiedVoter"));
  } catch (e) {
    return null;
  }
}

function applyVerificationToForm() {
  const v = getVerifiedVoter();
  if (v) {
    // Voter is verified, show details and hide verification notice
    if (voterDetailsSection) voterDetailsSection.style.display = "block";
    if (detailsName) detailsName.textContent = v.name;
    if (detailsVoterId) detailsVoterId.textContent = v.voter_id;
    if (detailsDistrict) detailsDistrict.textContent = v.district;
    if (verifyNotice) verifyNotice.style.display = "none";
  } else {
    // Voter not verified, hide details and show verification notice
    if (voterDetailsSection) voterDetailsSection.style.display = "none";
    if (verifyNotice) verifyNotice.style.display = "block";
  }
}

function fetchVotes() {
  return getLocalArray("votes");
}

function calculateResults(votes) {
  const totals = candidates.reduce((acc, candidate) => {
    acc[candidate.id] = 0;
    return acc;
  }, {});

  votes.forEach((vote) => {
    if (vote.selected_candidate in totals) {
      totals[vote.selected_candidate] += 1;
    }
  });

  return totals;
}

function renderCandidates() {
  candidateList.innerHTML = "";

  candidates.forEach((candidate) => {
    const item = document.createElement("label");
    item.className = "candidate-item";
    item.innerHTML = `
      <input type="radio" name="candidate" value="${candidate.id}" />
      <span class="candidate-label">
        <span>${candidate.name}</span>
        <small>${candidate.party}</small>
      </span>
    `;

    candidateList.appendChild(item);
  });
}

function renderResults(votes) {
  const totals = calculateResults(votes);

  resultsEl.innerHTML = candidates
    .map(
      (candidate) => `
        <div class="result-row">
          <div>
            <strong>${candidate.name}</strong>
            <div>${candidate.party}</div>
          </div>
          <div>${totals[candidate.id] || 0} votes</div>
        </div>`
    )
    .join("");
}


function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? "#d00000" : "#0b7285";
}

function loadAndRender() {
  const votes = fetchVotes();
  renderResults(votes);
}

function createVote(vote) {
  const votes = getLocalArray("votes");
  const existing = votes.find((item) => item.voter_id === vote.voter_id);
  if (existing) {
    showMessage("This voter ID has already cast a vote. One vote per voter only.", true);
    return false;
  }
  votes.unshift(vote);
  saveLocalArray("votes", votes);
  return true;
}

voteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const v = getVerifiedVoter();
  if (!v) {
    showMessage("You must verify your voter ID before voting. Please register or verify first.", true);
    return;
  }

  const name = v.name;
  const nic = v.voter_id;
  const district = v.district;
  const selectedCandidate = voteForm.querySelector("input[name='candidate']:checked")?.value;

  if (!selectedCandidate) {
    showMessage("Please choose a candidate before submitting.", true);
    return;
  }

  // prepare pending vote and show confirmation modal
  pendingVote = {
    voter_id: nic,
    name,
    district,
    selected_candidate: selectedCandidate,
    timestamp: new Date().toISOString()
  };

  if (confirmText) {
    const candidateObj = candidates.find(c => c.id === selectedCandidate);
    confirmText.textContent = `You are about to vote for ${candidateObj ? candidateObj.name : selectedCandidate}. This action is final and will be recorded.`;
  }

  if (confirmModal) {
    confirmModal.style.display = "flex";
    confirmModal.setAttribute("aria-hidden", "false");
  }
});

resetButton.addEventListener("click", () => {
  if (!confirm("Reset all demo votes and history?")) {
    return;
  }
  saveLocalArray("votes", []);
  loadAndRender();
  showMessage("Demo vote data reset.", false);
});

logoutVoterButton.addEventListener("click", () => {
  if (confirm("Clear verified voter and vote as a different voter?")) {
    localStorage.removeItem("verifiedVoter");
    voteForm.reset();
    applyVerificationToForm();
    showMessage("Voter cleared. Please register or verify a new voter.", false);
  }
});

// confirm modal actions
if (confirmCancel) {
  confirmCancel.addEventListener('click', () => {
    pendingVote = null;
    if (confirmModal) {
      confirmModal.style.display = 'none';
      confirmModal.setAttribute('aria-hidden', 'true');
    }
    showMessage('Vote cancelled. You can choose another candidate.', false);
  });
}

if (confirmButton) {
  confirmButton.addEventListener('click', async () => {
    if (!pendingVote) return;
    confirmButton.disabled = true;
    confirmButton.textContent = 'Submitting...';

    const success = await createVote(pendingVote);
    if (success) {
      voteForm.reset();
      await loadAndRender();
      showMessage('Vote confirmed and recorded. Thank you for voting!', false);
      // redirect to home after a short delay so user sees the confirmation
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1400);
    }

    pendingVote = null;
    if (confirmModal) {
      confirmModal.style.display = 'none';
      confirmModal.setAttribute('aria-hidden', 'true');
    }

    confirmButton.disabled = false;
    confirmButton.textContent = 'Confirm Vote';
  });
}

renderCandidates();
applyVerificationToForm();
loadAndRender();
