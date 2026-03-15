import { useState } from 'react';
import './SearchScreen.css';
import { Search, Mic, ArrowUpLeft, X, TrendingUp, Music, User } from 'lucide-react';

const recentSearches = ['Synthwave Mix', 'The Midnight', 'Cyberpunk OST', 'Kavinsky'];
const trendingSearches = [
  { id: 1, text: 'Neon Drive 2025', type: 'playlist' },
  { id: 2, text: 'Daft Punk Unreleased', type: 'artist' },
  { id: 3, text: 'Nightcall', type: 'song' },
  { id: 4, text: 'Retro Electro', type: 'genre' },
];

export default function SearchScreen({ goBack }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock results
  const results = [
    { id: 1, title: 'Nightcity Lights', type: 'Song', artist: 'Cyber DJ', cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=50' },
    { id: 2, title: 'Nightcall', type: 'Song', artist: 'Kavinsky', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=50' },
    { id: 3, title: 'The Midnight', type: 'Artist', cover: 'https://images.unsplash.com/photo-1627236531398-aa5231cdeb5f?w=50', isCircular: true },
    { id: 4, title: 'Midnight City', type: 'Playlist', artist: '10k Likes', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=50' },
  ];

  return (
    <div className="search-screen format-slide-in">
      <header className="search-top-bar glass-panel">
        <div className="search-input-wrapper">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Songs, artists, or podcasts..." 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearching(e.target.value.length > 0);
            }}
            autoFocus
          />
          {query.length > 0 ? (
            <button className="clear-btn" onClick={() => { setQuery(''); setIsSearching(false); }}>
              <X size={16} />
            </button>
          ) : (
            <button className="voice-search-btn">
              <Mic size={18} />
            </button>
          )}
        </div>
        <button className="cancel-text-btn" onClick={goBack}>Cancel</button>
      </header>

      <div className="search-content">
        {!isSearching ? (
          <>
            <div className="search-section">
              <div className="section-header">
                <h3>Recent Searches</h3>
                <button className="clear-all-text">Clear</button>
              </div>
              <div className="recent-list">
                {recentSearches.map((item, idx) => (
                  <div key={idx} className="recent-item" onClick={() => { setQuery(item); setIsSearching(true); }}>
                    <Search size={16} color="var(--text-muted)" />
                    <span>{item}</span>
                    <ArrowUpLeft size={16} color="var(--text-muted)" className="ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            <div className="search-section mt-20">
              <div className="section-header">
                <h3><TrendingUp size={18} color="var(--primary)" /> Trending</h3>
              </div>
              <div className="trending-tags">
                {trendingSearches.map(item => (
                  <button key={item.id} className="trend-tag glass-panel" onClick={() => { setQuery(item.text); setIsSearching(true); }}>
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="search-section mt-20">
               <h3>Browse All</h3>
               <div className="browse-grid">
                 <div className="browse-card" style={{background: 'linear-gradient(135deg, #FF1493, #8A2BE2)'}}>Pop</div>
                 <div className="browse-card" style={{background: 'linear-gradient(135deg, #00E5FF, #0052D4)'}}>Electronic</div>
                 <div className="browse-card" style={{background: 'linear-gradient(135deg, #FF4500, #FF8C00)'}}>Rock</div>
                 <div className="browse-card" style={{background: 'linear-gradient(135deg, #9932CC, #4B0082)'}}>Hip-Hop</div>
               </div>
            </div>
          </>
        ) : (
          <div className="search-results-list">
             <div className="results-filter">
               <button className="pill-btn active">All</button>
               <button className="pill-btn">Songs</button>
               <button className="pill-btn">Artists</button>
               <button className="pill-btn">Playlists</button>
             </div>
             
             {results.filter(r => r.title.toLowerCase().includes(query.toLowerCase())).map(result => (
               <div key={result.id} className="s-result-item glass-panel">
                 <img 
                   src={result.cover} 
                   alt={result.title} 
                   className={result.isCircular ? 'artist-cir' : 'square'}
                 />
                 <div className="s-result-info">
                   <h4>{result.title}</h4>
                   <p>{result.type} • {result.artist || 'Artist'}</p>
                 </div>
               </div>
             ))}
             
             {results.filter(r => r.title.toLowerCase().includes(query.toLowerCase())).length === 0 && (
               <div className="no-results">
                 <Search size={48} color="var(--text-muted)" />
                 <h3>No results found for "{query}"</h3>
                 <p>Try searching for something else, or check your spelling.</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
