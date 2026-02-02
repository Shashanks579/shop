async function loadDashboard() {
    // 1. Fetch and Display Issues
    const issueResponse = await fetch('https://brain-8evh.onrender.com/api/issues');
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

    // 2. Fetch and Display Users
    const userResponse = await fetch('https://brain-8evh.onrender.com/api/users');
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
}

async function deleteItem(id, type) {
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
        const response = await fetch(`https://brain-8evh.onrender.com/api/${type}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Deleted successfully!");
            loadDashboard(); // Refresh the list automatically
        } else {
            alert("Failed to delete.");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}
// Run the function when the page loads
window.onload = loadDashboard;