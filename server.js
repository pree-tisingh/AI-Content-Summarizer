const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/scrape', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Fetching HTML from: ${url}`);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const textContent = $('body').text();

    console.log(`Fetched content: ${textContent.substring(0, 100)}...`);
    res.json({ content: textContent });
  } catch (error) {
    console.error('Error fetching HTML:', error.message);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
