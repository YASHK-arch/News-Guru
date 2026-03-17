import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, ExternalLink } from 'lucide-react';

export default function NewsItem({ article, isRead, onMarkRead }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // A high quality fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80';

  return (
    <div className={`news-card ${isRead ? 'read' : ''}`}>
      <div className="news-image-container">
        <img 
          src={article.image || fallbackImage} 
          alt={article.title} 
          className="news-image"
          onError={(e) => { e.target.src = fallbackImage }}
        />
        {isRead && (
          <div className="read-badge">
            <CheckCircle size={16} />
            <span>Read</span>
          </div>
        )}
      </div>
      <div className="news-content">
        <div className="news-meta">
          <span className="news-source">{article.source?.name || 'Unknown Source'}</span>
          <span className="news-date">
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
          </span>
        </div>
        
        <h3 className={`news-title ${isRead ? 'strike-through' : ''}`}>
          {article.title}
        </h3>
        
        <div className={`news-description ${isExpanded ? 'expanded' : ''}`}>
          <p>{article.description || 'No description available for this article.'}</p>
        </div>
        
        <div className="news-actions">
          <button 
            className="btn-expand" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <><ChevronUp size={16}/> Less</> : <><ChevronDown size={16}/> More</>}
          </button>
          
          <div className="action-right">
            {article.url && (
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn-link" title="Read original article">
                <ExternalLink size={16} />
              </a>
            )}
            {!isRead && (
              <button 
                className="btn-mark-read" 
                onClick={onMarkRead}
              >
                Mark as Read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
