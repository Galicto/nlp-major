import React from 'react';

export default function AlertScore({ score, severity }) {
  const getSeverityColor = (sev) => {
    if (sev === 'red') return 'var(--alert-red)';
    if (sev === 'amber') return 'var(--alert-amber)';
    return 'var(--accent-teal)';
  };

  const color = getSeverityColor(severity);

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <h3 style={{ marginBottom: '10px' }}>CITY ALERT SCORE</h3>
      
      <div style={{
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px solid ${color}`,
        boxShadow: `0 0 20px ${color}`,
        margin: '0 auto',
        transition: 'all 0.5s ease'
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: color,
          textShadow: `0 0 10px ${color}`
        }}>
          {score}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '1.2rem', color: color, textTransform: 'uppercase', letterSpacing: '2px' }}>
        STATUS: {severity}
      </div>
    </div>
  );
}
