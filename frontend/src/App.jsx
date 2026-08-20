import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

function App() {
  return (
    <div className="app-container">
      {/* Navigation Component (Task 1 & Task 2) */}
      <Navigation />

      {/* Main Content & Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>CHAROTAR UNIVERSITY OF SCIENCE AND TECHNOLOGY</strong> | ITUE301 Set B
          </div>
          <div>
            Library Book Management System &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
