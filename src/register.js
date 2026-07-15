const form = document.getElementById("registerForm");
const msg = document.getElementById("regMessage");

function showMsg(text, isError = false) {
  msg.textContent = text;
  msg.style.color = isError ? "#d00000" : "#0b7285";
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const idType = document.getElementById("regIdType").value;
  const idNumber = document.getElementById("regIdNumber").value.trim();
  const district = document.getElementById("regDistrict").value.trim();

  if (!name || !idNumber || !district) {
    showMsg("Please complete all fields.", true);
    return;
  }

  const voters = getLocalArray("voters");
  if (voters.some((voter) => voter.id_value === idNumber)) {
    showMsg("A voter with this ID is already registered.", true);
    return;
  }

  const voter = {
    name,
    id_type: idType,
    id_value: idNumber,
    district,
    created_at: new Date().toISOString()
  };

  voters.unshift(voter);
  saveLocalArray("voters", voters);
  localStorage.setItem("verifiedVoter", JSON.stringify({ voter_id: idNumber, name, district }));
  showMsg("Registration successful. Redirecting to vote...", false);
  setTimeout(() => (window.location.href = "index.html"), 900);
});
