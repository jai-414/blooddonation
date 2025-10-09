// frontend/main.js
const API_BASE = "http://localhost:5000/api/users";

// POST helper
async function postData(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch(err) {
    alert("Server error. Try again later.");
  }
}

// GET helper
async function getData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch(err) {
    alert("Server error. Try again later.");
  }
}
