import { useState } from 'react';
import './PlaylistCreatorScreen.css';
import { Plus, GripVertical, Image as ImageIcon, Users, Check, Wand2 } from 'lucide-react';

const mockTracks = [
  { id: 1, title: 'Neon Nights', artist: 'Cyber Dreamer', dnd: true },
  { id: 2, title: 'Digital Love', artist: 'Synthwave', dnd: true },
  { id: 3, title: 'Midnight City', artist: 'Retrowave', dnd: true },
];

export default function PlaylistCreatorScreen() {
  const [tracks, setTracks] = useState(mockTracks);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [coverGenerated, setCoverGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCover = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCoverGenerated(true);
    }, 1500);
  };

  // Simulate drag and drop by moving item down
  const moveDown = (index) => {
    if (index === tracks.length - 1) return;
    const newTracks = [...tracks];
    const temp = newTracks[index];
    newTracks[index] = newTracks[index + 1];
    newTracks[index + 1] = temp;
    setTracks(newTracks);
  };

  return (
    <div className="playlist-creator-screen">
      <header className="creator-header">
        <h2>New Playlist</h2>
        <button className="save-btn glass-button">Create</button>
      </header>

      <div className="creator-top glass-panel">
        <div 
          className="cover-generator" 
          onClick={generateCover}
        >
          {isGenerating ? (
            <div className="loader"></div>
          ) : coverGenerated ? (
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200" alt="Generated Cover" className="generated-cover" />
          ) : (
            <div className="gen-placeholder">
              <Wand2 size={32} color="var(--secondary)"/>
              <span>AI Cover Gen</span>
            </div>
          )}
        </div>
        <div className="playlist-meta">
          <input type="text" placeholder="Playlist Name" className="p-title-input" />
          <textarea placeholder="Add an optional description..." className="p-desc-input"></textarea>
        </div>
      </div>

      <div className="collab-toggle glass-panel">
        <div className="collab-info">
          <Users size={20} color="var(--primary)" />
          <div>
            <h4>Collaborative</h4>
            <p>Friends can add songs</p>
          </div>
        </div>
        <button 
          className={`switch ${isCollaborative ? 'on' : 'off'}`}
          onClick={() => setIsCollaborative(!isCollaborative)}
        >
          <div className="knob"></div>
        </button>
      </div>

      <div className="tracklist-section">
        <h3>Tracks</h3>
        <div className="drag-list">
          {tracks.map((track, i) => (
            <div key={track.id} className="drag-item glass-panel">
              <button className="drag-handle" onClick={() => moveDown(i)}>
                <GripVertical size={20} color="var(--text-muted)" />
              </button>
              <div className="drag-info">
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="add-track-btn glass-button">
          <Plus size={20} /> Add Songs
        </button>
      </div>
    </div>
  );
}
