require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow requests from any origin

app.get('/news', async (req, res) => {
  try {
    const category = req.query.category || 'world';
    const apiKey = process.env.GNEWS_API_KEY;
    
    if (!apiKey) {
       return res.status(500).json({ error: 'API key not configured on server' });
    }

    const targetUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&apikey=${apiKey}`;
    
    // Using native fetch (requires Node.js 18+)
    const response = await fetch(targetUrl);
    const data = await response.json();
    
    if (!response.ok) {
        return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
