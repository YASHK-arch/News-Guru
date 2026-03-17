import React from 'react';
import { X, ExternalLink, Calendar } from 'lucide-react';

export default function ReadNewsModal({ readArticles, onClose }) {
  // Prevent clicks inside the modal from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContentClick}>
        
        <div className="modal-header">
          <h2>Articles You've Read</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close Modal">
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          {readArticles.length === 0 ? (
            <div className="empty-state">
              <p>You haven't read any articles yet.</p>
              <button className="btn-mark-read" onClick={onClose} style={{marginTop: '1rem'}}>
                Go read some news!
              </button>
            </div>
          ) : (
            <div className="read-list">
              {readArticles.map((article, index) => (
                <div key={article.url || index} className="read-item-card">
                  <div className="read-item-image">
                    <img 
                      src={article.image || fallbackImage} 
                      alt=""
                      onError={(e) => { e.target.src = fallbackImage }}
                    />
                  </div>
                  
                  <div className="read-item-details">
                    <div className="read-item-meta">
                      <span className="news-source">{article.source?.name || 'Unknown Source'}</span>
                      <span className="news-date">
                        <Calendar size={12} style={{display: 'inline', marginRight: '4px', verticalAlign: '-1px'}}/>
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                    
                    <h4 className="read-item-title">{article.title}</h4>
                    
                    <div className="read-item-actions">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-read-link"
                      >
                        Read Original <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
