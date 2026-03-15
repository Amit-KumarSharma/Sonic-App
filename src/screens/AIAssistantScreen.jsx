import { useState } from 'react';
import './AIAssistantScreen.css';
import { Send, Music, Sparkles } from 'lucide-react';

export default function AIAssistantScreen({ navigateTo }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Hey! I'm Sonic AI. Want to discover new music, generate a mood playlist, or learn about a song?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: "I found this perfect track for your cyberpunk mood. Want me to play it?",
        card: {
          title: "Hyper Light",
          artist: "System Error",
          cover: "https://images.unsplash.com/photo-1542442436-b6b801452df3?auto=format&fit=crop&q=80&w=150"
        }
      }]);
    }, 1500);
  };

  return (
    <div className="ai-screen">
      <header className="ai-header glass-panel">
        <Sparkles size={24} className="ai-icon-glow" />
        <h2>Sonic UI</h2>
        <div className="status-dot"></div>
      </header>

      <div className="ai-chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`ai-msg-wrapper ${msg.type}`}>
            {msg.type === 'ai' && (
              <div className="ai-avatar"><Sparkles size={16} color="var(--bg-color)" /></div>
            )}
            <div className="ai-bubble glass-panel">
              <p>{msg.text}</p>
              {msg.card && (
                <div className="ai-rec-card" onClick={() => navigateTo('player')}>
                  <img src={msg.card.cover} alt="Cover" />
                  <div className="rec-info">
                    <h4>{msg.card.title}</h4>
                    <p>{msg.card.artist}</p>
                  </div>
                  <button className="play-btn"><Music size={16} color="white"/></button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="ai-msg-wrapper ai">
             <div className="ai-avatar"><Sparkles size={16} color="var(--bg-color)" /></div>
             <div className="typing-indicator glass-panel">
               <span></span><span></span><span></span>
             </div>
          </div>
        )}
      </div>

      <div className="ai-input-area glass-panel">
        <input 
          type="text" 
          placeholder="Ask Sonic AI anything..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="ai-send-btn" onClick={handleSend}>
          <Send size={18} color="white" />
        </button>
      </div>
    </div>
  );
}
