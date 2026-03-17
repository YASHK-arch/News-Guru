import React from 'react';
import { Moon, Sun, BookOpen, Menu } from 'lucide-react';

const CATEGORIES = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

export default function Header({ category, setCategory, readCount, isDarkMode, toggleTheme, onReadCountClick }) {
  return (
    <header className="header glassmorphism">
      <div className="header-container">
        <div className="logo-group">
          <div className="logo-icon">
            <BookOpen size={28} />
          </div>
          <h1 className="logo-text">NewsGuru<span className="logo-dot">.</span></h1>
        </div>

        <nav className="categories-nav">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button 
            className="read-count-badge btn-read-modal" 
            title="View Read Articles"
            onClick={onReadCountClick}
          >
             <span className="badge-number">{readCount}</span>
             <span className="badge-label">Read</span>
          </button>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
