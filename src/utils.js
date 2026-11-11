import { wedding } from './config.js';

export const fill = (s) =>
  s.replaceAll('{bride}', wedding.bride.name).replaceAll('{groom}', wedding.groom.name);

export function dateParts(iso = wedding.event.start) {
  const d = new Date(iso);
  const f = (o) => new Intl.DateTimeFormat('en-GB', { timeZone: wedding.event.timeZone, ...o }).format(d);
  const day = f({ day: 'numeric' });
  const month = f({ month: 'long' });
  const year = f({ year: 'numeric' });
  return { day, month, year, full: `${day} ${month} ${year}` };
}

export function mapsHref(ev) {
  if (/^https?:\/\//i.test(ev.mapsUrl)) return ev.mapsUrl;
  const q = encodeURIComponent(`${ev.placeLines.join(' ')} ${ev.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const telHref = (n) => 'tel:' + n.replace(/[^\d+]/g, '');
export const waHref = (n) => 'https://wa.me/' + n.replace(/\D/g, '');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
