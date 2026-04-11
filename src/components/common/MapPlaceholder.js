import React, { useState, useEffect } from 'react';

const busPositions = {
  1: { x: '38%', y: '42%', label: 'BUS-001', status: 'on-time' },
  2: { x: '62%', y: '58%', label: 'BUS-002', status: 'delayed' },
  3: { x: '50%', y: '30%', label: 'BUS-003', status: 'inactive' },
};

export default function MapPlaceholder({ highlightBusId, height = 340 }) {
  const [positions, setPositions] = useState(busPositions);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => {
        const updated = { ...prev };
        [1, 2].forEach(id => {
          const p = prev[id];
          const dx = (Math.random() - 0.5) * 1.5;
          const dy = (Math.random() - 0.5) * 1.5;
          const newX = Math.max(20, Math.min(80, parseFloat(p.x) + dx));
          const newY = Math.max(20, Math.min(80, parseFloat(p.y) + dy));
          updated[id] = { ...p, x: newX + '%', y: newY + '%' };
        });
        return updated;
      });
      setTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stops = [
    { x: '25%', y: '60%' }, { x: '35%', y: '45%' }, { x: '45%', y: '32%' },
    { x: '58%', y: '65%' }, { x: '70%', y: '40%' }, { x: '80%', y: '55%' },
    { x: '52%', y: '72%' }, { x: '30%', y: '75%' },
  ];

  return (
    <div className="map-placeholder" style={{ height }}>
      <div className="map-grid" />
      <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12, zIndex: 2, boxShadow: 'var(--shadow)' }}>
        <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Live Tracking</div>
        {[{ color: '#1D4ED8', label: 'On Time' }, { color: '#F59E0B', label: 'Delayed' }, { color: '#94A3B8', label: 'Inactive' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
            <span style={{ color: 'var(--text3)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Route lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <polyline points="25%,60% 38%,42% 45%,32%" stroke="#3B82F6" strokeWidth="2" fill="none" strokeDasharray="5,4" opacity="0.4" />
        <polyline points="58%,65% 62%,58% 70%,40%" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="5,4" opacity="0.4" />
      </svg>

      {/* Stop dots */}
      {stops.map((s, i) => (
        <div key={i} className="map-stop-dot" style={{ left: s.x, top: s.y, transform: 'translate(-50%,-50%)' }} />
      ))}

      {/* Bus markers */}
      {Object.entries(positions).map(([id, pos]) => {
        const isHighlighted = highlightBusId && parseInt(id) === highlightBusId;
        const color = pos.status === 'on-time' ? '#1D4ED8' : pos.status === 'delayed' ? '#F59E0B' : '#94A3B8';
        return (
          <div key={id} className="map-bus-marker" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)', zIndex: isHighlighted ? 5 : 3 }}>
            <div className="map-bus-dot" style={{ background: color, boxShadow: `0 0 0 6px ${color}33`, width: isHighlighted ? 44 : 36, height: isHighlighted ? 44 : 36 }}>
              🚌
            </div>
            <div className="map-bus-label" style={{ borderColor: color }}>{pos.label}</div>
          </div>
        );
      })}

      {/* University marker */}
      <div style={{ position: 'absolute', left: '50%', top: '18%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 4 }}>
        <div style={{ width: 40, height: 40, background: '#1E3A8A', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ transform: 'rotate(45deg)', fontSize: 18 }}>🏫</span>
        </div>
        <div className="map-bus-label" style={{ background: '#1E3A8A', color: 'white', border: 'none' }}>University</div>
      </div>

      <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px', fontSize: 11, color: 'var(--text3)', boxShadow: 'var(--shadow)' }}>
        🔄 Live — updates every 3s
      </div>
    </div>
  );
}
