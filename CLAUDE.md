# Quiz App — Claude Code Guide

## Project Overview

A React/Redux author-book quiz game. Players match author images to their books. Supports adding custom authors. Built with Create React App.

## Tech Stack

- **React** 16.14.0 — class and function components, PropTypes
- **Redux** 5.0.1 + **React-Redux** 7.2.9 — global state via `connect()` HOC
- **React-Router-DOM** 4.3.1 — `BrowserRouter`, routes at `/` and `/add`
- **Enzyme** 3.7.0 + Jest — component testing
- **Underscore.js** — `_.shuffle`, `_.sample` for game randomization
- **AJV** 8.18.0 — JSON schema validation
- **Bootstrap** (CSS only, bundled in `src/bootstrap.min.css`)

## Project Structure

```
src/
  index.js            # Redux store, reducer, routing, seed authors
  AuthorQuiz.js       # Main quiz component (Redux-connected)
  AddAuthorForm.js    # Add author form with validation (class component)
  AuthorQuiz.test.js  # Enzyme tests
  App.css             # Quiz UI styles
  AddAuthorForm.css   # Form styles
public/
  images/authors/     # Author portrait images (.jpg/.PNG)
```

## Key Architecture Decisions

- Redux store defined and initialized in `index.js` (not a separate store file)
- Reducer handles: `ANSWER_SELECTED`, `CONTINUE`, `ADD_AUTHOR`, `RESET_GAME`
- Game ends after `GAME_LENGTH = 10` correct answers
- Answer feedback via inline background color (green/red/none)
- `AddAuthorForm` is a function component wrapping the `AuthorForm` class component

## Development Commands

```bash
npm start    # Dev server
npm test     # Run Enzyme/Jest tests
npm run build  # Production build
```

## Testing

- Uses Enzyme `mount()` for full rendering
- Adapter configured for React 16 at the top of `AuthorQuiz.test.js`
- Test cases cover: rendering, answer selection callbacks, background color states

## Notes

- Redux DevTools integration is active in `index.js`
- Author images must be placed in `public/images/authors/` and the URL passed to the form
- `AddAuthorForm` validates: name (required), imageUrl (required), at least one book
