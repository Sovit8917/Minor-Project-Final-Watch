import React from 'react';

export default function Logo({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="S&S logo">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3"/>
      <path d="M20 24c3-6 10-8 16-5M28 40c-6 3-8 10-5 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <text x="32" y="36" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">S&S</text>
    </svg>
  )
}
