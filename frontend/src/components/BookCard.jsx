import React from 'react';
import { BookMarked, User, Tag, ShieldCheck, ShieldAlert, Sparkles, Hash } from 'lucide-react';

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div>
        <div className="book-card-top">
          <span className="book-category">
            <Tag size={12} />
            {category || 'General'}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
            <BookMarked size={14} color="#818cf8" />
          </span>
        </div>

        <h3 className="book-title">{title}</h3>
        
        <p className="book-author">
          <User size={15} color="#6366f1" />
          <span>By <strong>{author}</strong></span>
        </p>
      </div>

      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {available ? (
          <span className="badge-available">
            <span className="status-dot"></span>
            Available
          </span>
        ) : (
          <span className="badge-unavailable">
            <span className="status-dot"></span>
            Not Available
          </span>
        )}

        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>
          ID: #{title ? title.length * 17 : '101'}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
