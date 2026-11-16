# aysha-hasan

Nikah invitation website for Roomi Aysha & Hasan.

A one-page, mobile-first wedding invitation: carved-door gate, door-opening transition,
hero, invitation with Quran 30:21, bride, groom, save the date, venue, live countdown
(with confetti at zero), scratch-to-reveal card, balloon pop, flip card, contact, closing dua.

## Preview without installing anything
Open `preview.html` (next to this project) in Chrome or Safari. It is the whole site in one file.

## Run it locally (to edit with live reload)
1. Install Node.js 18 or newer.
2. In this folder:  `npm install`  then  `npm run dev`
3. Open the address it prints (usually http://localhost:5173). Edits appear instantly.
   Use your browser's device toolbar to check phone sizes.

## Editing
- **All text, names, Arabic, date, venue, phone numbers:** `src/config.js` — nothing else needs touching.
- **Photos, door video, music:** see `src/assets/PUT-YOUR-FILES-HERE.txt`.
- **Colours and fonts:** the `:root` block at the top of `src/styles.css`.
- **Section order / removing a section:** the list inside `<main>` in `src/App.jsx`.

## Files
```
src/
  config.js              all wedding details
  App.jsx                page order, music start, scroll lock until the doors open
  styles.css             design tokens, layout, every animation
  components/
    Opening.jsx          gate screen + door transition (video, or coded doors)
    Scene.jsx            coded archway, doors, lanterns, arch backdrop
    Hero.jsx             hero art/image, butterflies, scroll button
    Sections.jsx         invitation, bride/groom, date, venue, contact, closing
    Countdown.jsx        live countdown + confetti
    ScratchCard.jsx      canvas scratch-to-reveal
    Celebrate.jsx        balloon pop + optional couple photo
    Compliments.jsx      3D flip card
    Motion.jsx           scroll reveal, letter reveal, typewriter
    Ornaments.jsx        dividers, floral sprigs, lantern, butterfly
```

## Building for hosting later
`npm run build` writes a hostable site to `dist/`. `npm run build:single` writes one self-contained HTML file to `dist-single/`.

## Wishes Wall: connect your Google Sheet (about 5 minutes)
Until this is done the Wishes Wall runs in demo mode (wishes stay in the guest's own browser).
1. Create a new Google Sheet (e.g. "Aysha & Hasan Wishes").
2. In the sheet: **Extensions → Apps Script**. Delete what's there and paste in `google-apps-script/wishes.gs`.
3. The Owner View PIN is set on the `OWNER_PIN` line (currently `123456`). Click **Save**.
4. **Deploy → New deployment** → type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Click **Deploy** and allow access.
5. Copy the **Web app URL** (ends in `/exec`) into `wishes.endpoint` in `src/config.js`.

Every wish appears as a new row in the sheet. On the website, tap **🔒 Owner View** and enter your PIN to read them.
If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
