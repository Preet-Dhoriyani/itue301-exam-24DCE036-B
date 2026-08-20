import React from 'react';
import { BookMarked, CheckCircle2, XCircle, User, Tag } from 'lucide-react';

const BookCard = ({ title, author, category, available }) => {
  return (
    <div className="book-card">
      <div>
        <span className="book-category">
          <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
          {category || 'General'}
        </span>
        <h3 className="book-title">{title}</h3>
        <p className="book-author">
          <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
          By {author}
        </p>
      </div>
      <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
        {available ? (
          <span className="badge-available">
            <CheckCircle2 size={14} /> Available
          </span>
        ) : (
          <span className="badge-unavailable">
            <XCircle size={14} /> Not Available
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
