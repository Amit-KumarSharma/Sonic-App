import { useState, useEffect } from 'react';
import './LiveRoomScreen.css';
import { X, Users, MessageSquare, Send, Heart, Flame, Music } from 'lucide-react';

export default function LiveRoomScreen({ goBack }) {
  const [reactions, setReactions] = useState([]);

  // Mock users
  const users = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?u=12', isHost: true },
    { id: 2, avatar: 'https://i.pravatar.cc/150?u=22', isHost: false },
    { id: 3, avatar: 'https://i.pravatar.cc/150?u=32', isHost: false },
    { id: 4, avatar: 'https://i.pravatar.cc/150?u=42', isHost: false },
    { id: 5, avatar: 'https://i.pravatar.cc/150?u=52', isHost: false },
  ];

  const floatingReact = (Icon, color) => {
    const newReact = { id: Date.now(), Icon, color, left: 10 + Math.random() * 80 };
    setReactions(prev => [...prev, newReact]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReact.id));
    }, 2000);
  };

  useEffect(() => {
    // simulate random reactions
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const i = Math.floor(Math.random() * 2);
        const ics = [[Heart, '#FF1493'], [Flame, '#FF4500']];
        floatingReact(ics[i][0], ics[i][1]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-room-screen">
      <header className="live-top glass-panel">
        <div className="live-badge">
          <div className="red-dot"></div> LIVE
        </div>
        <div className="live-title">
          <h2>Synthwave Sessions</h2>
          <p><Users size={12}/> 1,204 listeners</p>
        </div>
        <button className="icon-btn" onClick={goBack}><X size={24} /></button>
      </header>

      <div className="center-stage">
        {/* Main Track spinning */}
        <div className="live-track-art">
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300" alt="Track" />
          <div className="pulse-ring"></div>
        </div>
        
        <div className="live-orbit">
          {users.map((u, i) => {
            const angle = (i / users.length) * Math.PI * 2;
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div 
                key={u.id} 
                className="orbit-avatar" 
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <img src={u.avatar} alt="listener" />
                {u.isHost && <div className="host-badge"><Music size={10} color="white"/></div>}
              </div>
            );
          })}
        </div>

        <div className="center-track-info">
          <h3>Neon Nights</h3>
          <p>Cyber Dreamer</p>
        </div>
      </div>

      <div className="live-chat-panel">
        <div className="live-chat-messages">
          <div className="live-msg"><span className="user">Sarah:</span> Best transition ever!</div>
          <div className="live-msg"><span className="user">Alex:</span> 🔥🔥🔥</div>
          <div className="live-msg"><span className="user">User99:</span> What track is this?</div>
          <div className="live-msg"><span className="user">Host:</span> Incoming unreleased drop! 🚀</div>
        </div>
        <div className="live-chat-input glass-panel">
          <input type="text" placeholder="Say something..." />
          <button className="icon-btn" onClick={() => floatingReact(Heart, '#FF1493')}><Heart size={20} color="#FF1493"/></button>
          <button className="send-btn"><Send size={16} color="white"/></button>
        </div>
      </div>

      <div className="floating-reactions">
        {reactions.map(r => {
          const Icon = r.Icon;
          return (
            <div key={r.id} className="floating-icon" style={{ left: `${r.left}%` }}>
              <Icon size={28} color={r.color} fill={r.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
