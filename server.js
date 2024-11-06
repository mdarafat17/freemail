const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

let generatedAlias = '';

app.use(express.static('public'));

app.get('/generate', async (req, res) => {
  const response = await fetch('https://api.mailinator.com/v2/domains/mydomain.com/emails');
  const data = await response.json();
  generatedAlias = data[0].address;
  res.json({ alias: generatedAlias });
});

app.get('/emails/:alias', async (req, res) => {
  const alias = req.params.alias;
  const response = await fetch(`https://api.mailinator.com/v2/domains/mydomain.com/emails/${alias}`);
  const data = await response.json();
  res.json({ emails: data });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
