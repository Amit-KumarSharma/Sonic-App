import { useState } from 'react';
import './App.css';
import BottomNav from './components/BottomNav';

import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MoodScreen from './screens/MoodScreen';
import PlayerScreen from './screens/PlayerScreen';
import ChatScreen from './screens/ChatScreen';
import LiveRoomScreen from './screens/LiveRoomScreen';
import PlaylistCreatorScreen from './screens/PlaylistCreatorScreen';
import ProfileScreen from './screens/ProfileScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import NotificationScreen from './screens/NotificationScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('splash');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Helper to change screens with animation
  const navigateTo = (screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveScreen(screen);
      setIsTransitioning(false);
    }, 300); // match CSS fade transition duration
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'splash': return <SplashScreen onFinish={() => navigateTo('auth')} />;
      case 'auth': return <AuthScreen onLogin={() => navigateTo('home')} />;
      case 'home': return <HomeScreen navigateTo={navigateTo} />;
      case 'search': return <SearchScreen goBack={() => navigateTo('home')} />;
      case 'library': return <LibraryScreen navigateTo={navigateTo} />;
      case 'mood': return <MoodScreen navigateTo={navigateTo} />;
      case 'player': return <PlayerScreen goBack={() => navigateTo('home')} />;
      case 'chat': return <ChatScreen />;
      case 'live': return <LiveRoomScreen goBack={() => navigateTo('home')} />;
      case 'playlist': return <PlaylistScreen goBack={() => navigateTo('home')} />;
      case 'profile': return <ProfileScreen navigateTo={navigateTo} />;
      case 'ai': return <AIAssistantScreen />;
      case 'notifications': return <NotificationScreen goBack={() => navigateTo('home')} />;
      case 'admin': return <AdminScreen goBack={() => navigateTo('home')} />;
      default: return <HomeScreen navigateTo={navigateTo} />;
    }
  };

  // Screens that should display the bottom navigation
  const showNav = ['home', 'mood', 'player', 'chat', 'profile', 'library'].includes(activeScreen);

  return (
    <div className="app-container">
      <div className="mobile-wrapper">
        <div className={`screen-content ${isTransitioning ? 'fade-exit-active' : 'fade-enter-active'}`}>
          {renderScreen()}
        </div>
        {showNav && <BottomNav activeScreen={activeScreen} setActiveScreen={navigateTo} />}
      </div>
    </div>
  );
}

export default App;
