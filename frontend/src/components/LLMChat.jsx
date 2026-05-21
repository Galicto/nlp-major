import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LLMChat({ userLocation }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { role: 'system', text: 'UrbanMind Assistant online.' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        submitMessage(transcript);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech Recognition not supported in this browser.");
      }
    }
  };

  const submitMessage = async (msg) => {
    if (!msg.trim()) return;

    setHistory(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1/llm/chat';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: msg, location: userLocation })
      });
      const data = await res.json();
      setHistory(prev => [...prev, { role: 'system', text: data.response }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'system', text: 'Connection failed.' }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMessage(input);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="imessage-container" style={{ flex: 1 }}>
        <AnimatePresence>
          {history.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`imessage-bubble ${msg.role === 'system' ? 'imessage-system' : 'imessage-user'}`}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-wrapper">
        <button 
          type="button" 
          onClick={toggleListen}
          style={{ 
            background: 'transparent',
            border: 'none',
            color: isListening ? '#FF3B30' : '#86868B',
            cursor: 'pointer',
            padding: '0 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isListening ? <Square size={20} fill="currentColor" /> : <Mic size={20} />}
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? "Listening..." : "Message UrbanMind..."}
          className="apple-input"
        />
        <button 
          type="submit" 
          style={{ 
            background: '#2997FF', 
            border: 'none', 
            color: '#fff', 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
