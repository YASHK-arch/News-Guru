import React from 'react';
import NewsItem from './NewsItem';

export default function NewsList({ articles, isReadHelper, onMarkRead }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="empty-state">
        <p>No articles found. Try selecting another category.</p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <NewsItem 
          key={article.url || index} 
          article={article} 
          isRead={isReadHelper(article.url)}
          onMarkRead={() => onMarkRead(article)}
        />
      ))}
    </div>
  );
}
