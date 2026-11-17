import { useEffect, useRef, useState } from 'react';

const GESTURES = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];

/**
 * Background music: loops, plays at `volume`, and tries to start as soon as the page loads.
 * Browsers block sound until the visitor interacts with the page, so if the first attempt is
 * refused it starts on the visitor's first tap or key press (normally "Open Invitation").
 * iPhone/iPad ignore audio.volume, so there the level is set through a Web Audio gain node.
 */
export default function BackgroundMusic({ src, volume = 0.3 }) {
  const audioRef = useRef(null);
  const gainRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  // iOS: audio.volume is read-only, so route the element through a gain node (needs a gesture)
  const ensureVolume = () => {
    const a = audioRef.current;
    if (!a || gainRef.current) return;
    a.volume = volume;
    if (Math.abs(a.volume - volume) < 0.01) return; // volume works normally here
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      ctx.createMediaElementSource(a).connect(gain).connect(ctx.destination);
      gainRef.current = { ctx, gain };
    } catch { /* fall back to full volume rather than no music */ }
  };

  const start = () => {
    const a = audioRef.current;
    if (!a) return Promise.reject();
    ensureVolume();
    gainRef.current?.ctx.resume?.();
    return a.paused ? a.play() : Promise.resolve();
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('playing', onPlay);
    a.addEventListener('pause', onPause);

    const removeGestures = () => GESTURES.forEach((g) => document.removeEventListener(g, onGesture, true));
    function onGesture() {
      start().then(removeGestures).catch(() => { /* keep waiting for the next gesture */ });
    }

    // 1) try straight away on load
    a.play().catch(() => {
      // 2) blocked: start on the first interaction anywhere on the page
      GESTURES.forEach((g) => document.addEventListener(g, onGesture, true));
    });

    return () => {
      removeGestures();
      a.removeEventListener('playing', onPlay);
      a.removeEventListener('pause', onPause);
    };
  }, [src, volume]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (e) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (!playing) { a.muted = false; setMuted(false); start().catch(() => {}); return; }
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const on = playing && !muted;
  return (
    <>
      <audio ref={audioRef} src={src} autoPlay loop preload="auto" playsInline />
      <button
        className="mute-btn"
        type="button"
        onClick={toggle}
        aria-label={on ? 'Mute music' : 'Play music'}
        aria-pressed={on}
        style={{ opacity: on ? 1 : 0.55 }}
      >
        {on ? '♫' : '♫̸'}
      </button>
    </>
  );
}
