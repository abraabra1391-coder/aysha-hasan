import { useEffect, useMemo, useState } from 'react';
import { wedding } from '../config.js';
import { Reveal } from './Motion.jsx';

const pad = (n) => String(n).padStart(2, '0');
const COLORS = ['#e6cd8f', '#c6a15b', '#efe4cc', '#ffffff'];

function split(ms) {
  let r = ms;
  const d = Math.floor(r / 86400000); r -= d * 86400000;
  const h = Math.floor(r / 3600000); r -= h * 3600000;
  const m = Math.floor(r / 60000); r -= m * 60000;
  return { d, h, m, s: Math.floor(r / 1000) };
}

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 50 }, (_, i) => {
    const size = 4 + Math.random() * 5;
    return {
      i,
      style: {
        width: size, height: size * 1.6,
        left: `${Math.random() * 100}%`,
        background: COLORS[Math.floor(Math.random() * COLORS.length)],
        animationDuration: `${2.2 + Math.random() * 1.6}s`,
        animationDelay: `${Math.random() * 0.6}s`,
        opacity: 0.7 + Math.random() * 0.3,
      },
    };
  }), []);
  return pieces.map((p) => <div key={p.i} className="confetti-piece" style={p.style} />);
}

export default function Countdown() {
  const target = new Date(wedding.event.start).getTime();
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [left <= 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const t = split(left);
  const cell = (v, l) => (
    <div className="cd-cell"><div className="cd-num">{pad(v)}</div><div className="cd-lab">{l}</div></div>
  );

  return (
    <section className="page countdown burgundy-up">
      <div className="confetti-field">{left <= 0 && <Confetti />}</div>
      <Reveal>
        <p className="label on-dark">{wedding.text.countdownLabel}</p>
        <h2 className="name on-dark" style={{ fontSize: 28 }}>{wedding.text.countdownTitle}</h2>
        <div className="cd-grid" role="timer" aria-live="off">{cell(t.d, 'Days')}{cell(t.h, 'Hours')}</div>
        <div className="cd-grid" style={{ marginTop: 14 }}>{cell(t.m, 'Minutes')}{cell(t.s, 'Seconds')}</div>
      </Reveal>
    </section>
  );
}
