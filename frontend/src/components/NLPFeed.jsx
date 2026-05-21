import React, { useState, useEffect } from 'react';
import { MessageSquareWarning } from 'lucide-react';

const mockTweets = [
  "Huge crowd gathering near central station... looks unsafe.",
  "Traffic is completely jammed on Route 7.",
  "Is there a festival today? So many people outside.",
  "Accident reported on the main flyover.",
  "Police arriving at central square now."
];

export default function NLPFeed() {
  const [feed, setFeed] = useState(mockTweets.slice(0, 2));

  useEffect(() => {
    // Simulate incoming social media posts
    let index = 2;
    const interval = setInterval(() => {
      if (index < mockTweets.length) {
        setFeed(prev => [mockTweets[index], ...prev].slice(0, 5));
        index++;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: '15px' }}><MessageSquareWarning size={18} style={{verticalAlign:'middle', marginRight:'5px'}}/> Social Sensing Feed</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {feed.map((text, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '10px',
            borderLeft: text.includes('Accident') || text.includes('unsafe') ? '3px solid var(--alert-red)' : '3px solid rgba(255,255,255,0.2)',
            fontSize: '0.9rem'
          }}>
            <span style={{ color: 'var(--accent-teal)', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>@citizen_{Math.floor(Math.random() * 1000)}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
