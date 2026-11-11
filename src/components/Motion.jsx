import { Fragment, useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import { prefersReducedMotion } from '../utils.js';

/** Gentle fade-up when 35% visible (matches the original .reveal). */
export function Reveal({ className = '', children, style }) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Letter-by-letter name reveal, 35ms stagger. */
export function Letters({ text, as: Tag = 'h2', className = '', style }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  return (
    <Tag ref={ref} className={`${className} letters ${inView ? 'in' : ''}`} style={style} aria-label={text}>
      {text.split(' ').map((word, w, words) => {
        const offset = words.slice(0, w).join(' ').length + (w ? 1 : 0);
        return (
          <Fragment key={w}>
            {w > 0 && ' '}
            <span className="word">
              {[...word].map((ch, i) => (
                <span aria-hidden="true" className="char" key={i} style={{ transitionDelay: `${(offset + i) * 35}ms` }}>{ch}</span>
              ))}
            </span>
          </Fragment>
        );
      })}
    </Tag>
  );
}

/**
 * Typewriter text. Starts when 60% visible, or when `start` becomes true.
 * A hidden copy of the full text reserves the space so nothing jumps while typing.
 */
export function Typewriter({ text, as: Tag = 'p', className = '', style, start, speed = 38, showBeforeStart = false }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const go = start ?? inView;
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (!go || count !== null) return;
    if (prefersReducedMotion()) { setCount(text.length); return; }
    let i = 0;
    setCount(0);
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [go]); // eslint-disable-line react-hooks/exhaustive-deps

  const notStarted = count === null;
  const typing = !notStarted && count < text.length;
  const shown = notStarted ? (showBeforeStart ? text : '') : text.slice(0, count);

  return (
    <Tag ref={ref} className={`type-text ${className}`} style={style}>
      <span className="tw-ghost" aria-hidden="true">{text}</span>
      <span className="tw-live">
        {shown}
        {typing && <span className="type-cursor" />}
      </span>
    </Tag>
  );
}
