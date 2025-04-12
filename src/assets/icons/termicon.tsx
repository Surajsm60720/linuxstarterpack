import { FC } from 'react';

export const TerminalIcon: FC = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6 text-green-400"
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path 
      d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="m6 10 3 3-3 3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 16h6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);