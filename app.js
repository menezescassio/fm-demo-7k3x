/* First Monday prototype interactivity.
   No framework: plain DOM. Runs from any static server. */

// ---------- Screen switching ----------
const screens = document.querySelectorAll(".screen");
const navBtns = document.querySelectorAll(".switcher button");
// Which product-nav section each screen lives in (rail is product chrome).
const NAV_FOR = { s1: "tasks", s2: "tasks", s3: "briefs" };
function go(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.go === id));
  document.querySelectorAll(".nav-item").forEach(a => a.classList.toggle("on", a.dataset.nav === NAV_FOR[id]));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-go]").forEach(el => el.addEventListener("click", () => go(el.dataset.go)));

// ---------- S1: role -> starter tasks ----------
// Tasks are curated toward reliable extraction-style work (sources shown),
// the task type the data shows the product does dependably. Each is wired to
// a document already connected to the account.
const TASKS = {
  broker: {
    name: "Broker / Agent",
    items: [
      { tag: "Extract", title: "Summarize upcoming rent reviews across my active leases", desc: "Which of my leases have a review clause firing in the next 90 days, and on what index.", doc: "6 lease PDFs", pg: "clauses 5-7", primary: true },
      { tag: "Draft", title: "Build a one-page brief for my Tuesday viewing", desc: "Pull size, price, condo fee and standout clauses for R. Haddock Lobo, 585.", doc: "listing_haddock_585.pdf", pg: "p.1-3" },
      { tag: "Compare", title: "Flag terms that differ from our standard lease", desc: "Compare the Faria Lima draft against the Ferro template and list every deviation.", doc: "template_v4.pdf", pg: "full" },
    ],
  },
  listing: {
    name: "Listing Manager",
    items: [
      { tag: "Extract", title: "Pull every listing missing a condo fee this week", desc: "Scan active listings and return the ones with an empty or stale condo fee field.", doc: "listings_active.csv", pg: "142 rows", primary: true },
      { tag: "Draft", title: "Write portal descriptions for 3 new units", desc: "Generate PT-BR copy grounded only in the spec sheet, no invented amenities.", doc: "specs_new_units.pdf", pg: "p.1-6" },
      { tag: "Check", title: "Find listings whose price contradicts the mandate", desc: "Cross-check listed price against the signed mandate for each unit.", doc: "mandates_2026.pdf", pg: "full" },
    ],
  },
  legal: {
    name: "Contracts & Legal",
    items: [
      { tag: "Extract", title: "List all renewal and exit windows closing this quarter", desc: "Every notice deadline across the active contract set, with the clause it comes from.", doc: "12 contracts", pg: "clauses 9-14", primary: true },
      { tag: "Compare", title: "Show where a draft deviates from our standard clauses", desc: "Redline the Oscar Freire draft against the approved template.", doc: "template_v4.pdf", pg: "full" },
      { tag: "Extract", title: "Summarize the guarantee terms per contract", desc: "Fiança, seguro or caução, per lease, with the exact clause reference.", doc: "12 contracts", pg: "clauses 15" },
    ],
  },
};

const tasksEl = document.getElementById("tasks");
const roleNameEl = document.getElementById("role-name");

function renderTasks(role) {
  const cfg = TASKS[role];
  roleNameEl.textContent = cfg.name;
  tasksEl.innerHTML = "";
  cfg.items.forEach(t => {
    const card = document.createElement("button");
    card.className = "task";
    card.innerHTML = `
      <span class="tag">${t.tag}</span>
      <span class="t-main">
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
      </span>
      <span class="t-side">
        <span class="doc">${t.doc} · <span class="pg">${t.pg}</span></span>
        <span class="run">Run this task →</span>
      </span>`;
    // Each role's card opens the result screen for that role's primary task.
    card.addEventListener("click", () => { renderS2(role); go("s2"); });
    tasksEl.appendChild(card);
  });
}

document.querySelectorAll(".role").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role").forEach(b => b.classList.remove("sel"));
    // Keep the "from your invite" pill only on the broker chip; selection is separate.
    btn.classList.add("sel");
    renderTasks(btn.dataset.role);
  });
});
renderTasks("broker");

// ---------- S1 -> S2: role-appropriate result ----------
// Each role's primary starter task lands on its own result. Broker (rent
// reviews) is the default; listing and legal get their own extraction result.
// Titles/ledes/result-card are swapped; the install moment below is shared.
const s2Title = document.getElementById("s2-title");
const s2Lede = document.getElementById("s2-lede");
const s2Result = document.getElementById("s2-result");

const S2_RESULTS = {
  broker: {
    title: "Your rent-review summary is ready.",
    lede: "Every figure below links to the exact page it came from. Copilot only summarized what your documents say; nothing here is invented.",
    card: `
      <div class="result-head">
        <div class="q">Task: <b>Summarize upcoming rent reviews across my active leases</b></div>
        <div class="ok">✓ Done in about 2 min</div>
      </div>
      <div class="result-body">
        <p>Three of your six active commercial leases have a rent review clause triggering in the next 90 days. Two are index-linked (IGP-M), one is a fixed 8% step.</p>
        <div class="rows">
          <div class="row"><div class="k">Av. Paulista, 1842 · Unit 12</div><div class="v">Review 14 Aug · IGP-M + 0% floor <span class="cite" title="Source: lease_paulista_1842.pdf, clause 7.2">lease_paulista_1842.pdf · p.9</span></div></div>
          <div class="row"><div class="k">R. Oscar Freire, 300</div><div class="v">Review 02 Sep · fixed +8% <span class="cite" title="Source: lease_oscarfreire_300.pdf, clause 5.1">lease_oscarfreire_300.pdf · p.4</span></div></div>
          <div class="row"><div class="k">Faria Lima, 4055 · Floor 7</div><div class="v">Review 28 Sep · IGP-M + 0% floor <span class="cite" title="Source: lease_farialima_4055.pdf, clause 7.2">lease_farialima_4055.pdf · p.11</span></div></div>
        </div>
      </div>
      <div class="sources">
        <h4>Sources · 3 documents cited</h4>
        <ol>
          <li><b>lease_paulista_1842.pdf</b>, clause 7.2 (Reajuste), page 9</li>
          <li><b>lease_oscarfreire_300.pdf</b>, clause 5.1 (Correção monetária), page 4</li>
          <li><b>lease_farialima_4055.pdf</b>, clause 7.2 (Reajuste), page 11</li>
        </ol>
      </div>`,
  },
  listing: {
    title: "Your condo-fee gap list is ready.",
    lede: "Every listing below links to the row it came from. Copilot only flagged what your data shows; nothing here is invented.",
    card: `
      <div class="result-head">
        <div class="q">Task: <b>Pull every listing missing a condo fee this week</b></div>
        <div class="ok">✓ Done in about 90s</div>
      </div>
      <div class="result-body">
        <p>Of 142 active listings, three are missing a condo fee and two more carry a stale value from before this year. Portals de-rank listings without it.</p>
        <div class="rows">
          <div class="row"><div class="k">R. Haddock Lobo, 585 · Apto 72</div><div class="v">Condo fee field empty <span class="cite" title="Source: listings_active.csv, row 14">listings_active.csv · row 14</span></div></div>
          <div class="row"><div class="k">Av. Rebouças, 3970 · Sala 21</div><div class="v">Condo fee field empty <span class="cite" title="Source: listings_active.csv, row 66">listings_active.csv · row 66</span></div></div>
          <div class="row"><div class="k">R. Augusta, 1508 · Loja 3</div><div class="v">Stale fee from 2024 <span class="cite" title="Source: listings_active.csv, row 91">listings_active.csv · row 91</span></div></div>
        </div>
      </div>
      <div class="sources">
        <h4>Sources · 1 file cited</h4>
        <ol>
          <li><b>listings_active.csv</b>, 142 rows scanned; rows 14, 66 and 91 flagged</li>
        </ol>
      </div>`,
  },
  legal: {
    title: "Your renewal and exit windows are ready.",
    lede: "Every date below links to the exact clause it came from. Copilot only summarized what your contracts say; nothing here is invented.",
    card: `
      <div class="result-head">
        <div class="q">Task: <b>List all renewal and exit windows closing this quarter</b></div>
        <div class="ok">✓ Done in about 2 min</div>
      </div>
      <div class="result-body">
        <p>Across your 12 active contracts, three notice windows close this quarter. Miss the date and the term renews automatically.</p>
        <div class="rows">
          <div class="row"><div class="k">Faria Lima, 4055 · Floor 7</div><div class="v">Renewal notice due 30 Aug <span class="cite" title="Source: lease_farialima_4055.pdf, clause 12.1">lease_farialima_4055.pdf · p.14</span></div></div>
          <div class="row"><div class="k">Av. Paulista, 1842 · Unit 12</div><div class="v">Exit window closes 15 Sep <span class="cite" title="Source: lease_paulista_1842.pdf, clause 11.3">lease_paulista_1842.pdf · p.12</span></div></div>
          <div class="row"><div class="k">R. Oscar Freire, 300</div><div class="v">Renewal notice due 28 Sep <span class="cite" title="Source: lease_oscarfreire_300.pdf, clause 9.2">lease_oscarfreire_300.pdf · p.7</span></div></div>
        </div>
      </div>
      <div class="sources">
        <h4>Sources · 3 documents cited</h4>
        <ol>
          <li><b>lease_farialima_4055.pdf</b>, clause 12.1 (Renovação), page 14</li>
          <li><b>lease_paulista_1842.pdf</b>, clause 11.3 (Rescisão), page 12</li>
          <li><b>lease_oscarfreire_300.pdf</b>, clause 9.2 (Renovação), page 7</li>
        </ol>
      </div>`,
  },
};

function renderS2(role) {
  const r = S2_RESULTS[role] || S2_RESULTS.broker;
  s2Title.textContent = r.title;
  s2Lede.textContent = r.lede;
  s2Result.innerHTML = r.card;
}

// ---------- S2: install moment ----------
// The install button turns the just-finished task into a recurring weekly job.
const install = document.getElementById("install");
const installBtn = document.getElementById("install-btn");
installBtn.addEventListener("click", () => {
  install.classList.add("done");
  install.innerHTML = `
    <div class="check">✓</div>
    <div class="txt">
      <h3>Installed. Your first brief lands Monday at 8:00.</h3>
      <p>You just turned a one-off task into a standing deliverable. This is the whole idea: value that returns without you asking. See it in the Monday recap tab.</p>
    </div>`;
});

// ---------- S3: recap, live vs dormant ----------
const recap = document.getElementById("recap");
const recapFoot = document.getElementById("recap-foot");

const RECAPS = {
  live: `
    <div class="email">
      <div class="email-head">
        <div class="from"><b>Shift Copilot</b> · monday@shiftcopilot.com → you</div>
        <div class="subj">Your Monday brief: 2 leases changed this week</div>
      </div>
      <div class="email-banner live">● Weekly brief · running since you installed it 3 weeks ago</div>
      <div class="email-body">
        <p>Good morning. Copilot re-ran your rent-review brief. Two leases moved since last Monday, both cited below.</p>
        <div class="deliverable">
          <h4>Rent reviews: what changed</h4>
          <div class="meta">Grounded in 6 lease PDFs · clauses 5-7</div>
          <ul>
            <li><b>Av. Paulista, 1842:</b> IGP-M for August published at +4.1%, review confirmed for 14 Aug <span class="cite">lease_paulista_1842.pdf · p.9</span></li>
            <li><b>R. Oscar Freire, 300:</b> tenant sent a renegotiation notice Friday, deadline to respond is 09 Sep <span class="cite">notice_oscarfreire.pdf · p.1</span></li>
          </ul>
        </div>
        <div class="stat-strip">
          <div class="stat"><div class="num">4</div><div class="lbl">briefs this month</div></div>
          <div class="stat"><div class="num green">~3 h</div><div class="lbl">saved so far</div></div>
          <div class="stat"><div class="num">12</div><div class="lbl">clauses checked</div></div>
        </div>
        <div class="next-task">
          <div class="t"><b>One thing to try next</b>Draft the Oscar Freire response letter from the notice and your template.</div>
          <button>Run it now</button>
        </div>
      </div>
    </div>`,

  dormant: `
    <div class="email">
      <div class="email-head">
        <div class="from"><b>Shift Copilot</b> · monday@shiftcopilot.com → you</div>
        <div class="subj">Here is what Copilot would have prepared for you this week</div>
      </div>
      <div class="email-banner dormant">● You haven't opened Copilot in 5 weeks · this brief ran anyway</div>
      <div class="email-body">
        <p>We noticed you stepped away. Rather than nudge you, we did the work. Here is the brief you would have gotten on your own files this morning.</p>
        <div class="deliverable locked">
          <h4>Rent reviews: 2 need attention this week</h4>
          <div class="meta">Grounded in your 6 connected lease PDFs</div>
          <ul class="veil">
            <li><b>Av. Paulista, 1842:</b> IGP-M published, review confirmed for 14 Aug, action needed <span class="cite">p.9</span></li>
            <li><b>R. Oscar Freire, 300:</b> tenant renegotiation notice received Friday, response due 09 Sep <span class="cite">p.1</span></li>
          </ul>
        </div>
        <div class="reactivate">
          <div class="t"><b>2 deadlines are inside your response window.</b> Open the full brief with sources. Nothing was deleted while you were gone.</div>
          <button>Show me the full brief</button>
        </div>
      </div>
    </div>`,
};

function renderRecap(v) {
  recap.innerHTML = RECAPS[v];
  recapFoot.textContent = v === "live"
    ? "Counter-metric guardrail: if recap opt-out passes 10%, cadence pulls back."
    : "This is the reactivation surface for the 439 churned-but-contracted seats. The deliverable is real; only the reveal is gated on a click.";
}
document.querySelectorAll("#variant button").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#variant button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    renderRecap(b.dataset.var);
  });
});
renderRecap("live");

// ---------- Optional deep-link state via URL params ----------
// Lets a link open a specific screen/role/variant, e.g.
// ?screen=s2&installed=1  or  ?screen=s3&var=dormant  or  ?screen=s1&role=legal
(function applyUrlState() {
  const p = new URLSearchParams(location.search);
  const role = p.get("role");
  if (role && TASKS[role]) {
    document.querySelectorAll(".role").forEach(b => b.classList.toggle("sel", b.dataset.role === role));
    renderTasks(role);
    renderS2(role);
  }
  if (p.get("installed") === "1") installBtn.click();
  const v = p.get("var");
  if (v && RECAPS[v]) {
    document.querySelectorAll("#variant button").forEach(x => x.classList.toggle("on", x.dataset.var === v));
    renderRecap(v);
  }
  const screen = p.get("screen");
  if (screen) go(screen);
})();
