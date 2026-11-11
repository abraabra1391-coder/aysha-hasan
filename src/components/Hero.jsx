import { useRef } from 'react';
import { wedding } from '../config.js';
import { dateParts } from '../utils.js';
import { Scene } from './Scene.jsx';
import { ButterflySvg } from './Ornaments.jsx';

function HeroArt() {
  const { bride, groom, arabic, text, events, event, assets } = wedding;
  const first = events[0];
  const d = dateParts();
  const onImage = Boolean(assets.heroBackground);
  const panel = (
    <div className={`hero-panel ${onImage ? 'on-image' : ''}`}>
      <div className="hp-medallion" />
      <p className="hp-welcome">{arabic.welcome}</p>
      <p className="hp-lead">{text.heroLead}</p>
      <p className="hp-name">{bride.name}</p>
      <p className="hp-amp">&amp;</p>
      <p className="hp-name">{groom.name}</p>
      <div className="hp-rule"><i /></div>
      <p className="hp-day">{d.day}</p>
      <p className="hp-month">{d.month} {d.year}</p>
      <p className="hp-time">{event.timeLabel}</p>
      <div className="hp-rule"><i /></div>
      <p className="hp-venue">{first.placeLines.join(' ')}</p>
      <p className="hp-address">{first.address}</p>
      <div className="hp-rule"><i /></div>
      <p className="hp-tagline">{text.tagline}</p>
    </div>
  );
  if (onImage) {
    return (
      <div className="hero-bg-art" style={{ backgroundImage: `url('${assets.heroBackground}')` }}>
        {panel}
      </div>
    );
  }
  return <Scene className="hero-scene">{panel}</Scene>;
}

function Butterfly({ className }) {
  const src = wedding.assets.butterfly;
  return (
    <div className={`hero-butterfly ${className}`}>
      {src ? <img src={src} alt="" /> : <ButterflySvg />}
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { assets, bride, groom } = wedding;
  const next = () => ref.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section ref={ref} className="page hero">
      {assets.hero ? (
        <img className="hero-img" src={assets.hero} alt={`Wedding invitation of ${bride.name} and ${groom.name}`} />
      ) : (
        <HeroArt />
      )}
      <Butterfly className="hero-butterfly-1" />
      <Butterfly className="hero-butterfly-2" />
      <button className="scroll-cue" type="button" onClick={next}>
        <span>Scroll</span>
        <span className="arrow-icon">↓</span>
      </button>
    </section>
  );
}
