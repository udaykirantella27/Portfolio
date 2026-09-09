'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Production runtime error caught by boundary:', error);
  }, [error]);

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
          border: '1px solid rgba(255, 146, 113, 0.4)',
          background: 'rgba(255, 146, 113, 0.04)',
          padding: '48px 36px',
          maxWidth: '560px',
          width: '100%',
        }}
      >
        <div style={{ display: 'inline-flex', color: '#ff9271', marginBottom: '16px' }}>
          <AlertCircle size={36} />
        </div>
        <p style={{ color: '#ff9271', fontSize: '11px', margin: '0 0 12px', letterSpacing: '1px' }}>
          SYSTEM RUNTIME EXCEPTION
        </p>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}
        >
          Something Went <em style={{ color: '#ff9271', fontStyle: 'italic' }}>Wrong.</em>
        </h1>
        <p style={{ color: '#a3a099', fontSize: '14px', lineHeight: 1.6, margin: '0 0 32px' }}>
          An unexpected application error occurred while processing your request. The engineering
          trace has been captured.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#86ebc8',
              color: '#111111',
              padding: '12px 20px',
              fontWeight: '700',
              fontSize: '11px',
              border: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
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
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

