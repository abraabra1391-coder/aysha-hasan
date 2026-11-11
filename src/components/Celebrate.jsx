import { useEffect, useRef, useState } from 'react';
import { wedding } from '../config.js';
import { useInView } from '../hooks/useInView.js';
import { Divider } from './Ornaments.jsx';
import { Reveal } from './Motion.jsx';

const PALETTE = ['#5c1220', '#c6a15b', '#efe4cc', '#4a2c17'];
let uid = 0;

function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) - 40, ((n >> 8) & 255) - 40, (n & 255) - 40].map((v) => Math.max(0, v));
  return `rgb(${c.join(',')})`;
}

let audioCtx;
function popSound() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.14);
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(t + 0.17);
  } catch { /* audio not available */ }
}

export default function Celebrate() {
  const { text, assets, bride, groom } = wedding;
  const [sectionRef, inView] = useInView({ threshold: 0.3, once: false });
  const fieldRef = useRef(null);
  const [balloons, setBalloons] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [photoOk, setPhotoOk] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const spawn = () => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      setBalloons((b) => [...b, { id: ++uid, color, left: 8 + Math.random() * 76, dur: 9 + Math.random() * 5 }]);
    };
    const timers = Array.from({ length: 5 }, (_, i) => setTimeout(spawn, i * 500));
    const iv = setInterval(spawn, 1800);
    return () => { timers.forEach(clearTimeout); clearInterval(iv); };
  }, [inView]);

  const remove = (id) => setBalloons((b) => b.filter((x) => x.id !== id));

  const pop = (e, id) => {
    const r = e.currentTarget.getBoundingClientRect();
    const f = fieldRef.current.getBoundingClientRect();
    const cx = r.left - f.left + r.width / 2;
    const cy = r.top - f.top + r.height / 2;
    const parts = Array.from({ length: 10 }, () => {
      const a = Math.random() * Math.PI * 2;
      const dist = 24 + Math.random() * 34;
      return {
        id: ++uid, x: cx, y: cy, size: 4 + Math.random() * 4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        dx: Math.cos(a) * dist, dy: Math.sin(a) * dist,
      };
    });
    setBursts((b) => [...b, ...parts]);
    setTimeout(() => setBursts((b) => b.filter((p) => !parts.includes(p))), 650);
    popSound();
    remove(id);
  };

  return (
    <section ref={sectionRef} className="page cream-down celebrate">
      <Reveal>
        <p className="label">{text.celebrateLabel}</p>
        <Divider />
      </Reveal>
      {assets.couplePhoto && (
        <figure className="couple-frame" hidden={!photoOk}>
          <img src={assets.couplePhoto} alt={`${bride.name} and ${groom.name}`} decoding="async" onLoad={() => setPhotoOk(true)} />
        </figure>
      )}
      <div className="balloon-field" ref={fieldRef}>
        {balloons.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-label="Pop balloon"
            className="balloon"
            style={{ left: `${b.left}%`, animationDuration: `${b.dur}s` }}
            onAnimationEnd={() => remove(b.id)}
            onClick={(e) => pop(e, b.id)}
          >
            <span className="string" />
            <span className="body" style={{ background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,.55), ${b.color} 55%, ${shade(b.color)} 100%)` }} />
          </button>
        ))}
        {bursts.map((p) => (
          <span key={p.id} className="burst" style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color, '--dx': `${p.dx}px`, '--dy': `${p.dy}px` }} />
        ))}
      </div>
      <Reveal>
        <p className="hint dark-hint">{text.celebrateHint}</p>
      </Reveal>
    </section>
  );
}
