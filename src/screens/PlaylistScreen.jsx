import { useState, useEffect } from 'react';
import './PlaylistScreen.css';
import { ArrowLeft, MoreVertical, Play, Shuffle, Download, Heart, Share2, Plus, Clock } from 'lucide-react';

export default function PlaylistScreen({ goBack, playlistId = 1 }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => setScrollY(e.target.scrollTop);
    const container = document.getElementById('playlist-scroll');
    if (container) container.addEventListener('scroll', handleScroll);
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  const headerOpacity = Math.min(scrollY / 150, 1);

  // Mock Data
  const playlist = {
    title: 'Neon Drive 2025',
    creator: 'Alex Creator',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
    description: 'The ultimate synthwave collection for late-night city cruising.',
    likes: '1.2M',
    duration: '2h 15m',
    tracks: [
      { id: 101, title: 'Nightcall', artist: 'Kavinsky', album: 'Outrun', duration: '4:19', downloaded: true },
      { id: 102, title: 'Midnight City', artist: 'M83', album: 'Hurry Up', duration: '4:03', downloaded: false },
      { id: 103, title: 'Starboy', artist: 'The Weeknd', album: 'Starboy', duration: '3:50', downloaded: true },
      { id: 104, title: 'Resonance', artist: 'HOME', album: 'Odyssey', duration: '3:32', downloaded: false },
      { id: 105, title: 'Tech Noir', artist: 'Gunship', album: 'Gunship', duration: '4:57', downloaded: true },
      { id: 106, title: 'A Real Hero', artist: 'College, Electric Youth', album: 'Drive OST', duration: '4:27', downloaded: false },
      { id: 107, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', downloaded: true },
      { id: 108, title: 'Turbo Killer', artist: 'Carpenter Brut', album: 'EP I', duration: '3:28', downloaded: false },
    ]
  };

  return (
    <div className="playlist-screen format-slide-in">
      <header className="playlist-header" style={{ background: `rgba(11, 11, 15, ${headerOpacity})`, borderBottom: `1px solid rgba(255,255,255,${headerOpacity * 0.1})` }}>
        <button className="icon-btn-small" onClick={goBack}><ArrowLeft size={24} /></button>
        <h3 style={{ opacity: headerOpacity }}>{playlist.title}</h3>
        <button className="icon-btn-small"><MoreVertical size={24} /></button>
      </header>

      <div className="playlist-content" id="playlist-scroll">
        <div className="playlist-hero">
          <div className="playlist-cover-wrapper">
            <img src={playlist.cover} alt={playlist.title} className="playlist-cover" />
            <div className="cover-glow" style={{ backgroundImage: `url(${playlist.cover})` }}></div>
          </div>
          <div className="hero-info">
            <h2>{playlist.title}</h2>
            <div className="creator-row">
              <img src="https://i.pravatar.cc/150?u=10" alt="creator" />
              <span>{playlist.creator}</span>
            </div>
            <p className="p-desc">{playlist.description}</p>
            <div className="p-meta">
              <Heart size={14} /> {playlist.likes} Likes • {playlist.duration}
            </div>
          </div>
        </div>

        <div className="playlist-actions-bar">
          <div className="action-group-l">
            <button className="icon-btn-c"><Heart size={24} /></button>
            <button className="icon-btn-c"><Download size={24} /></button>
            <button className="icon-btn-c"><Share2 size={24} /></button>
          </div>
          <div className="action-group-r">
            <button className="icon-btn-c"><Shuffle size={20} color="var(--primary)"/></button>
            <button className="play-fab"><Play size={28} fill="white" style={{marginLeft: '4px'}} /></button>
          </div>
        </div>

        <div className="track-list-container">
          <div className="track-list-header">
            <div className="th-add"><button className="pill-btn-small"><Plus size={14}/> Add Songs</button></div>
            <div className="th-dur"><Clock size={16} color="var(--text-muted)"/></div>
          </div>

          <div className="track-list">
            {playlist.tracks.map((track, idx) => (
              <div key={track.id} className="track-row">
                <div className="track-idx">{idx + 1}</div>
                <div className="track-info-col">
                  <h4>{track.title}</h4>
                  <p>
                    {track.downloaded && <span className="dl-icon"><Download size={10} color="var(--secondary)"/></span>}
                    {track.artist} • {track.album}
                  </p>
                </div>
                <div className="track-duration">{track.duration}</div>
                <button className="icon-btn-small track-more"><MoreVertical size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
