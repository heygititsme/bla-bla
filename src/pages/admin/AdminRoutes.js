import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import { useBus } from '../../context/BusContext';
import MapPlaceholder from '../../components/common/MapPlaceholder';

export default function AdminRoutes() {
  const { routes, buses, addRoute, updateRoute, deleteRoute } = useBus();
  const [selected, setSelected] = useState(routes[0]);
  const [showModal, setShowModal] = useState(false);

  const busForRoute = (routeId) => buses.find(b => b.routeId === routeId);

  return (
    <Layout title="Route Management" subtitle="Configure and manage bus routes">
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">All Routes</div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Route</button>
            </div>
            {routes.map(r => {
              const bus = busForRoute(r.id);
              return (
                <div key={r.id}
                  onClick={() => setSelected(r)}
                  style={{
                    padding: '14px', borderRadius: 8, cursor: 'pointer', marginBottom: 8,
                    border: `2px solid ${selected?.id === r.id ? r.color : 'var(--border)'}`,
                    background: selected?.id === r.id ? `${r.color}08` : 'transparent',
                    transition: 'all 0.15s'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: r.color }} />
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{r.name}</span>
                    </div>
                    <button className="btn btn-danger btn-sm" style={{ fontSize: 11 }} onClick={e => { e.stopPropagation(); if (window.confirm('Delete route?')) deleteRoute(r.id); }}>Delete</button>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: 'var(--text3)' }}>
                    <span>🛑 {r.stops.length} stops</span>
                    <span>📏 {r.totalDistance}</span>
                    <span>⏱ {r.estimatedTime}</span>
                    {bus && <span>🚌 {bus.number}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {selected && (
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-header">
                <div>
                  <div className="card-title" style={{ color: selected.color }}>{selected.name}</div>
                  <div className="card-subtitle">{selected.stops.length} stops · {selected.totalDistance}</div>
                </div>
              </div>
              <div className="stop-timeline">
                {selected.stops.map((stop, i) => (
                  <div key={stop.id} className="stop-item">
                    <div className={`stop-dot ${i === 0 ? 'active' : ''}`} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div className="stop-name">{stop.name}</div>
                        {i === 0 && <span style={{ fontSize: 11, background: '#ECFDF5', color: '#059669', padding: '1px 7px', borderRadius: 4 }}>First Stop</span>}
                        {i === selected.stops.length - 1 && <span style={{ fontSize: 11, background: '#EEF2FF', color: '#4F46E5', padding: '1px 7px', borderRadius: 4 }}>University</span>}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text2)' }}>{stop.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Route Map View</div>
        </div>
        <MapPlaceholder height={320} />
      </div>
    </Layout>
  );
}
