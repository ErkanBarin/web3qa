import React from 'react';

// Basic inline styles to ensure visibility on focus without external CSS dependency
const style = {
  position: 'absolute',
  top: '-40px',
  left: '0',
  background: '#111',
  color: '#fff',
  padding: '8px 12px',
  zIndex: 50,
  transform: 'translateY(0)',
};

export function SkipLink({ target = '#main' }) {
  return (
    <a
      href={target}
      data-test="skip-link"
      style={style}
      className="focus:top-0 focus:outline-none focus:ring-2 focus:ring-brand-accent"
    >
      Skip to main content
    </a>
  );
}

export default SkipLink;