import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Library, BookmarkPlus, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      <div 
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '3rem 2rem',
          marginBottom: '2.5rem',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
        }}
      >
        <div style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' }}>
          ITUE301 — Advanced Web Development Frameworks
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem' }}>
          Library Book Management System
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', marginBottom: '2rem' }}>
          Welcome to the digitized library management system built with React, Express.js, Node.js, and MongoDB Mongoose schemas.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/books" 
            className="btn-primary" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              width: 'auto', 
              textDecoration: 'none' 
            }}
          >
            <Library size={18} /> View Catalog <ArrowRight size={16} />
          </Link>
          <Link 
            to="/borrow" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(255,255,255,0.1)', 
              color: '#ffffff', 
              fontWeight: '700', 
              padding: '0.85rem 1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              transition: 'background 0.2s ease' 
            }}
          >
            <BookmarkPlus size={18} /> Borrow a Book
          </Link>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.25rem', color: '#1e293b' }}>
        System Architecture Overview
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Layers size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Task 1 & 2: React Frontend</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Modular component architecture (`BookCard`), client-side routing with React Router, and controlled form state management (`useState`).
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#dcfce7', color: '#16a34a', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldCheck size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Task 3 & 4: REST API & Consumption</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Express backend with custom `requestLogger` middleware, structured JSON error handler, and asynchronous `useEffect()` data fetching.
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ background: '#f3e8ff', color: '#9333ea', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Database size={22} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Task 5: MongoDB Mongoose</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Strict Mongoose schema validation for `Book`, `Member`, and `Borrowing` entities with `.env` environment connection strings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
