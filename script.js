let currentAlias = ''; // To store the generated email alias

// Function to generate a temporary email
async function generateEmail() {
  try {
    const response = await fetch('https://your-backend-server.com/generate'); // Replace with your backend endpoint
    const data = await response.json();
    if (data.alias) {
      currentAlias = data.alias;
      document.getElementById('email-alias').innerText = 'Temporary Email: ' + currentAlias;
      fetchEmails(currentAlias); // Fetch emails for the generated alias
    } else {
      alert('Failed to generate email');
    }
  } catch (error) {
    alert('Error generating email: ' + error.message);
  }
}

// Function to fetch emails for the generated alias
async function fetchEmails(alias) {
  try {
    const response = await fetch(`https://your-backend-server.com/inbox?alias=${alias}`); // Replace with your inbox fetch URL
    const emails = await response.json();
    const inboxElement = document.getElementById('inbox');
    inboxElement.innerHTML = ''; // Clear the inbox before adding new emails

    if (emails.length === 0) {
      inboxElement.innerHTML = '<p>No emails yet.</p>';
    } else {
      const emailList = document.createElement('ul');
      emails.forEach(email => {
        const emailItem = document.createElement('li');
        emailItem.textContent = email.subject; // Customize according to the response structure
        emailList.appendChild(emailItem);
      });
      inboxElement.appendChild(emailList);
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
  }
}

// Function to refresh the inbox
function refreshInbox() {
  if (currentAlias) {
    fetchEmails(currentAlias); // Refresh the inbox using the current alias
  } else {
    alert('Generate an email first!');
  }
}
