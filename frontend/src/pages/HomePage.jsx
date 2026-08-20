import React from 'react';
import { Link } from 'react-router-dom';
import { Library, BookmarkPlus, ArrowRight, ShieldCheck, Database, Layers, CheckCircle2, BookOpen, Users, Clock, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '3.5rem 3rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.2)', color: '#c7d2fe', padding: '0.45rem 1.1rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.25rem', border: '1px solid rgba(199, 210, 254, 0.25)' }}>
          <Sparkles size={16} /> ITUE301 — Advanced Web Development Frameworks
        </div>

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.8rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
          Library Book Management System
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '680px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Digitized library portal for real-time inventory management, book borrowing workflows, and RESTful MongoDB data integration.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link 
            to="/books" 
            className="btn-primary" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              width: 'auto', 
              textDecoration: 'none',
              fontSize: '1.05rem',
              padding: '0.95rem 1.75rem'
            }}
          >
            <Library size={20} /> View Books Catalog <ArrowRight size={18} />
          </Link>
          <Link 
            to="/borrow" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(255, 255, 255, 0.1)', 
              color: '#ffffff', 
              fontWeight: '700', 
              padding: '0.95rem 1.75rem', 
              borderRadius: '10px', 
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.25s ease' 
            }}
          >
            <BookmarkPlus size={20} /> Borrow a Book
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total Books</span>
            <BookOpen size={20} color="#6366f1" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>1,480+</div>
          <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: '700' }}>↑ 12% Added this month</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Available Copies</span>
            <CheckCircle2 size={20} color="#22c55e" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>1,120</div>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Ready for issuance</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Active Members</span>
            <Users size={20} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>640</div>
          <span style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: '700' }}>Students & Faculty</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Active Borrowings</span>
            <Clock size={20} color="#a855f7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>360</div>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>In circulation</span>
        </div>
      </div>

      {/* Task Architecture Cards */}
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a' }}>
        Practical Tasks Overview
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Layers size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.6rem' }}>Tasks 1 & 2: Frontend Architecture</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Reusable `BookCard` components, status-based badge styling, React Router links without full-page reloads, and `useState` form handling.
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ background: '#dcfce7', color: '#16a34a', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.6rem' }}>Tasks 3 & 4: REST API & Consumption</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Express REST endpoints with custom `requestLogger` middleware `[METHOD] [PATH] [TIMESTAMP]`, JSON error handling, and `useEffect()` data fetching.
          </p>
        </div>

        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ background: '#f3e8ff', color: '#9333ea', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Database size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.6rem' }}>Task 5: Mongoose Schemas</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Strict Mongoose schema definitions for `Book`, `Member`, and `Borrowing` entities with `.env` environment connection strings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
