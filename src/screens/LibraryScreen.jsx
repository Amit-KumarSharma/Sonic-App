import { useState } from 'react';
import './LibraryScreen.css';
import { Search, Plus, ListMusic, Mic2, Download, History, Clock } from 'lucide-react';

export default function LibraryScreen({ navigateTo }) {
  const [filter, setFilter] = useState('Playlists');

  const filters = ['Playlists', 'Artists', 'Albums', 'Downloaded'];

  const libraryItems = [
    { id: 1, title: 'Liked Songs', creator: '4,192 tracks', type: 'system-playlist', downloaded: true, icon: <ListMusic color="white"/>, color: 'linear-gradient(135deg, #FF1493, #8A2BE2)' },
    { id: 2, title: 'Neon Drive', creator: 'Playlist • Alex Creator', type: 'playlist', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100', downloaded: true },
    { id: 3, title: 'The Weeknd', creator: 'Artist', type: 'artist', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
    { id: 4, title: 'Gunship', creator: 'Artist', type: 'artist', image: 'https://images.unsplash.com/photo-1549834125-82d3c48159a3?w=100' },
    { id: 5, title: 'Cyberpunk OST', creator: 'Album • PT Adamczyk', type: 'album', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=100', downloaded: true },
    { id: 6, title: 'Chill Cyber', creator: 'Playlist • Alex Creator', type: 'playlist', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100', downloaded: false },
    { id: 7, title: 'Episodes Saved', creator: '12 episodes', type: 'system-podcast', downloaded: true, icon: <Mic2 color="white"/>, color: 'linear-gradient(135deg, #00E5FF, #0052D4)' },
  ];

  const filteredItems = libraryItems.filter(item => {
    if (filter === 'Playlists') return item.type.includes('playlist');
    if (filter === 'Artists') return item.type === 'artist';
    if (filter === 'Albums') return item.type === 'album';
    if (filter === 'Downloaded') return item.downloaded;
    return true;
  });

  return (
    <div className="library-screen">
      <header className="library-header glass-panel">
        <div className="lib-header-inner">
          <div className="lib-title-row">
            <img src="https://i.pravatar.cc/150?u=10" alt="profile" className="lib-avatar" onClick={() => navigateTo('profile')}/>
            <h2>Your Library</h2>
          </div>
          <div className="lib-actions">
            <button className="icon-btn-c"><Search size={24} /></button>
            <button className="icon-btn-c"><Plus size={24} /></button>
          </div>
        </div>
        
        <div className="lib-filters-scroll">
          {filters.map(f => (
            <button key={f} className={`lib-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="library-content">
        <div className="lib-sort-row">
          <button className="sort-btn">
            <History size={16} /> <span>Recents</span>
          </button>
        </div>

        <div className="lib-list">
          {filteredItems.map(item => (
            <div key={item.id} className="lib-item" onClick={() => item.type === 'playlist' ? navigateTo('playlist') : null}>
              {item.image ? (
                <img src={item.image} alt={item.title} className={item.type === 'artist' ? 'artist-cir' : 'square'} />
              ) : (
                <div className="sys-icon-wrapper" style={{background: item.color}}>
                  {item.icon}
                </div>
              )}
              
              <div className="lib-item-info">
                <h4>{item.title}</h4>
                <p>
                  {item.downloaded && <span className="dl-icon"><Download size={12} color="var(--secondary)"/></span>}
                  {item.creator}
                </p>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="empty-lib">
              <Clock size={48} color="var(--text-muted)"/>
              <h3>No {filter.toLowerCase()} found</h3>
              <p>Items you add to your library will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
