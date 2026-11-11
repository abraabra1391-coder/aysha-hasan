import { useState } from 'react';
import { wedding } from '../config.js';
import { Reveal } from './Motion.jsx';
import { Divider } from './Ornaments.jsx';

export default function Compliments() {
  const { text } = wedding;
  const [flipped, setFlipped] = useState(false);
  return (
    <section className="page wood-down">
      <Reveal>
        <p className="label on-dark">{text.complimentsLabel}</p>
        <Divider dark />
        <button type="button" className="flip-wrap" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}>
          <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
            <div className="flip-face flip-front">
              <p className="body-copy on-dark flip-front-text">{text.complimentsFront}</p>
              <Divider dark style={{ marginTop: 14 }} />
            </div>
            <div className="flip-face flip-back">
              <p className="body-copy on-dark flip-back-text">
                {text.complimentsBack.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
              </p>
            </div>
          </div>
        </button>
        <p className="hint">{text.complimentsHint}</p>
      </Reveal>
    </section>
  );
}
