import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '../hooks/useWebSocket';
import CityMap from '../components/CityMap';
import LLMChat from '../components/LLMChat';
import { Activity, AlertCircle, TrendingUp, Bus } from 'lucide-react';

export default function Dashboard() {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/live-feed';
  const { data: wsData, isConnected } = useWebSocket(wsUrl);
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlerts = wsData?.active_alert_count || 0;
  const isRed = wsData?.severity === 'red';

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Location error:", err)
      );
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="dashboard-layout"
      style={{
        backgroundImage: 'url(/3d-assets/3d_dashboard_bg_1779371762561.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <header className="top-nav">
        <h2 style={{ fontSize: '1.2rem', color: '#F5F5F7' }}>UrbanMind</h2>
        <div style={{ display: 'flex', gap: '30px', color: '#86868B', fontSize: '0.95rem' }}>
          <span>{clock}</span>
          <span style={{ color: isRed ? '#FF3B30' : (activeAlerts > 0 ? '#FF9500' : '#86868B') }}>
            {activeAlerts} Alerts
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isConnected ? '#34C759' : '#FF3B30' }} />
            {isConnected ? 'Online' : 'Offline'}
          </span>
        </div>
      </header>

      <aside className="left-sidebar">
        <div className="glass-panel" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="#2997FF" /> City Overview
          </h3>
          <div className="kpi-widget" style={{ marginBottom: '16px' }}>
            <span className="kpi-label">System Load</span>
            <span className="kpi-value">42%</span>
          </div>
          <div className="kpi-widget" style={{ marginBottom: '16px' }}>
            <span className="kpi-label">Energy Grid</span>
            <span className="kpi-value" style={{ color: '#34C759' }}>Balanced</span>
          </div>
          <div className="kpi-widget" style={{ flex: 1 }}>
            <span className="kpi-label">Anomaly Score</span>
            <span className="kpi-value" style={{ color: isRed ? '#FF3B30' : '#F5F5F7' }}>
              {wsData?.alert_score || 12}
            </span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px' }}>
          <CityMap alertZone={isRed ? 'zone_central' : null} userLocation={userLocation} />
        </div>
        <div className="stats-row">
          <div className="glass-panel" style={{ flex: 1, padding: '24px' }}>
            <h4 style={{ color: '#86868B', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '8px' }}>Transport Demand</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>+18% <TrendingUp size={24} color="#FF9500" /></div>
          </div>
          <div className="glass-panel" style={{ flex: 1, padding: '24px' }}>
            <h4 style={{ color: '#86868B', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '8px' }}>Active Fleet</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>42 Units <Bus size={24} color="#2997FF" /></div>
          </div>
        </div>
      </main>

      <aside className="right-sidebar">
        <div className="glass-panel" style={{ flex: 1, overflow: 'hidden' }}>
          <LLMChat userLocation={userLocation} />
        </div>
      </aside>
    </motion.div>
  );
}
