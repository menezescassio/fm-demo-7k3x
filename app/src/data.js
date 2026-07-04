// All prototype copy, numbers, and citations — carried over VERBATIM from the
// original artifacts/prototype/app.js. Only the shape changed (HTML strings →
// structured data) so Astryx components can render it; no wording was altered.

// Which product-nav section each screen lives in (rail is product chrome).
export const NAV_FOR = { s1: 'tasks', s2: 'tasks', s3: 'briefs' };

export const WORKSPACE = { name: 'Ferro Imóveis', meta: '8 docs connected' };

export const CONNECTED_FILES = [
  'lease_paulista_1842.pdf',
  'lease_oscarfreire_300.pdf',
  'lease_farialima_4055.pdf',
  'listing_haddock_585.pdf',
  'listings_active.csv',
  'mandates_2026.pdf',
  'specs_new_units.pdf',
  'template_v4.pdf',
];

export const ROLES = [
  { id: 'broker', label: 'Broker / Agent', fromInvite: true },
  { id: 'listing', label: 'Listing Manager' },
  { id: 'legal', label: 'Contracts & Legal' },
];

// ---------- S1: role -> starter tasks ----------
export const TASKS = {
  broker: {
    name: 'Broker / Agent',
    items: [
      { tag: 'Extract', title: 'Summarize upcoming rent reviews across my active leases', desc: 'Which of my leases have a review clause firing in the next 90 days, and on what index.', doc: '6 lease PDFs', pg: 'clauses 5-7', primary: true },
      { tag: 'Draft', title: 'Build a one-page brief for my Tuesday viewing', desc: 'Pull size, price, condo fee and standout clauses for R. Haddock Lobo, 585.', doc: 'listing_haddock_585.pdf', pg: 'p.1-3' },
      { tag: 'Compare', title: 'Flag terms that differ from our standard lease', desc: 'Compare the Faria Lima draft against the Ferro template and list every deviation.', doc: 'template_v4.pdf', pg: 'full' },
    ],
  },
  listing: {
    name: 'Listing Manager',
    items: [
      { tag: 'Extract', title: 'Pull every listing missing a condo fee this week', desc: 'Scan active listings and return the ones with an empty or stale condo fee field.', doc: 'listings_active.csv', pg: '142 rows', primary: true },
      { tag: 'Draft', title: 'Write portal descriptions for 3 new units', desc: 'Generate PT-BR copy grounded only in the spec sheet, no invented amenities.', doc: 'specs_new_units.pdf', pg: 'p.1-6' },
      { tag: 'Check', title: 'Find listings whose price contradicts the mandate', desc: 'Cross-check listed price against the signed mandate for each unit.', doc: 'mandates_2026.pdf', pg: 'full' },
    ],
  },
  legal: {
    name: 'Contracts & Legal',
    items: [
      { tag: 'Extract', title: 'List all renewal and exit windows closing this quarter', desc: 'Every notice deadline across the active contract set, with the clause it comes from.', doc: '12 contracts', pg: 'clauses 9-14', primary: true },
      { tag: 'Compare', title: 'Show where a draft deviates from our standard clauses', desc: 'Redline the Oscar Freire draft against the approved template.', doc: 'template_v4.pdf', pg: 'full' },
      { tag: 'Extract', title: 'Summarize the guarantee terms per contract', desc: 'Fiança, seguro or caução, per lease, with the exact clause reference.', doc: '12 contracts', pg: 'clauses 15' },
    ],
  },
};

// ---------- S1 -> S2: role-appropriate result ----------
// `rows` each: { k, v, cite: { text, title } }  (title = hover tooltip)
// `sources` each: { file, detail }
export const S2_RESULTS = {
  broker: {
    title: 'Your rent-review summary is ready.',
    lede: 'Every figure below links to the exact page it came from. Copilot only summarized what your documents say; nothing here is invented.',
    task: 'Summarize upcoming rent reviews across my active leases',
    ok: '✓ Done in about 2 min',
    summary: 'Three of your six active commercial leases have a rent review clause triggering in the next 90 days. Two are index-linked (IGP-M), one is a fixed 8% step.',
    rows: [
      { k: 'Av. Paulista, 1842 · Unit 12', v: 'Review 14 Aug · IGP-M + 0% floor', cite: { text: 'lease_paulista_1842.pdf · p.9', title: 'Source: lease_paulista_1842.pdf, clause 7.2' } },
      { k: 'R. Oscar Freire, 300', v: 'Review 02 Sep · fixed +8%', cite: { text: 'lease_oscarfreire_300.pdf · p.4', title: 'Source: lease_oscarfreire_300.pdf, clause 5.1' } },
      { k: 'Faria Lima, 4055 · Floor 7', v: 'Review 28 Sep · IGP-M + 0% floor', cite: { text: 'lease_farialima_4055.pdf · p.11', title: 'Source: lease_farialima_4055.pdf, clause 7.2' } },
    ],
    sourcesHead: 'Sources · 3 documents cited',
    sources: [
      { file: 'lease_paulista_1842.pdf', detail: ', clause 7.2 (Reajuste), page 9' },
      { file: 'lease_oscarfreire_300.pdf', detail: ', clause 5.1 (Correção monetária), page 4' },
      { file: 'lease_farialima_4055.pdf', detail: ', clause 7.2 (Reajuste), page 11' },
    ],
  },
  listing: {
    title: 'Your condo-fee gap list is ready.',
    lede: 'Every listing below links to the row it came from. Copilot only flagged what your data shows; nothing here is invented.',
    task: 'Pull every listing missing a condo fee this week',
    ok: '✓ Done in about 90s',
    summary: 'Of 142 active listings, three are missing a condo fee and two more carry a stale value from before this year. Portals de-rank listings without it.',
    rows: [
      { k: 'R. Haddock Lobo, 585 · Apto 72', v: 'Condo fee field empty', cite: { text: 'listings_active.csv · row 14', title: 'Source: listings_active.csv, row 14' } },
      { k: 'Av. Rebouças, 3970 · Sala 21', v: 'Condo fee field empty', cite: { text: 'listings_active.csv · row 66', title: 'Source: listings_active.csv, row 66' } },
      { k: 'R. Augusta, 1508 · Loja 3', v: 'Stale fee from 2024', cite: { text: 'listings_active.csv · row 91', title: 'Source: listings_active.csv, row 91' } },
    ],
    sourcesHead: 'Sources · 1 file cited',
    sources: [
      { file: 'listings_active.csv', detail: ', 142 rows scanned; rows 14, 66 and 91 flagged' },
    ],
  },
  legal: {
    title: 'Your renewal and exit windows are ready.',
    lede: 'Every date below links to the exact clause it came from. Copilot only summarized what your contracts say; nothing here is invented.',
    task: 'List all renewal and exit windows closing this quarter',
    ok: '✓ Done in about 2 min',
    summary: 'Across your 12 active contracts, three notice windows close this quarter. Miss the date and the term renews automatically.',
    rows: [
      { k: 'Faria Lima, 4055 · Floor 7', v: 'Renewal notice due 30 Aug', cite: { text: 'lease_farialima_4055.pdf · p.14', title: 'Source: lease_farialima_4055.pdf, clause 12.1' } },
      { k: 'Av. Paulista, 1842 · Unit 12', v: 'Exit window closes 15 Sep', cite: { text: 'lease_paulista_1842.pdf · p.12', title: 'Source: lease_paulista_1842.pdf, clause 11.3' } },
      { k: 'R. Oscar Freire, 300', v: 'Renewal notice due 28 Sep', cite: { text: 'lease_oscarfreire_300.pdf · p.7', title: 'Source: lease_oscarfreire_300.pdf, clause 9.2' } },
    ],
    sourcesHead: 'Sources · 3 documents cited',
    sources: [
      { file: 'lease_farialima_4055.pdf', detail: ', clause 12.1 (Renovação), page 14' },
      { file: 'lease_paulista_1842.pdf', detail: ', clause 11.3 (Rescisão), page 12' },
      { file: 'lease_oscarfreire_300.pdf', detail: ', clause 9.2 (Renovação), page 7' },
    ],
  },
};

// ---------- S2: install moment ----------
export const INSTALL = {
  title: 'Make this my Monday morning brief',
  body: 'Copilot will re-run this every Monday at 8:00 and send you the leases that changed, before you have to ask. One click, cancel anytime.',
  button: 'Install weekly brief',
  doneTitle: 'Installed. Your first brief lands Monday at 8:00.',
  doneBody: 'You just turned a one-off task into a standing deliverable. This is the whole idea: value that returns without you asking. See it in the Monday recap tab.',
};

// ---------- S3: recap, live vs dormant ----------
export const RECAPS = {
  live: {
    from: { name: 'Shift Copilot', addr: '· monday@shiftcopilot.com → you' },
    subject: 'Your Monday brief: 2 leases changed this week',
    bannerStatus: 'success',
    banner: '● Weekly brief · running since you installed it 3 weeks ago',
    intro: 'Good morning. Copilot re-ran your rent-review brief. Two leases moved since last Monday, both cited below.',
    deliverable: {
      title: 'Rent reviews: what changed',
      meta: 'Grounded in 6 lease PDFs · clauses 5-7',
      items: [
        { html: [{ b: 'Av. Paulista, 1842:' }, { t: ' IGP-M for August published at +4.1%, review confirmed for 14 Aug ' }], cite: 'lease_paulista_1842.pdf · p.9' },
        { html: [{ b: 'R. Oscar Freire, 300:' }, { t: ' tenant sent a renegotiation notice Friday, deadline to respond is 09 Sep ' }], cite: 'notice_oscarfreire.pdf · p.1' },
      ],
    },
    stats: [
      { num: '4', lbl: 'briefs this month', accent: false },
      { num: '~3 h', lbl: 'saved so far', accent: true },
      { num: '12', lbl: 'clauses checked', accent: false },
    ],
    cta: { kind: 'next', title: 'One thing to try next', text: 'Draft the Oscar Freire response letter from the notice and your template.', button: 'Run it now' },
    foot: 'Counter-metric guardrail: if recap opt-out passes 10%, cadence pulls back.',
  },
  dormant: {
    from: { name: 'Shift Copilot', addr: '· monday@shiftcopilot.com → you' },
    subject: 'Here is what Copilot would have prepared for you this week',
    bannerStatus: 'warning',
    banner: "● You haven't opened Copilot in 5 weeks · this brief ran anyway",
    intro: 'We noticed you stepped away. Rather than nudge you, we did the work. Here is the brief you would have gotten on your own files this morning.',
    deliverable: {
      locked: true,
      title: 'Rent reviews: 2 need attention this week',
      meta: 'Grounded in your 6 connected lease PDFs',
      items: [
        { html: [{ b: 'Av. Paulista, 1842:' }, { t: ' IGP-M published, review confirmed for 14 Aug, action needed ' }], cite: 'p.9' },
        { html: [{ b: 'R. Oscar Freire, 300:' }, { t: ' tenant renegotiation notice received Friday, response due 09 Sep ' }], cite: 'p.1' },
      ],
    },
    cta: { kind: 'reactivate', title: '2 deadlines are inside your response window.', text: ' Open the full brief with sources. Nothing was deleted while you were gone.', button: 'Show me the full brief' },
    foot: 'This is the reactivation surface for the 439 churned-but-contracted seats. The deliverable is real; only the reveal is gated on a click.',
  },
};
