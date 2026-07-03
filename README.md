# First Monday: prototype

The retention intervention for Shift Copilot's self-serve (Mid-Market + SMB) seats. Not a clone of the copilot: this is the activation-to-habit loop that CSMs run by hand for Enterprise, productized for every seat.

## Run it (one command)

```bash
cd artifacts/prototype && python3 -m http.server 8000
```

Then open http://localhost:8000

No build step, no dependencies. Plain HTML/CSS/JS.

## The three screens

- **S1, First session.** The blank box is replaced. The seat inherits its role from the invite (or picks one), and gets 3 starter tasks scoped to that role and to real estate, each wired to a document already connected to the account. Curated toward reliable extraction tasks with sources.
- **S2, Result + install.** A real result on the account's own leases, every figure citing the exact page. The close is the core mechanic: **"Make this my Monday morning brief"** turns the one-off task into a standing weekly job. That click is Assumption 1 (session-1 install) and it feeds Assumption 2 (the recap that lifts week-8 retention of activated seats).
- **S3, Monday recap.** The installed job runs itself. Toggle to the **dormant seat** critical state: the recap that reaches a lapsed seat with a finished deliverable ("here is what Copilot would have prepared for you this week"), the reactivation lever for the 439 churned-but-contracted seats.

See `../design_doc.md` for the assumptions designed against and the key design choices.
