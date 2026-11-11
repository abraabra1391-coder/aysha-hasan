import { useState } from 'react';

export default function MusicToggle({ audioRef }) {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };
  return (
    <button className="mute-btn" type="button" onClick={toggle} aria-label={muted ? 'Unmute music' : 'Mute music'} style={{ opacity: muted ? 0.55 : 1 }}>
      {muted ? '♫\u0338' : '♫'}
    </button>
  );
}
