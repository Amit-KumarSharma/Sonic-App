import { useEffect } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    // Automatically transition entirely via tap in this prototype, 
    // or use a timeout:
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen" onClick={onFinish}>
      <div className="logo-container">
        <h1 className="sonic-logo gradient-text">SONIC</h1>
        <div className="waveform">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>
      <p className="splash-caption">Tap to skip...</p>
    </div>
  );
}
