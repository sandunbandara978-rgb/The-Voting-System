const form = document.getElementById("verifyForm");
const msg = document.getElementById("verifyMessage");

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const idType = document.getElementById("verifyIdType").value;
  const idNumber = document.getElementById("verifyIdNumber").value.trim();

  if (!idNumber) {
    showMsg("Please enter your ID number.", true);
    return;
  }

  const voters = getLocalArray("voters");
  const voter = voters.find((item) => item.id_value === idNumber);
  if (!voter) {
    showMsg("No registered voter found with that ID.", true);
    return;
  }

  // store verified voter locally
  localStorage.setItem("verifiedVoter", JSON.stringify({ voter_id: voter.id_value, name: voter.name, district: voter.district }));
  showMsg("Verified. Redirecting to vote...", false);
  setTimeout(() => (window.location.href = "index.html"), 900);
});
