import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Library, BookmarkPlus } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <NavLink to="/" className="nav-brand">
          <BookOpen size={28} color="#818cf8" />
          <span>LibManage Pro</span>
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/books" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Library size={18} />
              Books
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/borrow" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <BookmarkPlus size={18} />
              Borrow Book
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
