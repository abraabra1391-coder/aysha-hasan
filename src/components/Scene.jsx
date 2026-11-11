import { Lantern } from './Ornaments.jsx';

/**
 * The stone archway scene shared by the door gate and the hero:
 * warm wall, side tapestries, carpet floor, hanging lanterns.
 * Whatever is passed as children fills the arch.
 */
export function Scene({ children, className = '' }) {
  return (
    <div className={`scene ${className}`}>
      <div className="scene-wall" />
      <div className="scene-rays" />
      <div className="scene-tapestry carpet l" />
      <div className="scene-tapestry carpet r" />
      <div className="scene-floor carpet" />
      <div className="scene-arch">
        <div className="scene-arch-inner">{children}</div>
      </div>
      <Lantern className="scene-lantern hang-l" chain={44} />
      <Lantern className="scene-lantern hang-r" chain={44} />
      <Lantern className="scene-lantern floor-l" chain={0} />
      <div className="scene-urn" />
      <div className="scene-vignette" />
    </div>
  );
}

/** Two carved wooden door leaves that swing inward when `open` is true. */
export function Doors({ open }) {
  return (
    <div className={`doors ${open ? 'open' : ''}`}>
      <div className="door-light" />
      {['l', 'r'].map((s) => (
        <div key={s} className={`door-leaf ${s}`}>
          <div className="door-panel top" />
          <div className="door-panel bottom" />
          <div className="door-knocker"><span /></div>
        </div>
      ))}
    </div>
  );
}

/** Cream arch backdrop on red carpets with woven baskets (stand-in for background.png). */
export function ArchBackdrop({ mirrored = false }) {
  return (
    <div className={`backdrop carpet ${mirrored ? 'mirrored' : ''}`}>
      <div className="backdrop-arch" />
      <Lantern className="backdrop-lantern a" chain={20} />
      <Lantern className="backdrop-lantern b" chain={60} />
      <div className="basket b1" />
      <div className="basket b2" />
      <div className="basket b3" />
      <div className="basket b4" />
    </div>
  );
}
