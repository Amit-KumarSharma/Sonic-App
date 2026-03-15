import { Home, Compass, MessageCircle, User, Radio, Search, Library } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ activeScreen, setActiveScreen }) {
  // Hide nav on certain screens
  if (['splash', 'auth', 'player', 'live'].includes(activeScreen)) {
    return null;
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Discover' },
    { id: 'player', icon: Radio, label: 'Vibe', isCenter: true },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="bottom-nav glass-panel">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button 
            key={item.id} 
            className={`nav-item ${isActive ? 'active' : ''} ${item.isCenter ? 'center-item' : ''}`}
            onClick={() => setActiveScreen(item.id)}
          >
            <div className={`icon-container ${item.isCenter ? 'vibe-glow' : ''}`}>
              <Icon size={item.isCenter ? 28 : 24} />
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
