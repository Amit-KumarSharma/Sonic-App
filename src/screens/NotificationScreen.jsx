import { useState } from 'react';
import './NotificationScreen.css';
import { Bell, Heart, UserPlus, Music, MessageSquare } from 'lucide-react';

export default function NotificationScreen({ goBack }) {
  const [filter, setFilter] = useState('All');

  const notifications = [
    { id: 1, type: 'like', user: 'Sarah', action: 'liked your playlist', target: 'Neon Drive', time: '2m', avatar: 'https://i.pravatar.cc/150?u=5', read: false },
    { id: 2, type: 'follow', user: 'CyberDJ', action: 'started following you', time: '1h', avatar: 'https://i.pravatar.cc/150?u=12', read: false },
    { id: 3, type: 'release', user: 'The Weeknd', action: 'released a new single', target: 'Dancing In The Flames', time: '3h', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50', read: true },
    { id: 4, type: 'comment', user: 'Neo Tokyo', action: 'commented on your listening room', time: '5h', avatar: 'https://i.pravatar.cc/150?u=99', read: true },
    { id: 5, type: 'like', user: 'Alex', action: 'liked your comment', target: '"Best drop ever!"', time: '1d', avatar: 'https://i.pravatar.cc/150?u=3', read: true },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'like': return <Heart size={16} fill="var(--highlight)" color="var(--highlight)" />;
      case 'follow': return <UserPlus size={16} color="var(--secondary)" />;
      case 'release': return <Music size={16} color="var(--primary)" />;
      case 'comment': return <MessageSquare size={16} color="white" />;
      default: return <Bell size={16} />;
    }
  };

  const filteredNotifs = filter === 'All' ? notifications : notifications.filter(n => {
    if (filter === 'Likes') return n.type === 'like';
    if (filter === 'Mentions') return n.type === 'comment';
    if (filter === 'Follows') return n.type === 'follow';
    return true;
  });

  return (
    <div className="notification-screen format-slide-in">
      <header className="notif-header glass-panel">
        <div className="notif-title-row">
          <h2>Notifications</h2>
        </div>
        
        <div className="notif-filters">
          {['All', 'Likes', 'Mentions', 'Follows'].map(f => (
            <button key={f} className={`pill-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="notif-content">
        <h3 className="notif-section-title">Recent</h3>
        
        <div className="notif-list">
          {filteredNotifs.map(n => (
            <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
              <div className="notif-avatar-col">
                <img src={n.avatar} alt="user" className="notif-avatar" />
                <div className="notif-icon-badge">{getIcon(n.type)}</div>
              </div>
              
              <div className="notif-body">
                <p>
                  <strong>{n.user}</strong> {n.action} {n.target && <span className="notif-target">{n.target}</span>}
                </p>
                <span className="notif-time">{n.time}</span>
              </div>
              
              {!n.read && <div className="unread-dot"></div>}
            </div>
          ))}

          {filteredNotifs.length === 0 && (
            <div className="empty-notifs">
              <Bell size={48} color="var(--text-muted)" />
              <p>No new notifications here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
