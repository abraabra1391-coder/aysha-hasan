import { useId } from 'react';

export function Divider({ dark = false, style }) {
  return <div className={`divider ${dark ? 'dark' : ''}`} style={style}><i /></div>;
}

/** Gold floral sprig used on the side of the cream pages. */
export function Floral({ side = 'left', style, strong = false }) {
  const a = strong ? [0.8, 0.32, 0.28, 0.6, 0.45] : [0.7, 0.28, 0.24, 0.55, 0.4];
  return (
    <svg className={`floral ${side}`} style={style} viewBox="0 0 100 220" fill="none" aria-hidden="true">
      <path d="M14 210 C 10 160 22 140 16 100 C 11 70 20 50 15 20" stroke="currentColor" strokeWidth="1.4" opacity={a[0]} />
      <ellipse cx="30" cy="150" rx="16" ry="7" transform="rotate(-25 30 150)" fill="currentColor" opacity={a[1]} />
      <ellipse cx="6" cy="120" rx="14" ry="6" transform="rotate(20 6 120)" fill="currentColor" opacity={a[2]} />
      <ellipse cx="28" cy="85" rx="14" ry="6" transform="rotate(-20 28 85)" fill="currentColor" opacity={a[2]} />
      <g transform="translate(15,20)">
        <circle r="5" fill="currentColor" opacity={a[3]} />
        <circle cx="-8" cy="-3" r="5" fill="currentColor" opacity={a[4]} />
        <circle cx="8" cy="-3" r="5" fill="currentColor" opacity={a[4]} />
        <circle cx="-6" cy="7" r="5" fill="currentColor" opacity={a[4]} />
        <circle cx="6" cy="7" r="5" fill="currentColor" opacity={a[4]} />
      </g>
    </svg>
  );
}

/** Brass Moroccan-style lantern with a flickering glow. */
export function Lantern({ className = '', chain = 30 }) {
  const id = useId().replace(/:/g, '');
  const top = chain;
  return (
    <svg className={`lantern ${className}`} viewBox={`0 0 60 ${top + 92}`} aria-hidden="true">
      <defs>
        <radialGradient id={`g${id}`} cx="50%" cy="55%" r="60%">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset=".45" stopColor="#ffcf73" />
          <stop offset="1" stopColor="#c27a22" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`b${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#7a5520" />
          <stop offset=".45" stopColor="#e6c46e" />
          <stop offset="1" stopColor="#6d4a1a" />
        </linearGradient>
      </defs>
      {chain > 0 && <line x1="30" y1="0" x2="30" y2={top} stroke="#3a2a14" strokeWidth="1.2" />}
      <circle className="lantern-glow" cx="30" cy={top + 50} r="34" fill={`url(#g${id})`} />
      <g transform={`translate(0 ${top})`}>
        <circle cx="30" cy="3" r="3" fill="none" stroke={`url(#b${id})`} strokeWidth="1.6" />
        <path d="M22 6 H38 L44 18 H16 Z" fill={`url(#b${id})`} />
        <path d="M16 18 H44 L46 22 H14 Z" fill="#5a3d14" />
        <path d="M16 22 H44 L41 70 H19 Z" fill="#ffd98a" opacity=".92" />
        <path d="M16 22 H44 L41 70 H19 Z M23 22 L22 70 M30 22 V70 M37 22 L38 70 M16 38 H44 M17 54 H43"
          fill="none" stroke={`url(#b${id})`} strokeWidth="1.4" />
        <path d="M18 70 H42 L38 78 H22 Z" fill={`url(#b${id})`} />
        <path d="M26 78 H34 L30 88 Z" fill={`url(#b${id})`} />
      </g>
    </svg>
  );
}

/** Gold butterfly with flapping wings (used when no butterfly image is set). */
export function ButterflySvg() {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true">
      <defs>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e7b4" />
          <stop offset=".5" stopColor="#d9b56a" />
          <stop offset="1" stopColor="#9c7e42" />
        </linearGradient>
      </defs>
      <g className="wing wing-l">
        <path d="M48 44 C 30 10, 4 6, 6 26 C 8 40, 26 46, 48 46 Z" fill={`url(#w${id})`} />
        <path d="M48 48 C 30 50, 12 62, 20 76 C 28 86, 42 70, 48 50 Z" fill={`url(#w${id})`} opacity=".9" />
        <path d="M44 40 C 30 24, 16 18, 12 24 M42 52 C 32 58, 24 66, 24 72" stroke="#7a5a26" strokeWidth=".8" fill="none" opacity=".6" />
      </g>
      <g className="wing wing-r">
        <path d="M52 44 C 70 10, 96 6, 94 26 C 92 40, 74 46, 52 46 Z" fill={`url(#w${id})`} />
        <path d="M52 48 C 70 50, 88 62, 80 76 C 72 86, 58 70, 52 50 Z" fill={`url(#w${id})`} opacity=".9" />
        <path d="M56 40 C 70 24, 84 18, 88 24 M58 52 C 68 58, 76 66, 76 72" stroke="#7a5a26" strokeWidth=".8" fill="none" opacity=".6" />
      </g>
      <ellipse cx="50" cy="48" rx="2.6" ry="16" fill="#5a3d14" />
      <path d="M49 33 C 46 24, 42 20, 38 18 M51 33 C 54 24, 58 20, 62 18" stroke="#5a3d14" strokeWidth="1" fill="none" />
    </svg>
  );
}
