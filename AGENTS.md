# AGENTS.md

Guide for AI coding agents and contributors working on this repository.

## Project

- Lebanon Aggressions Archive (1949–1985): a searchable web archive of events from the book "لبنان 1949–1985: الاعتداءات الإسرائيلية".
- Live site: https://lebanon-aggressions-archive.netlify.app/
- The UI is in Arabic and right-to-left (`<html lang="ar" dir="rtl">`).

## Stack

- React 19 + Vite 7 (JavaScript, JSX, no TypeScript).
- Tailwind CSS v4 through `@tailwindcss/vite` (no `tailwind.config.js`; styles are utility classes plus `src/index.css`).
- `react-router-dom` wraps the app in `BrowserRouter`, but no routes are defined yet.
- Hosted on Netlify. `public/_redirects` sends every path to `index.html`.
- Python (standard library only) for the ETL export script.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint     # ESLint (flat config in eslint.config.js)
npm run preview  # serve the production build
```

There are no automated tests yet. Run `npm run lint` and `npm run build` before finishing a change.

## Layout

- `index.html`: page shell, Cairo font from Google Fonts, favicon.
- `src/main.jsx`: entry point, mounts `App` inside `BrowserRouter`.
- `src/App.jsx`: main state (events, filters, sort, pagination, sidebar, toast) and page layout.
- `src/components/SearchBar.jsx`: filter form (keyword, date range, year, month, exact date).
- `src/components/EventList.jsx`, `EventCard.jsx`: result list and single event card (copy and "request fix" actions).
- `src/components/RequestFix.jsx`: builds a `mailto:` link for correction requests.
- `src/components/PageHeader.jsx`, `Footer.jsx`, `Toast.jsx`: layout and feedback pieces.
- `src/utils/loadEvents.js`: fetches `/events.json`.
- `src/utils/paginationHelper.js`: builds the page number list with `...` gaps.
- `public/events.json`: the dataset the site loads at runtime.
- `etl/`: SQLite database and the export script (see `etl/README.md`).

## Data

- The site reads `public/events.json`, an array of objects with `id` (number), `date` (string `YYYY/MM/DD`), `text` (Arabic text), `source_pdf`, and `slice_idx`.
- `App.jsx` drops events whose `date` does not match `YYYY/MM/DD`.
- `DATA_SCHEMA.md` describes an older shape (`description`, ISO dates) and does not match the current file.
- `etl/scripts/export_sqlite_to_json.py` writes to `etl/export/`. Copy the result to `public/events.json` by hand to publish it. Run it from `etl/scripts/` because it uses relative paths.

## Conventions

- Keep all user-facing text in Arabic and check layouts in RTL.
- Style with Tailwind utility classes. Mobile first; the desktop layout starts at the `md` breakpoint.
- Keep components small and in `src/components/`; put pure helpers in `src/utils/`.
- Python: do not start function names with `_`.
- When behavior, setup, or workflow changes, update `README.md` (and this file) in the same change.
- Do not soft-wrap lines in README files; one sentence or bullet per line.
- Commit messages use `feat: ...` or `fix: ...`. Do not add `Co-Authored-By` trailers or any AI attribution.

## UI work

- Open UI improvements are tracked as GitHub issues with the `ui` and `accessibility` labels.
- Test changes at phone width and desktop width, with the search sidebar both open and closed.
