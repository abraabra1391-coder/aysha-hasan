import { useEffect, useRef, useState } from 'react';
import { wedding } from './config.js';
import { fill } from './utils.js';
import Opening from './components/Opening.jsx';
import Hero from './components/Hero.jsx';
import { Invitation, Person, SaveTheDate, Venue, Contact, Closing } from './components/Sections.jsx';
import Countdown from './components/Countdown.jsx';
import ScratchCard from './components/ScratchCard.jsx';
import Celebrate from './components/Celebrate.jsx';
import Compliments from './components/Compliments.jsx';
import MusicToggle from './components/MusicToggle.jsx';

export default function App() {
  const [entered, setEntered] = useState(!wedding.opening.showGate); // story is on the page
  const [gateGone, setGateGone] = useState(!wedding.opening.showGate); // opening screen removed
  const audioRef = useRef(null);
  const { assets } = wedding;

  useEffect(() => {
    document.title = fill(wedding.meta.title);
    if (assets.background) {
      document.documentElement.style.setProperty('--desk-bg', `url('${assets.background}')`);
      document.documentElement.style.setProperty('--desk-bg-size', 'cover');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.classList.toggle('locked', !gateGone);
    if (entered) window.scrollTo(0, 0);
  }, [entered, gateGone]);

  // Start the song on the "Open" tap; if the browser blocks it, retry on the next gesture.
  const playSong = () => {
    const a = audioRef.current;
    if (!a || !a.paused) return;
    a.volume = 0.55;
    a.play()?.catch(() => {
      const retry = () => { if (a.paused) a.play().catch(() => {}); };
      document.addEventListener('pointerdown', retry, { once: true });
      document.addEventListener('keydown', retry, { once: true });
    });
  };

  // Without the opening screen, start the music on the guest's first tap.
  useEffect(() => {
    if (wedding.opening.showGate || !assets.song) return;
    document.addEventListener('pointerdown', playSong, { once: true });
    return () => document.removeEventListener('pointerdown', playSong);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="stage">
      {assets.song && (
        <>
          <audio ref={audioRef} src={assets.song} loop preload="auto" />
          <MusicToggle audioRef={audioRef} />
        </>
      )}

      {!gateGone && (
        <Opening
          onOpen={playSong}
          onReveal={() => setEntered(true)}
          onDone={() => { setEntered(true); setGateGone(true); }}
        />
      )}

      {entered && (
        <main className="story">
          <Hero />
          <Invitation />
          <Person who="bride" />
          <Person who="groom" />
          <SaveTheDate />
          {wedding.events.map((ev, i) => <Venue key={i} ev={ev} mirrored={i % 2 === 1} />)}
          <Countdown />
          <ScratchCard />
          <Celebrate />
          <Compliments />
          <Contact />
          <Closing />
        </main>
      )}
    </div>
  );
}
