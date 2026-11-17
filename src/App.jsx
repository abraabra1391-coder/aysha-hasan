import { useEffect, useState } from 'react';
import { wedding } from './config.js';
import { fill } from './utils.js';
import Opening from './components/Opening.jsx';
import Hero from './components/Hero.jsx';
import { Invitation, Person, SaveTheDate, Venue, Contact, Closing, Monogram } from './components/Sections.jsx';
import Countdown from './components/Countdown.jsx';
import Wishes from './components/Wishes.jsx';
import BackgroundMusic from './components/BackgroundMusic.jsx';

export default function App() {
  const [entered, setEntered] = useState(!wedding.opening.showGate); // story is on the page
  const [gateGone, setGateGone] = useState(!wedding.opening.showGate); // opening screen removed
  const { assets } = wedding;

  useEffect(() => {
    document.title = fill(wedding.meta.title);
    const kit = wedding.fonts?.adobeFontsKit;
    if (kit && !document.getElementById('adobe-fonts')) {
      const l = document.createElement('link');
      l.id = 'adobe-fonts'; l.rel = 'stylesheet';
      l.href = `https://use.typekit.net/${encodeURIComponent(kit)}.css`;
      document.head.appendChild(l);
      // the couple's names on the first page switch to Bickham Script Pro 3 from that project
      document.documentElement.style.setProperty('--hero-names-font', "'bickham-script-pro-3'");
    }
    if (assets.background) {
      document.documentElement.style.setProperty('--desk-bg', `url('${assets.background}')`);
      document.documentElement.style.setProperty('--desk-bg-size', 'cover');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.classList.toggle('locked', !gateGone);
    if (entered) window.scrollTo(0, 0);
  }, [entered, gateGone]);

  return (
    <div className="stage">
      {assets.song && <BackgroundMusic src={assets.song} volume={assets.songVolume ?? 0.3} />}

      {!gateGone && (
        <Opening
          onOpen={() => {}}
          onReveal={() => setEntered(true)}
          onDone={() => { setEntered(true); setGateGone(true); }}
        />
      )}

      {entered && (
        <main className="story">
          <Hero />
          <Invitation />
          <Person who="groom" />
          <Person who="bride" />
          <SaveTheDate />
          {wedding.events.filter((ev) => ev.showPage !== false).map((ev, i) => <Venue key={i} ev={ev} mirrored={i % 2 === 1} />)}
          <Countdown />
          <Wishes />
          <Contact />
          <Closing />
          <Monogram />
        </main>
      )}
    </div>
  );
}
