import { useState, useEffect } from 'react';
import Header from './components/Header';
import NewsList from './components/NewsList';
import ReadNewsModal from './components/ReadNewsModal';
import './index.css';

const MOCK_DATA = [
  {
    "source": { "name": "CNN", "url": "https://cnn.com" },
    "title": "The Future of AI is Unfolding Rapidly Across Industries",
    "description": "Artificial intelligence continues to dominate tech headlines, with new advancements promising to revolutionize healthcare, finance, and daily life. Experts weigh in on the implications.",
    "url": "https://cnn.com/mock-article-1",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    "publishedAt": "2023-10-27T10:00:00Z"
  },
  {
    "source": { "name": "TechCrunch", "url": "https://techcrunch.com" },
    "title": "Quantum Computing Reaches Major Milestone in Stability",
    "description": "Researchers have demonstrated a new error-correction method that significantly increases the stability of qubits, bringing practical quantum computers a step closer to reality.",
    "url": "https://techcrunch.com/mock-article-2",
    "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "publishedAt": "2023-10-27T08:30:00Z"
  },
  {
    "source": { "name": "The Verge", "url": "https://theverge.com" },
    "title": "Electric Vehicles Take Over the Roads: Sales Hit Record High",
    "description": "Global EV sales have surpassed expectations this quarter, driven by new affordable models and expanding charging infrastructure infrastructure.",
    "url": "https://theverge.com/mock-article-3",
    "image": "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?w=800&q=80",
    "publishedAt": "2023-10-26T14:15:00Z"
  }
];

const API_KEY = '153645dbd2e1826abb3a031a4767209c'; // Replace with your actual GNews API key

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize readArticles from localStorage if available
  const [readArticles, setReadArticles] = useState(() => {
    try {
      const saved = localStorage.getItem('newsGuruRead');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse read articles from local storage", e);
    }
    return [];
  });

  const [showReadModal, setShowReadModal] = useState(false);

  // Sync to localStorage whenever readArticles changes
  useEffect(() => {
    localStorage.setItem('newsGuruRead', JSON.stringify(readArticles));
  }, [readArticles]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // GNews uses structured topic categories
        const gnewsCategory = category === 'general' ? 'world' : category;
        console.log("Fetching category:", gnewsCategory); // Debug Tip from GPT

        const targetUrl = `https://gnews.io/api/v4/top-headlines?category=${gnewsCategory}&lang=en&country=in&apikey=${API_KEY}`;

        // Using corsproxy.io as a better proxy alternative to allorigins.win
        const proxyUrl = `https://corsproxy.io/?${targetUrl}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Invalid or missing API Key. Please update the API_KEY variable in App.jsx with a GNews API Key.");
          }
          throw new Error("Failed to fetch news.");
        }

        const data = await response.json();
        // GNews returns the array in the 'articles' field, similar to NewsAPI
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setArticles(MOCK_DATA);
      } finally {
        setLoading(false); // Ensures loading spinner is always removed
      }
    };

    fetchNews();
  }, [category]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // We now pass the entire article object, not just URL
  const handleMarkRead = (article) => {
    setReadArticles(prev => {
      // Prevent duplicates based on URL
      if (prev.some(a => a.url === article.url)) return prev;
      return [article, ...prev]; // Add to top of list
    });
  };

  // Helper to check if an article URL is read
  const isRead = (url) => readArticles.some(a => a.url === url);

  return (
    <div className="app-container">
      <Header
        category={category}
        setCategory={setCategory}
        readCount={readArticles.length}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onReadCountClick={() => setShowReadModal(true)}
      />

      <main className="main-content">
        <div className="content-header">
          <h2>
            {category.charAt(0).toUpperCase() + category.slice(1)} News
            {loading && <span className="loading-spinner"></span>}
          </h2>
          {error && <div className="api-notice">{error}</div>}
        </div>

        {loading && articles.length === 0 ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Fetching latest headlines...</p>
          </div>
        ) : (
          <NewsList
            articles={articles}
            isReadHelper={isRead}
            onMarkRead={handleMarkRead}
          />
        )}
      </main>

      {showReadModal && (
        <ReadNewsModal
          readArticles={readArticles}
          onClose={() => setShowReadModal(false)}
        />
      )}
    </div>
  );
}

export default App;
