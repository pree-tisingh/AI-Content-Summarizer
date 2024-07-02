const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.get('/scrape', async (req, res) => {
  const { url, fullPage } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Fetching HTML from: ${url}`);
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let content;
    if (fullPage === 'true') {
      content = $('body').html(); // Full page HTML
    } else {
      content = $('p').text(); // Only paragraph text
    }

    console.log(`Fetched content: ${content.substring(0, 100)}...`);
    res.json({ content });
  } catch (error) {
    console.error('Error fetching HTML:', error.message);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.put('/api/scraped-content', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  scrapedContent = content;
  res.json({ message: 'Content updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
