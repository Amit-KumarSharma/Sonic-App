import { useState } from 'react';
import './MoodScreen.css';
import { Play } from 'lucide-react';

const moods = [
  { id: 'happy', label: 'Happy', color: '#FFD700', bg: 'rgba(255, 215, 0, 0.2)' },
  { id: 'sad', label: 'Sad', color: '#4169E1', bg: 'rgba(65, 105, 225, 0.2)' },
  { id: 'workout', label: 'Workout', color: '#FF4500', bg: 'rgba(255, 69, 0, 0.2)' },
  { id: 'chill', label: 'Chill', color: '#00FA9A', bg: 'rgba(0, 250, 154, 0.2)' },
  { id: 'focus', label: 'Focus', color: '#9370DB', bg: 'rgba(147, 112, 219, 0.2)' },
  { id: 'night', label: 'Night Drive', color: '#FF1493', bg: 'rgba(255, 20, 147, 0.2)' },
  { id: 'party', label: 'Party', color: '#00E5FF', bg: 'rgba(0, 229, 255, 0.2)' }
];

export default function MoodScreen({ navigateTo }) {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="mood-screen">
      <header className="mood-header">
        <h2>How are you feeling?</h2>
        <p>Select a mood to tune your universe.</p>
      </header>

      <div className={`mood-bubbles ${selectedMood ? 'minimized' : ''}`}>
        {moods.map((mood, index) => (
          <div 
            key={mood.id}
            className={`bubble-wrapper ${selectedMood === mood.id ? 'active' : ''}`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: selectedMood && selectedMood !== mood.id ? 'scale(0.8) opacity(0.5)' : 'none'
            }}
            onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
          >
            <div 
              className="mood-bubble glass-panel"
              style={{ 
                '--mood-color': mood.color,
                '--mood-bg': mood.bg
              }}
            >
              <span>{mood.label}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="mood-playlists fade-enter-active">
          <h3>Curated for {moods.find(m => m.id === selectedMood)?.label}</h3>
          
          <div className="playlist-list">
            {[1, 2, 3].map(i => (
              <div key={i} className="playlist-row glass-panel" onClick={() => navigateTo('player')}>
                <div className="playlist-cover" style={{ background: moods.find(m => m.id === selectedMood)?.bg }}>
                  <Play size={20} color={moods.find(m => m.id === selectedMood)?.color} />
                </div>
                <div className="playlist-info">
                  <h4>Sonic {moods.find(m => m.id === selectedMood)?.label} Mix {i}</h4>
                  <p>24 Tracks • 1h 32m</p>
                </div>
                <button className="glass-button play-circle-btn">
                  <Play size={16} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
