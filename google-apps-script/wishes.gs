/**
 * Wishes Wall backend — paste this into a Google Sheet's Apps Script (see README).
 * Guests' wishes are added as rows to the "Wishes" sheet.
 * Owner View on the website asks for them with the PIN below.
 */
const OWNER_PIN = '123456'; // ← the Owner View PIN; change it here if you want a different one

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Wishes');
  if (!sh) {
    sh = ss.insertSheet('Wishes');
    sh.appendRow(['Time', 'Name', 'Wish']);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Stops a wish that starts with = + - @ from running as a spreadsheet formula
function clean_(v, max) {
  const s = String(v || '').slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const message = clean_(d.message, 500).trim();
    if (!message) return json_({ ok: false, error: 'empty' });
    sheet_().appendRow([new Date(), clean_(d.name, 60), message]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }
}

function doGet(e) {
  if (!e.parameter.pin || e.parameter.pin !== OWNER_PIN) return json_({ ok: false, error: 'pin' });
  const rows = sheet_().getDataRange().getValues().slice(1);
  const wishes = rows
    .filter(r => r[2])
    .map(r => ({ time: r[0] instanceof Date ? r[0].toISOString() : r[0], name: String(r[1]).replace(/^'/, ''), message: String(r[2]).replace(/^'/, '') }))
    .reverse();
  return json_({ ok: true, wishes });
}
