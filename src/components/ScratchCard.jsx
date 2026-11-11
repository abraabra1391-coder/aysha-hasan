import { useEffect, useRef, useState } from 'react';
import { wedding } from '../config.js';
import { Reveal, Letters, Typewriter } from './Motion.jsx';

const BRUSH = 20;        // eraser radius in px (same as original)
const REVEAL_AT = 0.65;  // fraction scratched before the foil fades away

export default function ScratchCard() {
  const { text } = wedding;
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let scratching = false;
    let finished = false;
    let last = null;

    function drawFoil(w, h) {
      ctx.globalCompositeOperation = 'source-over';
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#e6cd8f');
      g.addColorStop(0.5, '#c6a15b');
      g.addColorStop(1, '#9c7e42');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,.12)';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.6 + 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(58,36,22,.55)';
      ctx.font = '600 13px "EB Garamond", serif';
      ctx.fillText('S C R A T C H', w / 2, h / 2);
    }

    function size() {
      if (finished) return;
      const r = wrap.getBoundingClientRect();
      if (Math.round(r.width) === width) return; // ignore mobile URL-bar resizes
      width = Math.round(r.width);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFoil(r.width, r.height);
    }

    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function erase(p) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineWidth = BRUSH * 2;
      ctx.beginPath();
      if (last) { ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
      ctx.arc(p.x, p.y, BRUSH, 0, Math.PI * 2);
      ctx.fill();
      last = p;
    }
    function progress() {
      if (finished || !canvas.width) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0, sampled = 0;
      for (let i = 3; i < data.length; i += 4 * 17) { sampled++; if (data[i] < 80) clear++; }
      if (clear / sampled > REVEAL_AT) { finished = true; setDone(true); }
    }

    const down = (e) => { scratching = true; last = null; canvas.setPointerCapture?.(e.pointerId); erase(pos(e)); e.preventDefault(); };
    const move = (e) => { if (!scratching) return; erase(pos(e)); progress(); e.preventDefault(); };
    const up = () => { if (!scratching) return; scratching = false; last = null; progress(); };

    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('resize', size);
    size();
    document.fonts?.ready.then(() => { if (!finished) { width = 0; size(); } });

    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('resize', size);
    };
  }, []);

  return (
    <section className="page wood-down">
      <Reveal>
        <p className="label on-dark">{text.scratchLabel}</p>
        <Letters className="name on-dark" text={text.scratchTitle} style={{ fontSize: 26 }} />
        <div className="scratch-wrap" ref={wrapRef}>
          <div className="scratch-msg">
            <Typewriter text={text.scratchMessage} start={done} speed={32} showBeforeStart />
          </div>
          <canvas ref={canvasRef} className={`scratch-canvas ${done ? 'done' : ''}`} aria-label="Scratch card" />
        </div>
        <p className="hint">{text.scratchHint}</p>
      </Reveal>
    </section>
  );
}
