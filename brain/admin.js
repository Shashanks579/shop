// 1. Grab the password from the URL once
const urlParams = new URLSearchParams(window.location.search);
const myPassword = urlParams.get('pass');

async function loadDashboard() {
    try {
        // A. Fetch Issues (with password)
        const issueResponse = await fetch('https://brain-8evh.onrender.com/api/issues', {
            headers: { 'Authorization': myPassword } // REQUIRED
        });

        // If password is wrong, redirect immediately
        if (issueResponse.status === 403) {
            alert("Access Denied: Incorrect Password");
            window.location.href = "index.html";
            return;
        }

        const issues = await issueResponse.json();
        const issueContainer = document.getElementById('issue-list');
        issueContainer.innerHTML = issues.map(issue => `
            <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${issue.name}</strong> (${issue.email})<br>
                    <em>Issue: ${issue.issue}</em>
                </div>
                <button onclick="deleteItem('${issue._id}', 'issues')" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Delete</button>
            </div>
        `).join('');

        // B. Fetch Users (with password)
        const userResponse = await fetch('https://brain-8evh.onrender.com/api/users', {
            headers: { 'Authorization': myPassword } // REQUIRED
        });
        const users = await userResponse.json();
        const userContainer = document.getElementById('user-list');
        userContainer.innerHTML = users.map(user => `
            <div style="border-bottom: 1px solid #ccc; margin-bottom: 10px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>Email: ${user.email}</strong><br>
                    <span>Password: ${user.password}</span>
                </div>
                <button onclick="deleteItem('${user._id}', 'users')" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Delete</button>
            </div>
        `).join('');

    } catch (err) {
        console.error("Error loading dashboard:", err);
    }
}

async function deleteItem(id, type) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
        const response = await fetch(`https://brain-8evh.onrender.com/api/${type}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': myPassword } // REQUIRED
        });

        if (response.ok) {
            alert("Deleted successfully!");
            loadDashboard(); 
        } else {
            alert("Failed to delete. You might not have permission.");
        }
    } catch (err) {
        console.error("Delete Error:", err);
    }
}

// Start the process
window.onload = loadDashboard;