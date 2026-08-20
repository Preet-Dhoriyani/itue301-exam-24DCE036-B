import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Library, BookmarkPlus, Sparkles } from 'lucide-react';

const Navigation = () => {
  return (
    <header className="navbar">
      <div className="nav-content">
        <NavLink to="/" className="nav-brand">
          <div className="brand-icon-wrapper">
            <BookOpen size={24} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="brand-title">LibManage</span>
              <span className="brand-badge">SET B</span>
            </div>
          </div>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/books" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Library size={18} />
              <span>Books Catalog</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/borrow" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <BookmarkPlus size={18} />
              <span>Borrow Portal</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
