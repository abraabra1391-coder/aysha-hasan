/* =====================================================================
   WEDDING CONFIG — edit everything here. No other file needs changing.
   ===================================================================== */

// Your media files live in src/assets. Import each one here, then use it in `assets` below.
import background from './assets/background.jpg';
import heroBackground from './assets/hero-background.jpg';

export const wedding = {
  /* ---------- the couple ---------- */
  bride: {
    name: 'Roomi Aysha',
    arabicName: 'رومي عائشة',
    relation: 'Daughter of',
    parents: 'Mr Moinudeen Abdul Kader & Mrs Raihanath Beegum (Late)',
    home: 'Koram Kulam House, Karimba, Palakkad',
  },
  groom: {
    name: 'Hasan',
    arabicName: 'حسن',
    relation: 'Son of',
    parents: 'Mr Muhammed Rafi & Mrs Jameela',
    home: 'Jamshiya Mahal, Valiyavalappu, Vatakara',
  },

  /* ---------- date & time ----------
     `start` drives the countdown AND the date shown on every page.
     Keep the +05:30 (India) offset, or change it to your time zone. */
  event: {
    start: '2027-01-13T11:00:00+05:30', // the Nikah — used by the hero, Save the Date and the countdown
    timeZone: 'Asia/Kolkata',
    timeLabel: 'Nikah at 11:00 AM',
  },

  /* ---------- events: each one gets its own venue page, in this order ----------
     time: '' hides the time line. mapsUrl: paste a Google Maps share link,
     or leave '' and the button searches Maps for the place + address. */
  events: [
    {
      title: 'Nikah',
      date: '2027-01-13T11:00:00+05:30',
      time: '11:00 AM',
      placeLines: ['Misbahul Huda', 'Jumma Masjid'],
      address: 'Karimba',
      mapsUrl: '',
    },
    {
      title: 'Wedding',
      date: '2027-01-13T11:00:00+05:30',
      time: '',
      placeLines: ['Krimbalayil', 'Convention Center'],
      address: 'Vazhampuram, Karakurussi, Mannarkad',
      mapsUrl: '',
    },
    {
      title: 'Reception',
      date: '2027-01-14T11:00:00+05:30',
      time: '11:00 AM onwards',
      placeLines: ['Shadi Mahal', 'Auditorium'],
      address: 'Vatakara',
      mapsUrl: '',
    },
  ],

  /* ---------- Arabic & Islamic text ---------- */
  arabic: {
    salaam: 'السلام عليكم ورحمة الله وبركاته',
    welcome: 'أهلاً وسهلاً',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    closingDua: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  },

  /* ---------- wording on each page ---------- */
  text: {
    openButton: 'Open Invitation',
    heroLead: 'To the wedding of',
    tagline: 'Together in faith, towards forever.',

    invitationHeading: 'Together With Their Families',
    // {bride} and {groom} are replaced with the names above
    invitationMessage:
      'With the blessings of Allah and their families, {bride} & {groom} joyfully invite you to celebrate the beginning of their new journey together.',
    verse:
      '“And of His signs is that He created for you spouses from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”',
    verseRef: 'Quran 30:21',

    saveTheDate: 'Save the Date',
    mapButton: 'View Location',

    countdownLabel: 'Counting Down To',
    countdownTitle: 'Our Wedding Day',

    scratchLabel: 'A Little Surprise',
    scratchTitle: 'Scratch to Reveal',
    scratchMessage: 'Your presence will make our celebration even more special.',
    scratchHint: 'Scratch the gold surface',

    celebrateLabel: 'Celebrate With Us',
    celebrateHint: 'Tap the balloons',

    complimentsLabel: 'With Compliments',
    complimentsFront: 'Tap to Reveal',
    complimentsBack: ['With Love', 'From Our Families'], // one entry per line
    complimentsHint: 'Tap the card',
  },

  /* ---------- contact page (hidden while phones and whatsapp are both empty) ---------- */
  contact: {
    heading: 'Contact Us',
    message: 'For any emergency, please reach out',
    phones: [], // e.g. ['+91 98765 43210']
    whatsapp: '', // '' hides the WhatsApp button
  },

  /* ---------- media ----------
     Put files in src/assets, import them at the top of this file, and use the
     imported name here (e.g. hero: hero). Any slot left '' uses the coded artwork. */
  assets: {
    poster: '',      // closed-door still, portrait 9:16 (first frame of the video)
    doorVideo: '',   // doors-opening video, portrait 9:16, ending on the hero frame
    hero: '',        // full invitation artwork with text baked in, portrait 9:16 (overrides the next line)
    heroBackground,  // hero backdrop; the invitation text is written on top of it in gold
    background,      // backdrop for bride / groom / venue pages + desktop backdrop
    backgroundTone: 'dark', // 'dark' = light text on it, 'light' = dark text on it
    butterfly: '',   // transparent PNG
    song: '',        // background music (mp3)
    couplePhoto: '', // optional photo on the "Celebrate With Us" page
  },

  /* ---------- opening screen ----------
     showGate: false skips the opening screen entirely (music then starts on the first tap anywhere).
     doorAnimation: true brings back the carved wooden doors swinging open. */
  opening: {
    showGate: true,
    doorAnimation: false,
  },

  /* ---------- browser tab & link preview ---------- */
  meta: {
    title: '{bride} & {groom} — Wedding Invitation',
  },
};
