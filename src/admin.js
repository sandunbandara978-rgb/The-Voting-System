const provinceDistrictMap = {
  "Western": ["Colombo", "Gampaha", "Kalutara"],
  "Central": ["Kandy", "Matale", "Nuwara Eliya"],
  "Southern": ["Galle", "Matara", "Hambantota"],
  "Northern": ["Jaffna", "Mullaitive"],
  "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
  "North Western": ["Kurunegala", "Puttalam"],
  "North Central": ["Polonnaruwa", "Matale"],
  "Uva": ["Badulla", "Monaragala"],
  "Sabaragamuwa": ["Ratnapura", "Kegalle"]
};

const registerForm = document.getElementById("adminRegisterForm");
const loginForm = document.getElementById("adminLoginForm");
const adminMessage = document.getElementById("adminMessage");
const loginMessage = document.getElementById("loginMessage");
const provinceSelect = document.getElementById("province");
const districtSelect = document.getElementById("district");
const districtLabel = document.getElementById("districtLabel");

function showAdminMessage(txt, isError = false) {
  adminMessage.textContent = txt;
  adminMessage.style.color = isError ? "#d00000" : "#0b7285";
}

function updateDistrictDropdown() {
  const selectedProvince = provinceSelect.value;
  districtSelect.innerHTML = '<option value="">Select district...</option>';

  if (selectedProvince && provinceDistrictMap[selectedProvince]) {
    districtLabel.style.display = "block";
    provinceDistrictMap[selectedProvince].forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  } else {
    districtLabel.style.display = "none";
    districtSelect.value = "";
  }
}

provinceSelect.addEventListener("change", updateDistrictDropdown);

function showLoginMessage(txt, isError = false) {
  loginMessage.textContent = txt;
  loginMessage.style.color = isError ? "#d00000" : "#0b7285";
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

function findAdminById(idValue) {
  const admins = getLocalArray("admins");
  return admins.find((admin) => admin.id_value === idValue) || null;
}

function registerAdmin(admin) {
  const admins = getLocalArray("admins");
  admins.unshift(admin);
  saveLocalArray("admins", admins);
  return { ok: true };
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("adminName").value.trim();
  const idType = document.getElementById("idType").value;
  const idNumber = document.getElementById("idNumber").value.trim();
  const province = document.getElementById("province").value;
  const district = document.getElementById("district").value;

  if (!name || !idNumber || !province || !district) {
    showAdminMessage("Please complete all required fields.", true);
    return;
  }

  // check duplicates
  const existing = await findAdminById(idNumber);
  if (existing) {
    showAdminMessage("An admin with this ID already exists.", true);
    return;
  }

  const admin = {
    name,
    id_type: idType,
    id_value: idNumber,
    province,
    district,
    created_at: new Date().toISOString()
  };

  const res = await registerAdmin(admin);
  if (!res.ok) {
    const err = res.error;
    const errText = typeof err === "string" ? err : (err?.message || JSON.stringify(err));
    showAdminMessage("Registration failed: " + errText, true);
    return;
  }

  registerForm.reset();
  updateDistrictDropdown();
  showAdminMessage("Admin registered successfully.", false);
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const idNumber = document.getElementById("loginIdNumber").value.trim();
  if (!idNumber) {
    showLoginMessage("Please enter your ID number.", true);
    return;
  }

  const admin = await findAdminById(idNumber);
  if (!admin) {
    showLoginMessage("Admin not found.", true);
    return;
  }

  // store admin session in localStorage
  localStorage.setItem("adminSession", JSON.stringify({
    id: admin.id,
    name: admin.name,
    id_type: admin.id_type,
    id_value: admin.id_value,
    province: admin.province,
    district: admin.district,
    loginTime: new Date().toISOString()
  }));

  showLoginMessage("Signed in as: " + admin.name + ". Redirecting...", false);
  setTimeout(() => (window.location.href = "dashboard.html"), 900);
});
