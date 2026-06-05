// Simple CSV parser supporting quoted fields and escaped quotes
// Returns { headers: string[], rows: string[][] }
export function parseCsvText(text: string) {
  const rows: string[][] = [];
  let i = 0;
  const len = text.length;

  let cur: string[] = [];
  let cell = '';
  let inQuotes = false;

  while (i < len) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        // Could be escaped ""
        if (i + 1 < len && text[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      // normal char inside quotes
      cell += ch;
      i += 1;
      continue;
    }

    // not in quotes
    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (ch === ',') {
      cur.push(cell);
      cell = '';
      i += 1;
      continue;
    }

    if (ch === '\n' || ch === '\r') {
      // handle CRLF or LF
      // if CRLF, skip the LF after CR
      // push current cell and row
      // But ignore isolated CR (older Mac)
      // accumulate until end of line
      // skip over any additional \r or \n
      // finish cell
      cur.push(cell);
      cell = '';
      rows.push(cur);
      cur = [];

      // consume consecutive CR/LF
      let j = i;
      while (j < len && (text[j] === '\r' || text[j] === '\n')) j++;
      i = j;
      continue;
    }

    // normal char
    cell += ch;
    i += 1;
  }

  // push last cell/row if any
  if (inQuotes) {
    // Unterminated quoted field; still push what we have
  }
  if (cell !== '' || cur.length > 0) {
    cur.push(cell);
    rows.push(cur);
  }

  const headers = rows.length > 0 ? rows[0].map((h) => h.trim()) : [];
  const dataRows = rows.length > 1 ? rows.slice(1) : [];

  return { headers, rows: dataRows };
}
