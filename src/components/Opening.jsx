import { useEffect, useRef, useState } from 'react';
import { wedding } from '../config.js';
import { Scene, Doors } from './Scene.jsx';

const DOOR_MS = 2700; // length of the coded door animation
const FADE_MS = 800;  // plain fade when the door animation is off

/**
 * Gate screen + door-opening transition.
 * With assets.doorVideo set it plays the video (like the original);
 * otherwise the coded doors swing open and the scene zooms through the arch.
 */
export default function Opening({ onOpen, onReveal, onDone }) {
  const { assets, arabic, bride, groom, text } = wedding;
  const useDoors = !assets.doorVideo && wedding.opening.doorAnimation;
  const gateBg = !assets.poster && !useDoors ? assets.heroBackground || assets.background : '';
  const [phase, setPhase] = useState('gate'); // gate | opening
  const videoRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  const open = () => {
    if (phase !== 'gate') return;
    setPhase('opening');
    onOpen();
    if (!useDoors && !assets.doorVideo) onReveal(); // put the hero underneath, then fade the gate away
    if (assets.doorVideo) {
      const v = videoRef.current;
      v.currentTime = 0;
      const p = v.play();
      if (p && p.catch) p.catch(finish);
    }
  };

  useEffect(() => {
    if (phase !== 'opening' || assets.doorVideo) return;
    const t = setTimeout(finish, useDoors ? DOOR_MS : FADE_MS);
    return () => clearTimeout(t);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const opening = phase === 'opening';

  return (
    <section className={`opening ${opening ? 'is-opening' : ''} ${!useDoors && !assets.doorVideo ? 'fade-mode' : ''} ${gateBg ? 'on-image' : ''}`} aria-label="Opening">
      {assets.doorVideo ? (
        <video
          ref={videoRef}
          className={`door-video ${opening ? 'show' : ''}`}
          src={assets.doorVideo}
          poster={assets.poster || undefined}
          playsInline
          preload="auto"
          onEnded={finish}
          onError={() => opening && finish()}
        />
      ) : null}

      {assets.poster ? (
        <img className={`frame-img ${opening && assets.doorVideo ? 'gone' : ''}`} src={assets.poster} alt="Closed wooden doors" />
      ) : useDoors ? (
        <Scene className={opening ? 'zooming' : ''}>
          <Doors open={opening} />
        </Scene>
      ) : (
        <div className="gate-bg" style={gateBg ? { backgroundImage: `url('${gateBg}')` } : undefined} />
      )}
      {useDoors && <div className={`door-flash ${opening ? 'on' : ''}`} />}

      <div className="gate-ui">
        <div className="veil" />
        <div className="ar-welcome">{arabic.salaam}</div>
        <div className="ar-names">
          <p className="ar-name">{bride.arabicName}</p>
          <div className="ar-divider"><i /></div>
          <p className="ar-name">{groom.arabicName}</p>
        </div>
        <div className="open-cta-wrap">
          <button className="open-cta" type="button" onClick={open}>{text.openButton}</button>
        </div>
      </div>
    </section>
  );
}
