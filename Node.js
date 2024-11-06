app.get('/generate', async (req, res) => {
  try {
    const response = await fetch('https://api.mailinator.com/v2/domains/mydomain.com/emails');
    const data = await response.json();
    console.log('API Response:', data); // Log the response to debug
    if (data && data[0]) {
      generatedAlias = data[0].address;
      res.json({ alias: generatedAlias });
    } else {
      res.status(500).json({ error: 'Email generation failed' });
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});
