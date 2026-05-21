import { useState, useEffect } from 'react';

export function useWebSocket(url) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch (e) {
        console.error("Failed to parse WS message", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, isConnected };
}
