import React from 'react';

export const SafeButton = ({ onClick, loading, disabled, children, className, style }) => {
  return (
    <button
      onClick={!loading && !disabled ? onClick : null}
      disabled={disabled || loading}
      className={className}
      style={{
        ...style,
        opacity: (disabled || loading) ? 0.6 : 1,
        cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};