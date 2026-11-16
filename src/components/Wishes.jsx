import { useEffect, useState } from 'react';
import { wedding } from '../config.js';
import { Reveal } from './Motion.jsx';
import { Divider } from './Ornaments.jsx';

/*
 * Wishes Wall.
 * Live mode  (wishes.endpoint set): wishes are saved to the family's Google Sheet through
 *            the Apps Script in /google-apps-script. Owner View asks the script for them
 *            with a PIN; the PIN is checked by the script, never stored in this site.
 * Demo mode  (endpoint ''): wishes are kept in this browser only, so the flow can be tried.
 */
const DEMO_KEY = 'wishes-demo';
const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY)) || []; } catch { return []; } };
const writeDemo = (list) => { try { localStorage.setItem(DEMO_KEY, JSON.stringify(list)); } catch { /* storage blocked */ } };

async function saveWish(endpoint, wish) {
  if (!endpoint) { writeDemo([wish, ...readDemo()]); return; }
  // text/plain keeps this a "simple" request, which Apps Script accepts from any site
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(wish) });
  const data = await res.json().catch(() => ({}));
  if (!data.ok) throw new Error('save failed');
}

// Demo mode only: wishes there live in this one browser, so this PIN just mirrors the
// real one. In live mode the PIN is checked by the Google script, not here.
const DEMO_PIN = '123456';

async function loadWishes(endpoint, pin) {
  if (!endpoint) {
    if (pin !== DEMO_PIN) throw new Error('pin');
    return readDemo();
  }
  const res = await fetch(`${endpoint}?pin=${encodeURIComponent(pin)}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error === 'pin' ? 'pin' : 'load');
  return data.wishes;
}

const fmt = (t) => {
  const d = new Date(t);
  return isNaN(d) ? '' : d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
};

function OwnerView({ onClose }) {
  const { endpoint } = wedding.wishes;
  const [pin, setPin] = useState('');
  const [state, setState] = useState('locked'); // locked | loading | open | error
  const [error, setError] = useState('');
  const [list, setList] = useState([]);

  const open = async (p) => {
    setState('loading'); setError('');
    try { setList(await loadWishes(endpoint, p)); setState('open'); }
    catch (e) { setState('locked'); setError(e.message === 'pin' ? 'Incorrect PIN' : 'Could not load wishes. Please try again.'); }
  };

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="owner-overlay" role="dialog" aria-modal="true" aria-label="Owner view" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="owner-panel">
        <button className="owner-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <p className="label on-dark">Owner View</p>
        <h3 className="name on-dark" style={{ fontSize: 36 }}>Wishes Received</h3>
        <Divider dark />

        {state === 'locked' && (
          <form className="owner-lock" onSubmit={(e) => { e.preventDefault(); if (pin) open(pin); }}>
            <label className="wish-field">
              <span>Enter PIN</span>
              <input type="password" inputMode="numeric" autoComplete="off" value={pin} onChange={(e) => setPin(e.target.value)} autoFocus />
            </label>
            {error && <p className="owner-error">{error}</p>}
            <button className="btn-gold wish-send" type="submit" disabled={!pin}>Unlock</button>
          </form>
        )}

        {state === 'loading' && <p className="body-copy on-dark">Loading wishes…</p>}

        {state === 'open' && (
          <>
            {!endpoint && <p className="owner-note">Demo mode: wishes are saved only in this browser until the Google Sheet is connected.</p>}
            <p className="owner-count">{list.length} {list.length === 1 ? 'wish' : 'wishes'}</p>
            <div className="owner-list">
              {list.length === 0 && <p className="body-copy on-dark">No wishes yet.</p>}
              {list.map((w, i) => (
                <article className="owner-wish" key={i}>
                  <p className="owner-msg">{w.message}</p>
                  <p className="owner-meta"><b>{w.name || 'A guest'}</b>{fmt(w.time) && <> · {fmt(w.time)}</>}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Wishes() {
  const w = wedding.wishes;
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('modal-open', owner);
  }, [owner]);

  const ready = msg.trim().length > 0 && status !== 'sending';

  const send = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus('sending');
    try {
      await saveWish(w.endpoint, { name: name.trim().slice(0, 60), message: msg.trim().slice(0, 500), time: new Date().toISOString() });
      setStatus('sent'); setMsg(''); setName('');
    } catch { setStatus('error'); }
  };

  return (
    <section className="page wood-down wishes">
      <Reveal>
        <p className="label on-dark">{w.label}</p>
        <h2 className="name on-dark" style={{ fontSize: 44 }}>{w.title}</h2>
        <Divider dark />
        <p className="body-copy on-dark wishes-intro">{w.intro}</p>

        <form className="wish-card" onSubmit={send}>
          <div className="wish-chips" role="group" aria-label="Quick blessings">
            {w.quick.map((q) => (
              <button type="button" key={q} className={`wish-chip ${msg === q ? 'on' : ''}`} onClick={() => { setMsg(q); setStatus('idle'); }}>
                {q}
              </button>
            ))}
          </div>
          <label className="wish-field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fathima & family" maxLength={60} />
          </label>
          <label className="wish-field">
            <span>Your wishes</span>
            <textarea value={msg} onChange={(e) => { setMsg(e.target.value); setStatus('idle'); }} rows={4} maxLength={500} placeholder={w.placeholder} />
          </label>
          <button className="btn-gold wish-send" type="submit" disabled={!ready}>
            {status === 'sending' ? 'Sending…' : <>{w.button} <span aria-hidden="true">♥</span></>}
          </button>
          {status === 'sent' && <p className="wish-thanks">{w.thanks}</p>}
          {status === 'error' && <p className="owner-error">Sorry, your wish could not be sent. Please try again.</p>}
          <button type="button" className="owner-pill" onClick={() => setOwner(true)}>🔒 Owner View</button>
        </form>
      </Reveal>
      {owner && <OwnerView onClose={() => setOwner(false)} />}
    </section>
  );
}
