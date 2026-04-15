---
name: project_tech_stack
description: Tech stack, key libraries, and architecture patterns used in quiz-app
type: project
---

# Tech Stack

- **React** 16.14.0 — class + function components, PropTypes
- **Redux** 5.0.1 + **React-Redux** 7.2.9 — `connect()` HOC pattern
- **React-Router-DOM** 4.3.1 — routes: `/` (quiz), `/add` (add author)
- **Enzyme** 3.7.0 + **Jest** — testing via `mount()`, React 16 adapter
- **Underscore.js** 1.9.1 — `_.shuffle`, `_.sample` for game randomization
- **AJV** 8.18.0 — JSON schema validation
- **Bootstrap** — CSS only, bundled as `src/bootstrap.min.css`
- **Create React App** (react-scripts 5.0.1) — build tooling

## Architecture
- Redux store + reducer defined inline in `index.js` (not a separate file)
- Reducer actions: `ANSWER_SELECTED`, `CONTINUE`, `ADD_AUTHOR`, `RESET_GAME`
- `AddAuthorForm.js` uses a class component (`AuthorForm`) wrapped by a function component (`AddAuthorForm`)
