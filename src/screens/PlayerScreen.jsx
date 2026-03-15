import { useState, useRef, useEffect } from 'react';
import './PlayerScreen.css';
import { Heart, MessageCircle, Share2, Play, Pause, ChevronLeft, Disc3, Mic2 } from 'lucide-react';

const mockFeed = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "Cyber Dreamer",
    video: "https://cdn.pixabay.com/video/2019/02/16/21436-318466185_large.mp4",
    likes: "1.2M",
    comments: "45K",
    shares: "12K",
    lyrics: [
      { time: 0, text: "I'm walking through the neon rain..." },
      { time: 3, text: "Electric dreams running through my brain" },
      { time: 6, text: "City lights reflect in my eyes..." },
      { time: 9, text: "We're soaring through the synthwave skies..." }
    ]
  },
  {
    id: 2,
    title: "Digital Love",
    artist: "Synthwave",
    video: "https://cdn.pixabay.com/video/2019/08/21/26190-354316524_large.mp4",
    likes: "854K",
    comments: "22K",
    shares: "8K",
    lyrics: [
      { time: 0, text: "Lost in the mainframe tonight" },
      { time: 3, text: "Looking for a spark of light" },
      { time: 6, text: "System overload in my heart" },
      { time: 9, text: "Tearing my logic apart" }
    ]
  },
  {
    id: 3,
    title: "Midnight City",
    artist: "Retrowave",
    video: "https://cdn.pixabay.com/video/2021/04/13/71008-537482488_large.mp4",
    likes: "2.1M",
    comments: "105K",
    shares: "42K",
    lyrics: [
      { time: 0, text: "Cruising down the empty street" },
      { time: 3, text: "Moving to the steady beat" },
      { time: 6, text: "Headlights cut through the dark" },
      { time: 9, text: "Leaving a glowing mark" }
    ]
  }
];

export default function PlayerScreen({ goBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Handle intersection observer to detect active video
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 } // trigger when 60% of the video is visible
    );

    const children = scrollRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="resso-feed-container">
      {/* Top Header overlay */}
      <header className="feed-header">
        <button className="icon-btn" onClick={goBack}>
          <ChevronLeft size={28} />
        </button>
        <div className="feed-tabs">
          <span className="inactive">Following</span>
          <span className="active">For You</span>
        </div>
        <button className="icon-btn">
          <Mic2 size={24} />
        </button>
      </header>

      {/* Vertical Snap Scroll Area */}
      <div className="feed-scroll" ref={scrollRef}>
        {mockFeed.map((track, index) => (
          <TrackItem 
            key={track.id} 
            track={track} 
            index={index} 
            isActive={index === activeIndex} 
          />
        ))}
      </div>
    </div>
  );
}

// Individual TikTok-style full-screen track item
function TrackItem({ track, index, isActive }) {
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [liked, setLiked] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(1); // Simulating active lyric
  const [showComments, setShowComments] = useState(false);
  const [highlightedLyric, setHighlightedLyric] = useState(null);
  const videoRef = useRef(null);

  // Play/Pause based on active scroll state
  useEffect(() => {
    if (isActive) {
      if (videoRef.current) videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
      setIsPlaying(true);
    } else {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
      setShowComments(false); // Close comments on swipe
    }
  }, [isActive]);

  const togglePlay = () => {
    if (showComments) return; // Don't toggle play if interacting with comments
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  // Simulate lyrics progression
  useEffect(() => {
    if (isActive && isPlaying && !highlightedLyric) {
      const interval = setInterval(() => {
        setCurrentLyricIndex(prev => (prev + 1) % track.lyrics.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive, isPlaying, track.lyrics.length, highlightedLyric]);

  const handleLyricClick = (e, i) => {
    e.stopPropagation();
    setHighlightedLyric(i === highlightedLyric ? null : i); // Toggle highlight
    if (isPlaying) togglePlay(); // Pause to let them share/comment on lyric
  };

  return (
    <div className="track-container" data-index={index}>
      {/* Background Vibe Video */}
      <video 
        ref={videoRef}
        className="vibe-video"
        src={track.video}
        loop
        muted
        playsInline
        onClick={togglePlay}
      />
      <div className="video-overlay" onClick={togglePlay}></div>

      {/* Play/Pause Indicator */}
      {!isPlaying && !showComments && (
        <div className="center-play-indicator" onClick={togglePlay}>
          <Play size={48} fill="currentColor" />
        </div>
      )}

      {/* Prominent Synced Lyrics */}
      <div className={`lyrics-overlay ${showComments ? 'fade-out' : ''}`}>
        {track.lyrics.map((lyric, i) => {
          let className = 'lyric-line ';
          if (highlightedLyric === i) className += 'highlighted ';
          else if (i === currentLyricIndex) className += 'active gradient-text ';
          else if (i < currentLyricIndex) className += 'past ';
          else className += 'future ';
          
          return (
            <p key={i} className={className} 
               onClick={(e) => handleLyricClick(e, i)}
               style={{ 
                 transform: `translateY(${(currentLyricIndex - i) * 32}px)`,
                 opacity: Math.abs(currentLyricIndex - i) > 2 && highlightedLyric !== i ? 0 : 1
               }}>
              {lyric.text}
              {highlightedLyric === i && (
                <span className="lyric-actions">
                  <button><Share2 size={16} /> Share</button>
                  <button onClick={() => setShowComments(true)}><MessageCircle size={16} /> Comment</button>
                </span>
              )}
            </p>
          );
        })}
      </div>

      {/* Comments Drawer */}
      <div className={`comments-drawer ${showComments ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>{track.comments} comments</h3>
          <button className="close-drawer" onClick={() => setShowComments(false)}>✕</button>
        </div>
        <div className="drawer-scroll">
          {highlightedLyric !== null && (
            <div className="lyric-context-quote">
              <span className="quote-mark">"</span>
              {track.lyrics[highlightedLyric].text}
              <span className="quote-mark">"</span>
            </div>
          )}
          <div className="comment-mock">
            <img src="https://i.pravatar.cc/150?img=5" alt="user" />
            <div className="comment-body">
              <strong>User123</strong>
              <p>This part always gets me! 🔥</p>
              <div className="comment-meta">
                <span>2h ago</span>
                <span>Reply</span>
              </div>
            </div>
            <div className="comment-like"><Heart size={14} /> 12k</div>
          </div>
          <div className="comment-mock">
            <img src="https://i.pravatar.cc/150?img=8" alt="user" />
            <div className="comment-body">
              <strong>SynthBoy</strong>
              <p>Such a vibe.</p>
              <div className="comment-meta">
                <span>5h ago</span>
                <span>Reply</span>
              </div>
            </div>
            <div className="comment-like"><Heart size={14} /> 8k</div>
          </div>
        </div>
        <div className="comment-input-area">
          <input type="text" placeholder={highlightedLyric !== null ? "Comment on this lyric..." : "Add comment..."} />
          <button className="post-btn">Pay</button>
        </div>
      </div>

      {/* Bottom Track Info */}
      <div className={`bottom-info ${showComments ? 'fade-out' : ''}`}>
        <h2 className="track-title">{track.title}</h2>
        <div className="track-artist">
          <Disc3 size={16} className="spin-icon" />
          <span>{track.artist}</span>
        </div>
        <div className="progress-bar-thin">
          <div className="progress-fill-thin" style={{ width: `${(currentLyricIndex / track.lyrics.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Right Action Bar */}
      <div className={`right-action-bar ${showComments ? 'fade-out' : ''}`}>
        <div className="action-item">
          <div className="action-btn-circle">
            <img src={`https://i.pravatar.cc/150?img=${track.id + 10}`} alt="Creator" className="creator-avatar" />
            <div className="plus-badge">+</div>
          </div>
        </div>
        <div className="action-item" onClick={() => setLiked(!liked)}>
          <button className={`action-btn ${liked ? 'liked' : ''}`}>
            <Heart size={28} fill={liked ? 'currentColor' : 'none'} color={liked ? '#FF1493' : 'white'} />
          </button>
          <span>{track.likes}</span>
        </div>
        <div className="action-item" onClick={() => setShowComments(true)}>
          <button className="action-btn">
            <MessageCircle size={28} color="white" />
          </button>
          <span>{track.comments}</span>
        </div>
        <div className="action-item">
          <button className="action-btn">
            <Share2 size={28} color="white" />
          </button>
          <span>{track.shares}</span>
        </div>
        <div className="action-item mt-4">
          <div className={`spinning-record ${isPlaying ? 'playing' : ''}`}>
            <img src={`https://picsum.photos/seed/${track.id}/200`} alt="Album" />
          </div>
        </div>
      </div>
    </div>
  );
}
