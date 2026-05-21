import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const mockData = [
  { name: 'Route 1', demand: 400, capacity: 500 },
  { name: 'Route 7', demand: 800, capacity: 600 },
  { name: 'Route 42', demand: 300, capacity: 500 },
  { name: 'Route 12', demand: 600, capacity: 500 },
];

export default function TransportPanel() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3><Activity size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Transport Demand Forecast</h3>
      
      <div style={{ flex: 1, marginTop: '20px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <XAxis dataKey="name" stroke="var(--text-main)" />
            <YAxis stroke="var(--text-main)" />
            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--accent-teal)' }} />
            <Bar dataKey="demand" fill="var(--accent-teal)" />
            <Bar dataKey="capacity" fill="rgba(255,255,255,0.2)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <h4 style={{ color: 'var(--accent-teal)' }}>RL Agent Action</h4>
        <div style={{ background: 'rgba(0,255,209,0.1)', padding: '10px', borderLeft: '3px solid var(--accent-teal)', marginTop: '5px' }}>
          Rerouting 3 buses to Route 7. Projected wait time reduction: 34%
        </div>
      </div>
    </div>
  );
}
