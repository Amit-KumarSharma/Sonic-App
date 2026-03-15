import './HomeScreen.css';
import { Play, Bell, Settings, Heart, MoreHorizontal, Sparkles, TrendingUp, Flame } from 'lucide-react';

const mockTrending = [
  { id: 1, title: 'Midnight', artist: 'Cyberpunk', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80' },
  { id: 2, title: 'Neon Rain', artist: 'Synthwave', cover: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=300&q=80' },
  { id: 3, title: 'Lost City', artist: 'The Outrun', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80' },
];

const mockViral = [
  { id: 4, title: 'Dance Monkey', artist: 'Tones And I', cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f7dc?w=150&q=80', rank: 1 },
  { id: 5, title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&q=80', rank: 2 },
  { id: 6, title: 'Levitating', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&q=80', rank: 3 },
];

const mockFriends = [
  { id: 1, name: 'Alex', listeningTo: 'Starboy', avatar: 'https://i.pravatar.cc/150?u=alex', active: true },
  { id: 2, name: 'Sam', listeningTo: 'Lover', avatar: 'https://i.pravatar.cc/150?u=sam', active: false },
  { id: 3, name: 'Jordan', listeningTo: 'Bad Guy', avatar: 'https://i.pravatar.cc/150?u=jordan', active: true },
];

export default function HomeScreen({ navigateTo }) {
  return (
    <div className="home-screen">
      {/* Header */}
      <header className="home-header glass-panel">
        <div className="user-info" onClick={() => navigateTo('profile')}>
          <img src="https://i.pravatar.cc/150?u=user" alt="Profile" className="user-avatar" />
          <div>
            <span className="greeting">Good evening</span>
            <h2 className="username">Sonic User</h2>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn"><Bell size={20} /></button>
          <button className="icon-btn" onClick={() => navigateTo('profile')}><Settings size={20} /></button>
        </div>
      </header>

      <div className="home-content">
        
        {/* Viral Tracks - New Resso Style List */}
        <section className="feed-section">
          <div className="section-header">
            <h3><Flame size={20} color="var(--highlight)" /> Viral on Sonic</h3>
            <span className="see-all">Play All</span>
          </div>
          <div className="viral-list">
            {mockViral.map(song => (
              <div key={song.id} className="viral-item glass-panel" onClick={() => navigateTo('player')}>
                <div className="rank">#{song.rank}</div>
                <img src={song.cover} alt={song.title} />
                <div className="track-info">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
                <button className="play-btn-small"><Play size={16} fill="white" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now - Horizontal Scroll */}
        <section className="feed-section">
          <div className="section-header">
            <h3><TrendingUp size={20} color="var(--secondary)" /> Trending Now</h3>
          </div>
          <div className="horizontal-scroll">
            {mockTrending.map(album => (
              <div key={album.id} className="album-card glass-panel" onClick={() => navigateTo('player')}>
                <div className="cover-wrapper">
                  <img src={album.cover} alt={album.title} />
                  <div className="play-overlay">
                    <Play size={24} fill="white" />
                  </div>
                </div>
                <div className="album-info">
                  <h4>{album.title}</h4>
                  <p>{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="feed-section">
          <div className="section-header">
            <h3><Sparkles size={20} color="var(--primary)" /> For You</h3>
          </div>
          <div className="hero-card glass-panel" onClick={() => navigateTo('player')}>
            <div className="hero-content">
              <span>DAILY MIX 1</span>
              <h2>Cyberpunk & Synthwave</h2>
              <p>Made for Sonic User</p>
            </div>
            <button className="hero-play"><Play size={24} fill="var(--bg-color)" /></button>
          </div>
        </section>

        {/* Friend Activity */}
        <section className="feed-section pb-100">
          <div className="section-header">
            <h3>Friend Activity</h3>
          </div>
          <div className="friends-list">
            {mockFriends.map(friend => (
              <div key={friend.id} className="friend-item">
                <div className="friend-avatar-wrapper">
                  <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                  {friend.active && <div className="active-dot"></div>}
                </div>
                <div className="friend-info">
                  <h4>{friend.name}</h4>
                  <p>Listening to <span>{friend.listeningTo}</span></p>
                </div>
                <div className="friend-controls">
                  <button className="icon-btn-small"><Heart size={16} /></button>
                  <button className="icon-btn-small"><MoreHorizontal size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
