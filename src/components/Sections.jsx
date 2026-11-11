import { wedding } from '../config.js';
import { dateParts, fill, mapsHref, telHref, waHref } from '../utils.js';
import { Reveal, Letters, Typewriter } from './Motion.jsx';
import { Divider, Floral } from './Ornaments.jsx';
import { ArchBackdrop } from './Scene.jsx';

/** Background art layer: the configured image, or the coded arch backdrop. */
function PageBg({ mirrored = false, style }) {
  const src = wedding.assets.background;
  return src ? (
    <div className="page-bg" style={{ backgroundImage: `url('${src}')`, transform: mirrored ? 'scaleX(-1)' : undefined, ...style }} />
  ) : (
    <div className="page-bg" style={style}><ArchBackdrop mirrored={mirrored} /></div>
  );
}

export function Invitation() {
  const { arabic, text } = wedding;
  return (
    <section className="page cream-down">
      <Floral side="left" style={{ top: 18 }} />
      <Floral side="right" style={{ bottom: 18 }} />
      <Reveal>
        <p className="eyebrow-ar" lang="ar" dir="rtl">{arabic.bismillah}</p>
        <Divider />
        <h2 className="name" style={{ fontSize: 30 }}>{text.invitationHeading}</h2>
        <Typewriter className="body-copy" text={fill(text.invitationMessage)} />
        <Divider />
        <p className="verse">{text.verse}</p>
        <p className="verse-ref">{text.verseRef}</p>
      </Reveal>
    </section>
  );
}

const darkBg = () => wedding.assets.background && wedding.assets.backgroundTone === 'dark';

export function Person({ who }) {
  const p = wedding[who];
  const isGroom = who === 'groom';
  return (
    <section className={`page person ${darkBg() ? 'on-dark-bg' : ''}`}>
      <PageBg mirrored={isGroom} />
      <Floral side={isGroom ? 'left' : 'right'} style={{ top: '30%' }} strong />
      <Floral side={isGroom ? 'right' : 'left'} style={{ bottom: '26%' }} strong />
      <Reveal className="text-veil">
        <p className="label">{isGroom ? 'The Groom' : 'The Bride'}</p>
        <Letters className="name" text={p.name} />
        <Divider />
        <p className="sub" style={{ marginBottom: 4 }}>{p.relation}</p>
        <p className="fam-parents">{p.parents}</p>
        {p.home && <p className="fam-home">{p.home}</p>}
      </Reveal>
    </section>
  );
}

export function SaveTheDate() {
  const d = dateParts();
  return (
    <section className="page cream-up">
      <Reveal>
        <p className="label">{wedding.text.saveTheDate}</p>
        <div className="date-num">{d.day}</div>
        <div className="date-month">{d.month}</div>
        <div className="date-year">{d.year}</div>
        <Divider />
        <p className="date-time">{wedding.event.timeLabel}</p>
      </Reveal>
    </section>
  );
}

export function Venue({ ev, mirrored = false }) {
  const d = dateParts(ev.date);
  return (
    <section className="page">
      <PageBg mirrored={mirrored} style={{ filter: darkBg() ? 'brightness(.8)' : 'saturate(.85) brightness(.4)' }} />
      <div className="page-bg" style={{ background: darkBg()
        ? 'linear-gradient(180deg, rgba(36,10,12,.15), rgba(30,10,8,.55))'
        : 'linear-gradient(180deg, rgba(61,12,21,.55), rgba(36,18,9,.78))' }} />
      <Reveal>
        <p className="label on-dark">{ev.title}</p>
        <h2 className="name on-dark" style={{ fontSize: 44 }}>
          {ev.placeLines.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}
        </h2>
        <Divider dark />
        <p className="body-copy on-dark">
          {ev.address}<br />{d.full}{ev.time && <><br />{ev.time}</>}
        </p>
        <a className="btn-gold" href={mapsHref(ev)} target="_blank" rel="noopener noreferrer">{wedding.text.mapButton}</a>
      </Reveal>
    </section>
  );
}

const WaIcon = ({ size = 17, fill = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />
  </svg>
);

export function Contact() {
  const c = wedding.contact;
  if (!c.phones.length && !c.whatsapp) return null;
  return (
    <section className="page burgundy-down">
      <Reveal>
        <h2 className="name on-dark contact-title"><WaIcon size={34} fill="#25D366" />{c.heading}</h2>
        <Divider dark />
        <p className="body-copy on-dark" style={{ marginBottom: 28 }}>{c.message}</p>
        {c.phones.map((n) => (
          <a key={n} className="btn-gold btn-block" href={telHref(n)}>📞 {n}</a>
        ))}
        {c.whatsapp && (
          <div style={{ marginTop: 32 }}>
            <a className="btn-wa" href={waHref(c.whatsapp)} target="_blank" rel="noopener noreferrer">
              <WaIcon /> WhatsApp
            </a>
          </div>
        )}
      </Reveal>
    </section>
  );
}

export function Closing() {
  const { arabic, bride, groom, event, text } = wedding;
  const d = dateParts();
  return (
    <section className="page closing">
      <Reveal>
        <p className="closing-dua" lang="ar" dir="rtl">{arabic.closingDua}</p>
        <Divider dark />
        <h2 className="name" style={{ fontSize: 52 }}>{bride.name}</h2>
        <p className="sub" style={{ fontSize: 22, margin: '2px 0' }}>&amp;</p>
        <h2 className="name" style={{ fontSize: 52 }}>{groom.name}</h2>
        <Divider dark />
        <p className="sub" style={{ marginBottom: 4 }}>{d.full}</p>
        <p className="sub">{event.timeLabel}</p>
        <Typewriter className="body-copy on-dark closing-tagline" text={text.tagline} />
      </Reveal>
    </section>
  );
}
