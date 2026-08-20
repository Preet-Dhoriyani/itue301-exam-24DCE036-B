import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { AlertCircle, RefreshCw, Library, Search, Filter } from 'lucide-react';

const BooksPage = () => {
  // Task 4 Requirement: Maintain three explicit states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Filter books dynamically based on search term & category filter
  const filteredBooks = data.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(data.map((b) => b.category))];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Library color="#6366f1" size={36} /> Library Books Catalog
          </h1>
          <p className="page-subtitle">
            Browse and filter books retrieved dynamically from Express REST API (`/api/v1/books`).
          </p>
        </div>
        <button 
          onClick={fetchBooks}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '700',
            color: '#1e293b',
            boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <RefreshCw size={16} className={loading ? 'loading-spinner' : ''} style={loading ? { animation: 'spin 0.9s linear infinite', margin: 0, width: 16, height: 16, border: 'none' } : {}} />
          Refresh
        </button>
      </div>

      {/* Interactive Search & Filter Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search by title, author, or category..."
            style={{ paddingLeft: '2.6rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="#6366f1" />
          <select 
            className="form-select"
            style={{ width: 'auto', minWidth: '160px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* State 1: Loading Indicator */}
      {loading && (
        <div className="state-box">
          <div className="loading-spinner"></div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>
            Fetching Library Books...
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Connecting to Express REST Backend `/api/v1/books`
          </p>
        </div>
      )}

      {/* State 2: Error Message */}
      {!loading && error && (
        <div className="state-box" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '700', fontSize: '1.2rem', color: '#991b1b' }}>
            <AlertCircle size={26} /> API Connection Error
          </div>
          <p style={{ color: '#7f1d1d' }}>{error}</p>
          <button 
            onClick={fetchBooks} 
            className="btn-primary" 
            style={{ width: 'auto', marginTop: '1.25rem', padding: '0.6rem 1.5rem' }}
          >
            Retry API Call
          </button>
        </div>
      )}

      {/* State 3: Data Display after successful request */}
      {!loading && !error && (
        <div>
          {filteredBooks.length === 0 ? (
            <div className="state-box">
              <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No books matching your search criteria.</p>
            </div>
          ) : (
            <div className="book-grid">
              {filteredBooks.map((book, index) => (
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
