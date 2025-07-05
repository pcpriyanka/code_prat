import React, { useState } from 'react';

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative' }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ textDecoration: 'underline dotted', cursor: 'pointer', color: '#888' }}
      >
        {children}
      </span>
      {show && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            background: '#222',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: 13,
            whiteSpace: 'nowrap',
            zIndex: 100,
          }}
        >
          {message}
        </div>
      )}
    </span>
  );
};
