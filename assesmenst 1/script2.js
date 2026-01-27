const addBtn = document.getElementById("addDocBtn");
const formBox = document.getElementById("addDocForm");
const overlay = document.getElementById("overlay");
const form = document.getElementById("docForm");
const docNameInput = document.getElementById("docName");
const tableBody = document.getElementById("docTableBody");
const search = document.getElementById("search");
const pendingWrapper = document.getElementById("pendingCountWrapper");
const pendingCountInput = document.getElementById("pendingCount");


const userBtn = document.getElementById("user-btn");
const userMenu = document.getElementById("user-dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");

let editingId = null; 

document.addEventListener("DOMContentLoaded", () => {
  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      pendingWrapper.style.display = e.target.value === "pending" ? "block" : "none";
      if (e.target.value !== "pending") pendingCountInput.value = "";
    });
  });
  renderDocs();
});

// Modal Controls
addBtn.addEventListener("click", () => {
  editingId = null;
  form.reset();
  pendingWrapper.style.display = "none"; // Ensure pending input is hidden on new
  document.querySelector('.submit').innerText = "Create Document";
  document.querySelector('.form-header h2').innerText = "Add New Document";
  formBox.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", closeModal);

function closeModal() {
  formBox.classList.remove("active");
  overlay.classList.remove("active");
  editingId = null;
  form.reset();
}

// Global Menu Toggle
function toggleMenu(event, id) {
  event.stopPropagation();
  const menu = document.getElementById(`menu-${id}`);
  
  document.querySelectorAll('.dropdown-menu').forEach(m => {
    if(m.id !== `menu-${id}`) m.classList.remove('show');
  });

  if (menu) {
    menu.classList.toggle('show');
    // Flip check
    const rect = menu.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      menu.style.top = "auto";
      menu.style.bottom = "100%";
    } else {
      menu.style.top = "30px";
      menu.style.bottom = "auto";
    }
  }
}

window.onclick = () => {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
};

// CRUD Operations
function deleteDoc(id) {
  if (confirm("Are you sure?")) {
    let docs = JSON.parse(localStorage.getItem("documents")) || [];
    docs = docs.filter(d => d.id !== id);
    localStorage.setItem("documents", JSON.stringify(docs));
    
    renderDocs(); // <--- MAKE SURE THIS LINE EXISTS
  }
}

function editDoc(id) {
  const docs = JSON.parse(localStorage.getItem("documents")) || [];
  const doc = docs.find(d => d.id === id);
  if (!doc) return;

  editingId = id;
  docNameInput.value = doc.name;
  
  const radio = document.querySelector(`input[name="status"][value="${doc.status}"]`);
  if (radio) radio.checked = true;
  
  pendingWrapper.style.display = doc.status === "pending" ? "block" : "none";
  pendingCountInput.value = doc.pendingCount || "";

  document.querySelector('.submit').innerText = "Update Document";
  document.querySelector('.form-header h2').innerText = "Edit Document";
  formBox.classList.add("active");
  overlay.classList.add("active");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const docName = docNameInput.value.trim();
  const statusElement = document.querySelector('input[name="status"]:checked');
  
  if (!docName || !statusElement) {
    alert("Please fill in all fields.");
    return;
  }

  const status = statusElement.value;
  if (status === "pending" && !pendingCountInput.value) {
    alert("Please enter number of people");
    return;
  }

  let docs = JSON.parse(localStorage.getItem("documents")) || [];

  if (editingId) {
    docs = docs.map(d => d.id === editingId ? {
      ...d,
      name: docName,
      status: status,
      pendingCount: status === 'pending' ? Number(pendingCountInput.value) : null
    } : d);
  } else {
    const newDoc = {
      id: Date.now(),
      name: docName,
      status: status,
      pendingCount: status === "pending" ? Number(pendingCountInput.value) : null,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    docs.unshift(newDoc);
  }

  localStorage.setItem("documents", JSON.stringify(docs));
  renderDocs();
  closeModal();
});

function renderDocs(docsToRender = null) {
  const docs = docsToRender !== null ? docsToRender : JSON.parse(localStorage.getItem("documents")) || [];
  tableBody.innerHTML = "";

  if (docs.length === 0) {
    const message = search.value ? `No results for "${search.value}"` : "No documents found";
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 40px; color: #64748b;">${message}</td></tr>`;
    return;
  }

  docs.forEach((doc) => {
    const row = document.createElement("tr");
    const status = doc.status || "";
    
    let statusContent = status === "pending" 
      ? `<span class="status-badge status-pending">Pending</span>
         <div class="waiting-text">Waiting for <div class="people">${doc.pendingCount || 0} ${doc.pendingCount == 1 ? 'person' : 'people'}</div></div>`
      : `<span class="status-badge ${getStatusClass(status)}">${formatStatus(status)}</span>`;

    row.innerHTML = `
      <td><div class="doc-name"><input type="checkbox" /><span>${doc.name || 'Untitled'}</span></div></td>
      <td><div class="status-container">${statusContent}</div></td>
      <td class="last-modified">${doc.date || 'N/A'}<br />${doc.time || ''}</td>
      <td>
        <div class="doc-action">
          <button class="btn">${getActionText(status)}</button>
          <div class="menu-wrapper">
            <i class="ri-more-2-fill more-icon" onclick="toggleMenu(event, ${doc.id})"></i>
            <div class="dropdown-menu" id="menu-${doc.id}">
              <div class="menu-item-action" onclick="editDoc(${doc.id})"><i class="ri-edit-line"></i> Edit</div>
              <div class="menu-item-action delete" onclick="deleteDoc(${doc.id})"><i class="ri-delete-bin-line"></i> Delete</div>
            </div>
          </div>
        </div>
      </td>`;
    tableBody.appendChild(row);
  });
}

// Safer Helpers
function getStatusClass(s) { 
  if (!s) return "";
  const classes = { "needs-signing": "status-needs-signing", "pending": "status-pending", "completed": "status-completed" };
  return classes[s] || ""; 
}

function formatStatus(s) { 
  if (!s) return "Unknown";
  return s.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase()); 
}

function getActionText(s) { 
  if (!s) return "View";
  const actions = { "needs-signing": "Sign now", "pending": "Preview", "completed": "Download PDF" };
  return actions[s] || "View"; 
}

search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  const docs = JSON.parse(localStorage.getItem("documents")) || [];
  if (!query) {
    renderDocs();
    return;
  }
  const filteredDocs = docs.filter(doc => doc && doc.name && doc.name.toLowerCase().includes(query));
  renderDocs(filteredDocs);
});

// localStorage.clear();

// Toggle Menu
userBtn.addEventListener("click", (e) => {
  
  e.stopPropagation(); // Prevent global window click from closing it immediately
  userMenu.classList.toggle("active");
});

// Logout Action
// logoutBtn.addEventListener("click", () => {
//   if (confirm("Are you sure you want to logout?")) {
//     // Clear session or redirect
//     localStorage.removeItem("currentUser"); // Example
//     window.location.reload(); 
//   }
// });

// Close menu when clicking outside
window.addEventListener("click", () => {
  if (userMenu.classList.contains("active")) {
    userMenu.classList.remove("active");
  }
});