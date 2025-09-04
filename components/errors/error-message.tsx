import React from 'react';

export function ErrorMessage() {

  const alertStyle: React.CSSProperties = {
    animation: 'blink 1.5s infinite',
    
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-20 gap-6">
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}
      </style>

      <svg width="150" height="150" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <ellipse cx="32" cy="52" rx="20" ry="6" fill="#b0b0b0" />
          <path d="M12 36v16c0 3.3 9 6 20 6s20-2.7 20-6V36" fill="#b0b0b0" />
          <ellipse cx="32" cy="36" rx="20" ry="6" fill="#a0a0a0" />

          <path d="M12 24v12c0 3.3 9 6 20 6s20-2.7 20-6V24" fill="#c0c0c0" />
          <ellipse cx="32" cy="24" rx="20" ry="6" fill="#999" />

          <path d="M12 12v12c0 3.3 9 6 20 6s20-2.7 20-6V12" fill="#d0d0d0" />
          <ellipse cx="32" cy="12" rx="20" ry="6" fill="#888" />
        </g>

        <g style={alertStyle}>
          <path d="M32 10L18 40h28L32 10z" fill="#f0ad4e" stroke="#d58512" strokeWidth="2" />
          <rect x="30" y="22" width="4" height="12" fill="#fff" />
          <circle cx="32" cy="38" r="2" fill="#fff" />
        </g>
      </svg>

      <p className="text-xl tracking-wider italic text-center text-red-600">Error de Conexión</p>
    </div>
  );
}

