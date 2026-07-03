/* First Monday prototype interactivity.
   No framework: plain DOM. Runs from any static server. */

// ---------- Screen switching ----------
const screens = document.querySelectorAll(".screen");
const navBtns = document.querySelectorAll(".switcher button");
function go(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.go === id));
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
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <div class="doc">📄 <span>${t.doc}</span> · <span class="pg">${t.pg}</span></div>
      <div class="run">Run this task →</div>`;
    // The primary extraction task leads into the S2 result we built.
    card.addEventListener("click", () => go("s2"));
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

// ---------- S2: install moment ----------
// This click is Assumption 1 made real (a seat installs a recurring job in
// session 1) and it feeds Assumption 2 (the recap that lifts W8|FV7).
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
          <div class="stat"><div class="num">6</div><div class="lbl">briefs delivered</div></div>
          <div class="stat"><div class="num green">3.4 h</div><div class="lbl">time saved to date</div></div>
          <div class="stat"><div class="num">18</div><div class="lbl">clauses checked</div></div>
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

// ---------- Deterministic initial state via URL params (for screenshots) ----------
// e.g. ?screen=s2&installed=1  or  ?screen=s3&var=dormant  or  ?screen=s1&role=legal
(function applyUrlState() {
  const p = new URLSearchParams(location.search);
  const role = p.get("role");
  if (role && TASKS[role]) {
    document.querySelectorAll(".role").forEach(b => b.classList.toggle("sel", b.dataset.role === role));
    renderTasks(role);
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
