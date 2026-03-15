import { useState } from 'react';
import './ChatScreen.css';
import { Search, Edit, Send, Play, Camera, Mic, ChevronLeft } from 'lucide-react';

const mockChats = [
  { id: 1, name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=5', lastMessage: 'Check out this track!', time: '12:30 PM', unread: 2, online: true },
  { id: 2, name: 'CyberDJ', avatar: 'https://i.pravatar.cc/150?u=12', lastMessage: 'Added 5 songs to our collab playlist', time: 'Yesterday', unread: 0, online: true },
  { id: 3, name: 'SynthMaster', avatar: 'https://i.pravatar.cc/150?u=8', lastMessage: 'Audio Message (0:45)', time: 'Mon', unread: 1, online: false },
  { id: 4, name: 'Neo Tokyo Crew', avatar: 'https://i.pravatar.cc/150?u=99', lastMessage: 'Someone is hosting a live room...', time: 'Sun', unread: 0, online: false, isGroup: true },
];

export default function ChatScreen() {
  const [activeChat, setActiveChat] = useState(null);

  if (activeChat) {
    return <DirectMessageView chat={activeChat} onClose={() => setActiveChat(null)} />;
  }

  return (
    <div className="chat-inbox-screen">
      <header className="inbox-header">
        <h2>Messages</h2>
        <button className="icon-btn-small"><Edit size={20} /></button>
      </header>
      
      <div className="search-bar glass-panel mt-10">
        <Search size={18} color="var(--text-muted)" />
        <input type="text" placeholder="Search friends or messages..." />
      </div>

      <div className="active-now-section">
        <h3>Active Now</h3>
        <div className="active-users-scroll">
          <div className="story-ring add-story">
            <div className="add-icon"><Camera size={16} /></div>
            <span>My Status</span>
          </div>
          {mockChats.filter(c => c.online).map(chat => (
            <div key={`active-${chat.id}`} className="story-ring" onClick={() => setActiveChat(chat)}>
              <img src={chat.avatar} alt={chat.name} />
              <div className="online-badge"></div>
              <span>{chat.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-list">
        {mockChats.map(chat => (
          <div key={chat.id} className="chat-list-item" onClick={() => setActiveChat(chat)}>
            <div className="chat-avatar-wrapper">
              <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
              {chat.online && <div className="online-dot"></div>}
            </div>
            <div className="chat-info">
              <div className="chat-info-header">
                <h4>{chat.name}</h4>
                <span className="timestamp">{chat.time}</span>
              </div>
              <p className={chat.unread > 0 ? 'unread-text' : ''}>{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component for the actual DM
function DirectMessageView({ chat, onClose }) {
  return (
    <div className="dm-screen format-slide-in">
      <header className="dm-header glass-panel">
        <button className="icon-btn" onClick={onClose}><ChevronLeft size={28} /></button>
        <div className="dm-title-info">
          <img src={chat.avatar} alt={chat.name} className="dm-header-avatar" />
          <div className="dm-title-text">
            <h2>{chat.name}</h2>
            <p>{chat.online ? 'Active now' : 'Offline'}</p>
          </div>
        </div>
      </header>

      <div className="dm-messages">
        <div className="chat-timestamp">Today</div>

        <div className="message received">
          <img src={chat.avatar} alt="avatar" className="msg-avatar" />
          <div className="msg-bubble">
            <p>Hey! Check out this new track I found, it fits your vibe perfectly 🎧</p>
          </div>
        </div>

        <div className="message received">
          <div className="msg-bubble song-card-msg glass-panel offset-msg">
            <img src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=150&q=80" alt="Song Cover" />
            <div className="song-msg-info">
              <h4>Digital Love</h4>
              <p>Synthwave</p>
            </div>
            <button className="play-small-btn"><Play size={16} fill="currentColor" /></button>
          </div>
        </div>

        <div className="message sent">
          <div className="msg-bubble">
            <p>Whoa this is incredible! Added to my Cyberpunk playlist 🔥</p>
          </div>
        </div>
      </div>

      <div className="chat-input-area glass-panel">
        <button className="icon-btn-small"><Camera size={20} color="var(--text-muted)" /></button>
        <button className="icon-btn-small" style={{marginLeft: '-8px'}}><Mic size={20} color="var(--text-muted)" /></button>
        <input type="text" placeholder="Type a message..." />
        <button className="send-btn"><Send size={18} color="white" /></button>
      </div>
    </div>
  );
}
