let currentAlias = '';
let previousEmailCount = 0;

async function generateEmail() {
  const response = await fetch('https://your-backend-server.com/generate');
  const data = await response.json();
  currentAlias = data.alias;
  document.getElementById('email-alias').innerText = currentAlias;

  fetchEmails(currentAlias);
}

async function fetchEmails(alias) {
  const response = await fetch(`https://your-backend-server.com/emails/${alias}`);
  const data = await response.json();
  const emailSection = document.getElementById('emails');
  emailSection.innerHTML = '';

  if (data.emails.length === 0) {
    emailSection.innerText = 'No emails yet. Emails will appear here.';
  } else {
    data.emails.forEach(email => {
      const emailDiv = document.createElement('div');
      emailDiv.className = 'email-item';
      emailDiv.innerHTML = `<strong>Subject:</strong> ${email.subject}<br><strong>Body:</strong> ${email.body}`;
      emailSection.appendChild(emailDiv);
    });
  }

  if (data.emails.length > previousEmailCount) {
    showNotification();
  }
  previousEmailCount = data.emails.length;
}

function showNotification() {
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

setInterval(() => {
  if (currentAlias) fetchEmails(currentAlias);
}, 10000);

function refreshInbox() {
  if (currentAlias) {
    fetchEmails(currentAlias);
  }
}
