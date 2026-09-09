import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        background: '#111111',
        color: '#f6f1e7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div
        style={{
          border: '1px solid rgba(246, 241, 231, 0.15)',
          background: 'rgba(246, 241, 231, 0.03)',
          padding: '48px 36px',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        <p style={{ color: '#ff9271', fontSize: '12px', margin: '0 0 16px', letterSpacing: '1px' }}>
          ERROR 404 // ISSUE NOT FOUND
        </p>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(36px, 6vw, 56px)',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}
        >
          Page Doesn’t <em style={{ color: '#ff9271', fontStyle: 'italic' }}>Exist.</em>
        </h1>
        <p style={{ color: '#a3a099', fontSize: '14px', lineHeight: 1.6, margin: '0 0 32px' }}>
          The document, article, or case study you requested could not be located in this archive.
          It may have been moved, renamed, or temporarily archived.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#86ebc8',
              color: '#111111',
              padding: '12px 20px',
              fontWeight: '700',
              fontSize: '11px',
              textDecoration: 'none',
            }}
          >
            <Home size={15} />
            <span>Return to Portfolio</span>
          </Link>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(246, 241, 231, 0.25)',
              color: '#f6f1e7',
              padding: '12px 20px',
              fontWeight: '700',
              fontSize: '11px',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={15} />
            <span>View All Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
