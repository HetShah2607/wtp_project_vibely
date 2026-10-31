# Melodify — Spotify-Inspired Frontend Music Player

Melodify is a complete multi-page music player website created as a frontend-only project. It is inspired by the structure and interaction patterns of modern streaming platforms such as Spotify, but it uses an original name, original UI copy, and demo catalog data.

## Pages included

1. **Home (`index.html`)**
   - Spotify-inspired left sidebar and top search bar.
   - Hero section with a listening CTA.
   - Made-for-you track cards.
   - Popular artists section.
   - Popular albums section.
   - Fixed bottom music player.

2. **Sign Up (`signup.html`)**
   - Full name, email, password and confirm-password fields.
   - Client-side validation using JavaScript and the DOM.
   - Demo account details are saved with `localStorage`.

3. **Login (`login.html`)**
   - Login form checks the demo account saved in the browser.
   - Successful login stores the current user in `localStorage` and returns to Home.

4. **Artists (`artists.html`)**
   - Displays singers/composers as profile cards.
   - Shows genre/role and the number of songs in the demo catalog for each artist.
   - Includes overall catalog statistics.

5. **Albums (`albums.html`)**
   - Displays artist albums and movie soundtrack albums.
   - Filter buttons show All, Artist Albums, or Movie Albums.
   - Album cards show year, type and track count.

6. **Favorites (`favorites.html`)**
   - Displays all songs liked by the user.
   - Favorites persist between pages and browser refreshes through `localStorage`.
   - Empty state is shown when no favorites exist.

7. **Categories (`categories.html`)**
   - Mood/activity categories: Romance, Party, Gym/Exercise, Calm, Bollywood, Focus, Happy and Indie Pop.
   - Clicking a category filters the track list dynamically through the DOM.

8. **About (`about.html`)**
   - Explains the project goals, architecture and frontend-only approach.
   - Lists the technologies and browser APIs used.

9. **Contact (`contact.html`)**
   - Contact information cards.
   - Client-side contact form validation.
   - Submission is simulated; no information is sent to a server.

## Technologies, libraries and APIs

### Core technologies
- **HTML5** — semantic page structure, navigation, forms, audio element.
- **CSS3** — responsive layouts, cards, gradients, hover effects, sidebar, fixed player.
- **Vanilla JavaScript (ES6+)** — application logic, event listeners and rendering.
- **DOM API** — creates/updates page content, handles clicks and filtering.

### Browser APIs used
- **HTMLMediaElement / Audio** — loads and plays demo audio tracks, handles play/pause/seek/volume/end events.
- **Web Storage API (`localStorage`)** — stores the demo account, logged-in user, favorites and current track index.

### External libraries / frameworks
- **None.** No React, Bootstrap, Tailwind, jQuery or other JavaScript frameworks are required.

### External content
The sample audio URLs point to SoundHelix demo MP3 files so the player can demonstrate playback without a backend. For a production project, replace these URLs with music you own or have licensed for use.

## Project structure

```text
spotify_frontend/
├── index.html
├── signup.html
├── login.html
├── artists.html
├── albums.html
├── favorites.html
├── categories.html
├── about.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── data.js
    │   └── app.js
    └── audio/
        └── (optional place for your own local mp3 files)
```

## How to run

No build tools are required.

1. Extract the folder.
2. Open `index.html` in a browser.
3. For the smoothest experience, serve the folder using a simple local web server such as VS Code Live Server or Python's built-in server.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important frontend-only limitation

The sign-up and login are **demo client-side authentication**, not real security. Passwords are intentionally stored in browser `localStorage` only to demonstrate DOM and Web Storage functionality. Do not use this method for a real production account system. A real application should use a backend authentication service, HTTPS, hashed passwords, a database and secure session handling.
