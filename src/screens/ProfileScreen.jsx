import { useState } from 'react';
import './ProfileScreen.css';
import { Settings, Headphones, Disc3, Clock, Heart, MoreVertical, Play } from 'lucide-react';

export default function ProfileScreen({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('overview');

  const historyList = [
    { id: 1, title: 'Nightcall', artist: 'Kavinsky', time: '2 mins ago', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd', time: '1 hour ago', cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100' },
    { id: 3, title: 'Resonance', artist: 'HOME', time: '5 hours ago', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100' },
    { id: 4, title: 'Blinding Lights', artist: 'The Weeknd', time: 'Yesterday', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100' },
  ];

  return (
    <div className="profile-screen">
      <header className="profile-header">
        <button className="icon-btn-small"><Settings size={22} /></button>
      </header>
      
      <div className="profile-info-advanced">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            <img src="/doraemon.png" alt="Amit Kumar Sharma" />
          </div>
          <div className="pro-badge gradient-text">PRO</div>
        </div>
        <h2>Amit Kumar Sharma</h2>
        <p className="handle">@amit_sharma</p>

        <div className="stats-row mt-10">
          <div className="stat">
            <span className="stat-num">1.2M</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="divider-v"></div>
          <div className="stat">
            <span className="stat-num">348</span>
            <span className="stat-label">Following</span>
          </div>
        </div>

        <div className="profile-actions mt-15">
          <button className="edit-profile-btn">Edit Profile</button>
          <button className="share-profile-btn">Share</button>
        </div>
      </div>

      <div className="profile-tabs mt-20">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</button>
        <button className={`tab-btn ${activeTab === 'playlists' ? 'active' : ''}`} onClick={() => setActiveTab('playlists')}>Playlists</button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="format-slide-in">
            <div className="profile-highlights">
              <div className="highlight-card glass-panel">
                <Headphones size={24} color="var(--primary)" />
                <div className="h-info">
                  <h4>12,400</h4>
                  <p>Minutes Listened</p>
                </div>
              </div>
              <div className="highlight-card glass-panel">
                <Disc3 size={24} color="var(--secondary)" />
                <div className="h-info">
                  <h4>Top 1%</h4>
                  <p>Synthwave Fan</p>
                </div>
              </div>
            </div>

            <div className="profile-section mt-24">
              <div className="section-header">
                <h3>Top Artists</h3>
              </div>
              <div className="artists-scroll">
                <div className="artist-item">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100" alt="Artist" />
                  <span>The Weeknd</span>
                </div>
                <div className="artist-item">
                  <img src="https://images.unsplash.com/photo-1627236531398-aa5231cdeb5f?w=100" alt="Artist" />
                  <span>Daft Punk</span>
                </div>
                <div className="artist-item">
                  <img src="https://images.unsplash.com/photo-1549834125-82d3c48159a3?w=100" alt="Artist" />
                  <span>Kavinsky</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-list format-slide-in">
            {historyList.map(song => (
              <div key={song.id} className="history-item">
                <img src={song.cover} alt="Cover" />
                <div className="history-info">
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
                <div className="history-meta">
                  <span>{song.time}</span>
                  <button className="icon-btn-small" style={{border: 'none', background: 'transparent'}}><MoreVertical size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="playlists-grid format-slide-in">
            <div className="p-card-large glass-panel create-p-card" onClick={() => navigateTo('playlist')}>
              <div className="create-icon-l">+</div>
              <h4>Create Playlist</h4>
            </div>
            
            <div className="p-card-large glass-panel liked-p-card">
              <div className="liked-icon-l"><Heart fill="white" size={32}/></div>
              <h4>Liked Songs</h4>
              <p>4,192 tracks</p>
              <div className="play-overlay"><Play fill="white"/></div>
            </div>

            <div className="p-card glass-panel" style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=150)`}}>
              <h4>Neon Drive</h4>
              <p>128 Saves</p>
            </div>
            <div className="p-card glass-panel" style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=150)`}}>
              <h4>Chill Cyber</h4>
              <p>4,092 Saves</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
