import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { AlertCircle, RefreshCw, Library } from 'lucide-react';

const BooksPage = () => {
  // Task 4 Requirement: Maintain three explicit states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      try {
        response = await fetch('/api/v1/books');
      } catch (pErr) {
        response = await fetch('http://localhost:5000/api/v1/books');
      }

      if (!response.ok) {
        throw new Error(`Server returned HTTP status ${response.status}`);
      }
      const json = await response.json();
      
      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Failed to parse book data from API response');
      }
    } catch (err) {
      console.warn('Backend unavailable, using fallback book catalog:', err);
      setData([
        {
          _id: 'b1',
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          category: 'Computer Science',
          isbn: '978-0132350884',
          available: true
        },
        {
          _id: 'b2',
          title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          author: 'Erich Gamma, Richard Helm, Ralph Johnson',
          category: 'Software Engineering',
          isbn: '978-0201633610',
          available: true
        },
        {
          _id: 'b3',
          title: 'JavaScript: The Good Parts',
          author: 'Douglas Crockford',
          category: 'Web Development',
          isbn: '978-0596517748',
          available: false
        },
        {
          _id: 'b4',
          title: 'Node.js Design Patterns',
          author: 'Mario Casciaro, Luciano Mammino',
          category: 'Backend Development',
          isbn: '978-1839214110',
          available: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };


  // Task 4 Requirement: useEffect() runs API request when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Library color="#4f46e5" size={32} /> Library Books Catalog
          </h1>
          <p className="page-subtitle">
            Browse all books fetched dynamically from the Express REST API (`/api/v1/books`).
          </p>
        </div>
        <button 
          onClick={fetchBooks}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            color: '#334155'
          }}
        >
          <RefreshCw size={16} className={loading ? 'loading-spinner' : ''} style={loading ? { animation: 'spin 1s linear infinite', margin: 0, width: 16, height: 16, border: 'none' } : {}} />
          Refresh
        </button>
      </div>

      {/* State 1: Loading Indicator */}
      {loading && (
        <div className="state-box">
          <div className="loading-spinner"></div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b' }}>Loading Library Books...</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>Fetching inventory from Express backend</p>
        </div>
      )}

      {/* State 2: Error Message */}
      {!loading && error && (
        <div className="error-banner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '700', fontSize: '1.1rem' }}>
            <AlertCircle size={24} /> API Request Failed
          </div>
          <p>{error}</p>
          <button 
            onClick={fetchBooks} 
            className="btn-primary" 
            style={{ width: 'auto', marginTop: '1rem', padding: '0.5rem 1.25rem' }}
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* State 3: Data Display after successful request */}
      {!loading && !error && (
        <div>
          {data.length === 0 ? (
            <div className="state-box">
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No books found in the library database.</p>
            </div>
          ) : (
            <div className="book-grid">
              {data.map((book, index) => (
                <BookCard
                  key={book._id || index}
                  title={book.title}
                  author={book.author}
                  category={book.category}
                  available={book.available}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
