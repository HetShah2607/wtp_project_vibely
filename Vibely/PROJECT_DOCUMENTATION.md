# Melodify Project Documentation

## 1. Project overview

Melodify is a frontend-only music streaming website designed with a Spotify-inspired information architecture. It is suitable for a college/project demonstration because the complete interface and core interactions are implemented without a backend framework.

The project uses:
- HTML5
- CSS3
- Vanilla JavaScript
- DOM manipulation
- Browser localStorage
- HTML5 Audio

## 2. Page-by-page description

### Home page — `index.html`
The home page acts as the main dashboard. It contains a fixed left navigation sidebar, a top search field, a large hero/banner section, recommended songs, popular artists, popular albums, and a fixed bottom music player. The "Start listening" button scrolls to the main track section.

### Registration / Sign-up — `signup.html`
The sign-up page contains full name, email, password and confirmation fields. JavaScript validates the form and checks whether both password values match. A successful registration is saved as a demo account in `localStorage`.

### Login — `login.html`
The login page accepts email and password. JavaScript compares the entered values against the locally stored demo account. A successful login stores the current user and redirects to Home.

### Artists — `artists.html`
The artists page presents singer/composer profile cards. Every card displays artist name, genre/role and a demo song count. Summary statistics are displayed above the catalog.

### Albums — `albums.html`
The albums page displays artist albums and movie soundtrack albums. JavaScript filter buttons dynamically switch between all albums, artist albums and movie albums.

### Favorites — `favorites.html`
The favorites page shows tracks that the user has liked. Heart buttons update the saved favorite list and the page re-renders from `localStorage`. The saved list survives refreshes and navigation within the browser.

### Categories — `categories.html`
The categories page provides mood/activity categories including Romance, Party, Gym / Exercise, Calm, Bollywood, Focus, Happy and Indie Pop. Category selection dynamically filters the available demo tracks using JavaScript and the DOM.

### About — `about.html`
The about page explains the educational purpose of the project and the frontend-only architecture. It also summarizes the main technologies and browser APIs.

### Contact — `contact.html`
The contact page contains project contact information and a message form. The form is validated client-side and the submit action is simulated; no information is transmitted to a backend service.

## 3. Shared user interface

Every non-auth page shares the same:
- Left navigation sidebar
- Sticky top bar
- Search field
- Login / sign-up controls
- Responsive content area
- Fixed bottom audio player
- Footer

The interface adapts to tablet and mobile widths using CSS media queries. On smaller screens the desktop sidebar is hidden and the player layout is simplified.

## 4. Music player behavior

The player uses the browser's HTML5 `<audio>` element. It supports:
- Play / pause
- Previous track
- Next track
- Seek/progress control
- Volume control
- Track title and artist display
- Favorite/like action
- Automatic next-track behavior after a track ends

The track index is stored in `localStorage`, allowing the demo player to remember the last selected track after navigation.

## 5. Favorite system

A favorite is represented by a track ID. The array of liked IDs is saved under the `melodifyFavorites` localStorage key. Home, Categories and Favorites all use the same state, so the UI stays consistent throughout the website.

## 6. Login system

This is intentionally a demo-only authentication flow. The project stores a basic account object under `melodifyAccount` and the current signed-in user under `melodifyUser`.

This should **not** be used for production authentication because browser localStorage is not a secure credential store. A production application needs a backend or managed authentication platform, HTTPS, secure password hashing, proper sessions/tokens and server-side authorization.

## 7. Libraries and APIs used

| Technology / API | Used for |
|---|---|
| HTML5 | Page structure, forms, links and audio element |
| CSS3 | Layout, colors, cards, responsiveness, hover effects and player styling |
| Vanilla JavaScript | State, rendering, validation and interactions |
| DOM API | Querying elements, changing content, event listeners and dynamic page updates |
| Web Storage API (`localStorage`) | Demo account, login state, favorites and current track |
| HTMLMediaElement / Audio API | Music playback, progress, volume and track events |
| JavaScript ES6+ | Template strings, arrow functions, array methods and modular data organization |

### External libraries
No external JavaScript libraries or CSS frameworks are required. There is no React, Angular, Vue, Bootstrap, Tailwind, jQuery or Node.js dependency.

### External audio content
The demo track catalog points to SoundHelix sample MP3 URLs so that the player can demonstrate audio playback. Those URLs are simply audio sources, not an application API. For a fully offline or production version, replace them with your own licensed audio files.

## 8. File structure

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
├── PROJECT_DOCUMENTATION.md
├── .gitignore
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── data.js
    │   └── app.js
    └── audio/
        └── README.txt
```

## 9. Run instructions

The site does not need a build step.

Recommended method:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

Opening the HTML files directly also works for most UI behavior, but a local server is preferable when working with browser media/network restrictions.
