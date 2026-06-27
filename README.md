# AI Engineering — Learning Dashboard

A single-file, self-contained dashboard to track your progress through the
[**AI Engineering from Scratch**](https://github.com/rohitg00/ai-engineering-from-scratch)
curriculum — 503 lessons across 20 phases (~320 hours) — all the way to a Phase 19 capstone project.

![phases](https://img.shields.io/badge/phases-20-5E81AC) ![lessons](https://img.shields.io/badge/lessons-503-A3BE8C) ![license](https://img.shields.io/badge/license-MIT-D08770)

## What it does

- **Recommended path** — a 5-step route (Anchor → LLM core → Agent layer → Ship it → Capstone) so you don't have to grind all 20 phases before building something real.
- **20 phase cards** — color-coded by group (Nord theme), each with key topics, a progress bar, and `−`/`+`/`all` steppers to log lessons as you finish them.
- **Capstone tracker** — the 17 end-to-end products + 9 deep-build tracks as checkboxes, each labeled with the phases it draws on, plus a readiness hint.
- **Overall progress** — completion ring, lessons done, phases completed, estimated hours invested, capstones shipped.
- **Local persistence** — progress is saved in your browser's `localStorage`. **Export** dumps JSON; **Reset** clears it.

No build step, no dependencies, no backend — it's one `index.html`.

## Run it

Any static file server works. With Python:

```bash
python3 -m http.server 9999
# open http://localhost:9999
```

Or just open `index.html` directly in a browser.

### Run it as a persistent service (Linux / systemd)

To keep it running across logout and reboot:

```bash
./run.sh install   # installs + enables a systemd --user service on port 9999
./run.sh status
./run.sh stop
./run.sh uninstall
```

## Customizing

All curriculum data (phases, lesson counts, topics, capstones) lives in the
`PHASES` and `CAPSTONES` arrays inside `index.html`. Edit those to adapt the
dashboard to a different curriculum.

## License

MIT — see [LICENSE](LICENSE). Curriculum content belongs to
[rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch).
