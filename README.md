# LQA Cockpit — Portfolio Demo

A small, self-contained product demo for a localization QA review workspace.

The demo explores a common review problem: a linguist has a queue of strings, AI-generated error proposals, corpus evidence, terminology constraints, and a lot of context to keep straight. The interface is designed to make the next correct decision fast — especially with a keyboard.

> **This repository contains mock data only.** It is a generic portfolio version, not a production application and not connected to any company system.

## What is in the demo

- Review queue with problem / preferential / clean buckets
- Source and target text with inline copy actions
- Multiple AI proposals per key
- Accept, reject, and edit affordances
- Evidence panel: rationale, corpus rows, glossary, and a consistency check
- Keyboard-first review:
  - `⌘/Ctrl + 1…9` — accept the numbered AI proposal
  - `⌘/Ctrl + Enter` — confirm the key
  - `J` / `K` or arrow keys — move through the queue
- Confirm advances to the next unconfirmed key
- Immediate hover tooltips for shortcut-bearing controls
- Light / dark theme and a responsive layout

## Run locally

No build step or dependencies:

```bash
cd lqa-cockpit-portfolio
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Design direction

The visual system uses a clean, flat dashboard language:

- teal for structure and focus
- orange for the primary action
- rose / blue / green for the three review states
- high-contrast surfaces and visible focus states
- compact density with generous line height for reading bilingual pairs

The layout is intentionally three-part: **queue → review → evidence**. The evidence panel stays visible while reviewing so a proposal is never evaluated without its supporting context.

## Product decisions worth discussing

### 1. One key in focus, not a table of everything

A wide table makes scanning look efficient, but translation review is a reading task. The focused card gives source and target room to breathe while the queue keeps the broader picture visible.

### 2. Confirm needs a visible next step

Confirming a key changes its bucket, which can reorder the queue. Instead of leaving the user at an arbitrary list position, the demo selects the next unconfirmed key after confirmation.

### 3. AI is a proposal, not a verdict

Every AI suggestion is shown with its severity and category, and the human must accept or reject it before confirming the key. This preserves the reviewer's ownership of the final decision.

### 4. Shortcuts should be discoverable

The shortcut is printed in the proposal row and in a tooltip. It is not hidden behind documentation. The keyboard flow is a speed feature, not a prerequisite for using the interface.

## Structure

```text
.
├── index.html       # semantic demo shell
├── styles.css       # design tokens, layout, responsive states
├── app.js           # mock data and interaction state
└── docs/
    └── architecture.md
```

## Notes

This is a sanitized portfolio extraction. It deliberately contains no real project names, translation memories, locale packs, credentials, internal URLs, or customer data.
