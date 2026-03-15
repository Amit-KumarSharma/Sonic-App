import { useState } from 'react';
import './AuthScreen.css';
import { Mail, Github, Camera, Check } from 'lucide-react';

const genresList = ['Pop', 'Hip-Hop', 'R&B', 'Electronic', 'Rock', 'Indie', 'K-Pop', 'Latin'];
const artistsList = ['The Weeknd', 'Drake', 'Taylor Swift', 'Daft Punk', 'Bad Bunny', 'SZA', 'Arctic Monkeys'];

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1 = Auth, 2 = Profile Setup, 3 = Preferences
  
  // Profile state
  const [username, setUsername] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleAuthSubmit = (e) => {
    e?.preventDefault();
    if (isLogin) {
      onLogin(); // Direct login
    } else {
      setStep(2); // Move to profile setup
    }
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const renderStep1 = () => (
    <>
      <div className="auth-header">
        <h1 className="gradient-text">SONIC</h1>
        <p>{isLogin ? 'Welcome back to the future of sound' : 'Join the music revolution'}</p>
      </div>

      <div className="auth-glass glass-panel">
        <div className="auth-options">
          <button className="social-btn glass-button" onClick={handleAuthSubmit}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="social-btn glass-button" onClick={handleAuthSubmit}>
            <Github size={20} />
            Continue with Apple
          </button>
          
          <div className="divider">
            <span className="line"></span>
            <span className="text">or</span>
            <span className="line"></span>
          </div>

          <form className="email-form" onSubmit={handleAuthSubmit}>
            <div className="input-group glass-panel">
              <Mail size={18} color="var(--text-muted)" />
              <input type="email" placeholder="Email address" required />
            </div>
            <div className="input-group glass-panel">
              <span style={{color: 'var(--text-muted)', fontSize: 18}}>***</span>
              <input type="password" placeholder="Password" required />
            </div>
            
            <button type="submit" className="login-btn">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

      <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </>
  );

  const renderStep2 = () => (
    <div className="setup-container format-slide-in">
      <h2>Complete your profile</h2>
      <p className="setup-subtitle">Let's make it yours</p>

      <div className="avatar-upload-circle">
        <Camera size={28} className="camera-icon" />
        <span>Add Photo</span>
      </div>

      <div className="input-group glass-panel mt-20">
        <span style={{color: 'var(--text-main)', fontSize: 16}}>@</span>
        <input 
          type="text" 
          placeholder="Choose a username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
      </div>

      <button className="login-btn mt-20" onClick={() => setStep(3)} disabled={!username}>
        Continue
      </button>
    </div>
  );

  const renderStep3 = () => (
    <div className="setup-container format-slide-in">
      <h2>What do you love?</h2>
      <p className="setup-subtitle">Select 3 or more genres</p>

      <div className="pill-grid">
        {genresList.map(genre => (
          <button 
            key={genre}
            className={`pref-pill ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
          >
            {genre}
            {selectedGenres.includes(genre) && <Check size={14} />}
          </button>
        ))}
      </div>

      <h3 className="section-divider-title">Favorite Artists</h3>
      <div className="pill-grid">
        {artistsList.map(artist => (
          <button 
            key={artist}
            className={`pref-pill artist-pill ${selectedArtists.includes(artist) ? 'selected' : ''}`}
            onClick={() => toggleSelection(artist, selectedArtists, setSelectedArtists)}
          >
            {artist}
            {selectedArtists.includes(artist) && <Check size={14} />}
          </button>
        ))}
      </div>

      <button 
        className="login-btn mt-30 finale-btn" 
        onClick={onLogin} 
        disabled={selectedGenres.length < 3}
      >
        Enter SONIC
      </button>
    </div>
  );

  return (
    <div className="auth-screen">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Background decorations */}
      <div className="auth-orb orb-1"></div>
      <div className="auth-orb orb-2"></div>
    </div>
  );
}
