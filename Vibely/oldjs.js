// (() => {
//   const { artists, albums, categories, tracks, appCopy } = window.MUSIC_DATA;
//   const page = document.body.dataset.page || 'home';
//   const $ = (s, root=document) => root.querySelector(s);
//   const $$ = (s, root=document) => [...root.querySelectorAll(s)];
//   const state = {
//     user: JSON.parse(localStorage.getItem('melodifyUser') || 'null'),
//     favorites: JSON.parse(localStorage.getItem('melodifyFavorites') || '[]'),
//     currentIndex: Number(localStorage.getItem('melodifyCurrentIndex') || 0),
//     isPlaying: false,
//   };

//   const initials = (name='U') => name.split(/\s+/).map(x => x[0]).slice(0,2).join('').toUpperCase();
//   const coverStyle = (tone) => `background:linear-gradient(135deg, ${tone[0]}, ${tone[1]});`;
//   const safe = (v='') => String(v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
//   const isLiked = id => state.favorites.includes(id);
//   const saveState = () => localStorage.setItem('melodifyFavorites', JSON.stringify(state.favorites));

//   function showToast(message) {
//     const toast = $('#toast'); if (!toast) return;
//     toast.textContent = message; toast.classList.add('show');
//     setTimeout(() => toast.classList.remove('show'), 1800);
//   }

//   function toggleFavorite(id) {
//     const idx = state.favorites.indexOf(id);
//     if (idx >= 0) {
//       state.favorites.splice(idx, 1); showToast('Removed from Favorites');
//     } else {
//       state.favorites.push(id); showToast('Added to Favorites');
//     }
//     saveState(); renderPage(); setupDynamicButtons(); renderPlayer();
//   }

//   function trackCard(t) {
//     return `<article class="card track-card" data-id="${t.id}">
//       <button class="card-cover" style="${coverStyle(t.tone)}" aria-label="Play ${safe(t.title)}"><span class="cover-text">${safe(t.cover)}</span></button>
//       <h3 title="${safe(t.title)}">${safe(t.title)}</h3>
//       <p>${safe(t.artist)} · ${safe(t.duration)}</p>
//       <div class="card-actions">
//         <button class="like-mini ${isLiked(t.id) ? 'liked' : ''}" data-action="like" data-id="${t.id}" aria-label="Favorite">${isLiked(t.id) ? '♥' : '♡'}</button>
//         <button class="play-mini" data-action="play" data-id="${t.id}" aria-label="Play">▶</button>
//       </div>
//     </article>`;
//   }

//   function trackRow(t, index) {
//     return `<div class="track-row" data-id="${t.id}">
//       <button class="track-cover" style="${coverStyle(t.tone)}" data-action="play" data-id="${t.id}">${String(index+1).padStart(2,'0')}</button>
//       <div class="track-main"><div class="track-title">${safe(t.title)}</div><div class="track-artist">${safe(t.artist)}</div></div>
//       <div class="track-album">${safe(t.album)}</div>
//       <div class="track-time">${safe(t.duration)}</div>
//       <div class="track-actions"><button class="track-btn ${isLiked(t.id)?'liked':''}" data-action="like" data-id="${t.id}">${isLiked(t.id)?'♥':'♡'}</button><button class="track-btn" data-action="play" data-id="${t.id}">▶</button></div>
//     </div>`;
//   }

//   function renderHome() {
//     $('#page-content').innerHTML = `
//       <section class="hero">
//         <div>
//           <div class="eyebrow">Good afternoon · ${state.user ? safe(state.user.name) : 'Listener'}</div>
//           <h1>Music that moves with you.</h1>
//           <p>Discover fresh melodies, timeless Bollywood sounds, and mood-based playlists inside a clean Spotify-inspired interface.</p>
//           <div class="hero-cta"><button class="btn btn-primary" data-scroll="popular">▶ Start listening</button><a class="btn btn-ghost" href="categories.html">Browse categories</a></div>
//         </div>
//       </section>

//       <section class="section" id="popular">
//         <div class="section-head"><h2 class="section-title">Made for you</h2><span class="section-sub">Curated demo tracks</span></div>
//         <div class="grid">${tracks.slice(0,5).map(trackCard).join('')}</div>
//       </section>

//       <section class="section">
//         <div class="section-head"><h2 class="section-title">Popular artists</h2><a class="section-sub" href="artists.html">See all</a></div>
//         <div class="grid grid-artist">${artists.slice(0,5).map(a => `<article class="card artist-card"><div class="card-cover" style="${coverStyle(a.tone)}"><span class="cover-text">${a.initials}</span></div><h3>${safe(a.name)}</h3><p>${a.songs} songs</p></article>`).join('')}</div>
//       </section>

//       <section class="section">
//         <div class="section-head"><h2 class="section-title">Popular albums</h2><a class="section-sub" href="albums.html">Explore albums</a></div>
//         <div class="album-grid">${albums.slice(0,5).map(a => `<article class="card"><div class="card-cover" style="${coverStyle(a.tone)}"><span class="cover-text">${safe(a.cover)}</span></div><span class="album-tag">${safe(a.kind)}</span><h3>${safe(a.title)}</h3><p>${safe(a.artist)} · ${a.tracks} tracks</p></article>`).join('')}</div>
//       </section>`;
//     $('#footer-text').textContent = `${appCopy.brand} · Frontend music player demo`;
//   }

//   function renderArtists() {
//     const total = artists.reduce((n,a)=>n+a.songs,0);
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>Artists</h1><p>Explore singers and composers by catalog size. Each profile below is demo content for your frontend project.</p><div class="stat-row"><div class="stat"><strong>${artists.length}</strong><span>Artists</span></div><div class="stat"><strong>${total}</strong><span>Catalog songs</span></div><div class="stat"><strong>${Math.max(...artists.map(a=>a.songs))}</strong><span>Top catalog size</span></div><div class="stat"><strong>8</strong><span>Genres represented</span></div></div></div>
//       <section class="section"><div class="artist-list">${artists.map(a=>`<article class="card"><div class="card-cover" style="${coverStyle(a.tone)}"><span class="cover-text">${a.initials}</span></div><div><div class="artist-name">${safe(a.name)}</div><div class="artist-meta">${safe(a.genre)}</div><div class="artist-meta">${a.songs} songs created / featured</div><button class="btn btn-ghost" style="margin-top:10px;padding:7px 11px;font-size:11px;" data-artist="${a.id}">View songs</button></div></article>`).join('')}</div></section>`;
//   }

//   function renderAlbums(filter='all') {
//     const list = filter === 'all' ? albums : albums.filter(a => a.kind.toLowerCase().includes(filter));
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>Albums</h1><p>Browse artist collections and a few movie soundtracks, organized in a reusable card layout.</p></div>
//       <div class="filters"><button class="filter-btn ${filter==='all'?'active':''}" data-album-filter="all">All</button><button class="filter-btn ${filter==='artist album'?'active':''}" data-album-filter="artist album">Artist albums</button><button class="filter-btn ${filter==='movie album'?'active':''}" data-album-filter="movie album">Movie albums</button></div>
//       <section class="album-grid">${list.map(a=>`<article class="card"><div class="card-cover" style="${coverStyle(a.tone)}"><span class="cover-text">${safe(a.cover)}</span></div><span class="album-tag">${safe(a.kind)} · ${a.year}</span><h3>${safe(a.title)}</h3><p>${safe(a.artist)} · ${a.tracks} tracks</p><div class="card-actions"><span class="section-sub">Demo catalog</span><button class="play-mini" data-album="${a.id}" style="opacity:1;transform:none;">▶</button></div></article>`).join('')}</section>`;
//     $$('.filter-btn').forEach(btn => btn.addEventListener('click', () => renderAlbums(btn.dataset.albumFilter)));
//   }

//   function renderFavorites() {
//     const liked = state.favorites.map(id=>tracks.find(t=>t.id===id)).filter(Boolean);
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>Your Favorites</h1><p>${liked.length ? `${liked.length} song${liked.length===1?'':'s'} saved locally in this browser.` : 'Like songs from Home or Categories to build your personal collection.'}</p></div>
//       <section class="section">${liked.length ? `<div class="list-head"><span>#</span><span>Title</span><span>Album</span><span>Time</span><span></span></div><div class="list">${liked.map((t,i)=>trackRow(t,i)).join('')}</div>` : `<div class="empty-state"><h2>No favorites yet</h2><p>Tap the heart icon on any track to save it here.</p><a class="btn btn-primary" href="index.html" style="margin-top:14px;">Explore music</a></div>`}</section>`;
//   }

//   function renderCategories(active='all') {
//     const filtered = active==='all' ? tracks : tracks.filter(t => t.category===active);
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>Categories</h1><p>Choose a mood, activity, or genre and instantly filter the demo catalog using JavaScript.</p></div>
//       <div class="category-grid" style="margin-top:20px;">${categories.map(c=>`<button class="category-card" style="background:linear-gradient(135deg,${c.tone[0]},${c.tone[1]});text-align:left;color:#fff;border:0;" data-category="${c.id}"><div class="category-icon">${c.icon}</div><h3>${safe(c.name)}</h3><p>${safe(c.description)}</p></button>`).join('')}</div>
//       <div class="filters"><button class="filter-btn ${active==='all'?'active':''}" data-category="all">All tracks</button>${categories.map(c=>`<button class="filter-btn ${active===c.id?'active':''}" data-category="${c.id}">${safe(c.name)}</button>`).join('')}</div>
//       <section class="section"><div class="list-head"><span>#</span><span>Title</span><span>Album</span><span>Time</span><span></span></div><div class="list">${filtered.length ? filtered.map((t,i)=>trackRow(t,i)).join('') : '<div class="empty-state"><h2>No demo tracks</h2><p>This category is ready for more content.</p></div>'}</div></section>`;
//     $$('[data-category]').forEach(btn => btn.addEventListener('click', ()=>renderCategories(btn.dataset.category)));
//   }

//   function renderAbout() {
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>About ${appCopy.brand}</h1><p>${appCopy.description}</p></div>
//       <section class="section about-grid"><article class="info-card"><h2>What this project demonstrates</h2><p>Melodify is designed as a college-friendly frontend music player project. The interface follows the familiar structure of a modern streaming service while keeping the implementation limited to HTML, CSS, vanilla JavaScript and DOM manipulation.</p><ul><li>Multi-page navigation with reusable UI patterns.</li><li>Responsive sidebar, cards, lists and bottom music player.</li><li>Signup/login simulation with browser-side localStorage.</li><li>Favorite songs stored and rendered dynamically.</li><li>Category filtering and player interactions handled with the DOM.</li></ul><div class="value-grid"><div class="value"><strong>Frontend only</strong><span>No server, database, Node.js framework or backend authentication.</span></div><div class="value"><strong>Reusable data</strong><span>All artists, albums, categories and tracks live in one JavaScript dataset.</span></div></div></article>
//       <aside class="info-card"><h2>Technology used</h2><p><strong>HTML5</strong> for page structure and forms.</p><p><strong>CSS3</strong> for the Spotify-inspired visual system and responsive layout.</p><p><strong>Vanilla JavaScript</strong> for interactions and application state.</p><p><strong>DOM API</strong> for dynamic rendering, event handling and filtering.</p><p><strong>Web Storage API</strong> for demo login and favorite-song persistence.</p><p><strong>HTML5 Audio API</strong> for music playback.</p></aside></section>`;
//   }

//   function renderContact() {
//     $('#page-content').innerHTML = `<div class="page-banner"><h1>Contact</h1><p>Send a message through the frontend form. For this demo, submission is simulated and no data is sent to a server.</p></div>
//       <section class="section contact-grid"><article class="info-card"><h2>Get in touch</h2><p>This section is ready to connect to a backend or form service later. Right now it demonstrates clean frontend form handling and validation.</p><div class="contact-items"><div class="contact-item"><span>Email</span><strong>hello@melodify-demo.local</strong></div><div class="contact-item"><span>Support</span><strong>Frontend demo · Mon–Fri</strong></div><div class="contact-item"><span>Project type</span><strong>HTML · CSS · JavaScript · DOM</strong></div></div></article>
//       <form class="info-card" id="contact-form"><div id="contact-message" class="form-message"></div><div class="form-grid"><div class="field"><label for="cname">Name</label><input id="cname" required placeholder="Your name"></div><div class="field"><label for="cemail">Email</label><input id="cemail" type="email" required placeholder="you@example.com"></div><div class="field full"><label for="csubject">Subject</label><input id="csubject" required placeholder="How can we help?"></div><div class="field full"><label for="cmessage">Message</label><textarea id="cmessage" required placeholder="Write your message..."></textarea></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Send message</button></div></form></section>`;
//     $('#contact-form').addEventListener('submit', e=>{ e.preventDefault(); const m=$('#contact-message');m.className='form-message success show';m.textContent='Thanks! Your message has been captured by the frontend demo.';e.target.reset();});
//   }

//   function renderAuth() {
//     if (page==='signup') {
//       $('#page-content').innerHTML = `<div class="form-shell"><div class="auth-card"><div class="auth-head"><h1>Create your account</h1><p>Join ${appCopy.brand} and save your favorite music.</p></div><div id="auth-message" class="form-message"></div><form id="signup-form"><div class="form-grid"><div class="field"><label for="sname">Full name</label><input id="sname" required placeholder="Het Shah"></div><div class="field"><label for="semail">Email</label><input id="semail" type="email" required placeholder="you@example.com"></div><div class="field"><label for="spass">Password</label><input id="spass" type="password" minlength="6" required placeholder="Minimum 6 characters"></div><div class="field"><label for="sconfirm">Confirm password</label><input id="sconfirm" type="password" minlength="6" required placeholder="Re-enter password"></div></div><div class="form-actions"><button class="btn btn-primary" type="submit">Sign up</button></div></form><div class="helper">Already have an account? <a href="login.html">Log in</a></div></div></div>`;
//       $('#signup-form').addEventListener('submit', e=>{ e.preventDefault(); const name=$('#sname').value.trim(), email=$('#semail').value.trim().toLowerCase(), p=$('#spass').value, cp=$('#sconfirm').value, m=$('#auth-message'); if(p!==cp){m.className='form-message error show';m.textContent='Passwords do not match.';return;} localStorage.setItem('melodifyAccount',JSON.stringify({name,email,password:p}));m.className='form-message success show';m.textContent='Account created. Redirecting to login...';setTimeout(()=>location.href='login.html',700);});
//     } else {
//       $('#page-content').innerHTML = `<div class="form-shell"><div class="auth-card"><div class="auth-head"><h1>Welcome back</h1><p>Log in to continue listening.</p></div><div id="auth-message" class="form-message"></div><form id="login-form"><div class="field"><label for="lemail">Email</label><input id="lemail" type="email" required placeholder="you@example.com"></div><div class="field" style="margin-top:14px;"><label for="lpass">Password</label><input id="lpass" type="password" required placeholder="Your password"></div><div class="form-actions"><button class="btn btn-primary" type="submit">Log in</button></div></form><div class="helper">New here? <a href="signup.html">Create an account</a></div></div></div>`;
//       $('#login-form').addEventListener('submit', e=>{e.preventDefault();const account=JSON.parse(localStorage.getItem('melodifyAccount')||'null');const email=$('#lemail').value.trim().toLowerCase();const pass=$('#lpass').value;const m=$('#auth-message'); if(!account||account.email!==email||account.password!==pass){m.className='form-message error show';m.textContent='Invalid demo credentials. Create an account first or check your details.';return;} state.user={name:account.name,email:account.email};localStorage.setItem('melodifyUser',JSON.stringify(state.user));m.className='form-message success show';m.textContent='Login successful. Opening your home page...';setTimeout(()=>location.href='index.html',600);});
//     }
//   }

//   function renderPlayer() {
//     const player = $('#player'); if (!player) return;
//     const t = tracks[state.currentIndex] || tracks[0];
//     $('#player-cover').setAttribute('style', coverStyle(t.tone));
//     $('#player-cover').textContent = t.cover;
//     $('#player-title').textContent = t.title;
//     $('#player-artist').textContent = t.artist;
//     $('#player-like').textContent = isLiked(t.id) ? '♥' : '♡';
//     $('#player-like').classList.toggle('liked', isLiked(t.id));
//     $('#player-play').textContent = state.isPlaying ? '❚❚' : '▶';
//   }

//   function setupAudio() {
//     const audio = $('#audio'); if (!audio) return;
//     const t = tracks[state.currentIndex] || tracks[0];
//     audio.src = t.audio; audio.preload='metadata';
//     audio.addEventListener('play',()=>{state.isPlaying=true;renderPlayer();});
//     audio.addEventListener('pause',()=>{state.isPlaying=false;renderPlayer();});
//     audio.addEventListener('ended',()=>{state.currentIndex=(state.currentIndex+1)%tracks.length;localStorage.setItem('melodifyCurrentIndex',state.currentIndex);audio.src=tracks[state.currentIndex].audio;audio.play().catch(()=>{});renderPlayer();});
//     audio.addEventListener('timeupdate',()=>{const seek=$('#seek'); if(seek && audio.duration) seek.value=(audio.currentTime/audio.duration)*100; $('#current-time').textContent=formatTime(audio.currentTime);});
//     audio.addEventListener('loadedmetadata',()=>{ $('#total-time').textContent=formatTime(audio.duration); });
//     $('#player-play').addEventListener('click',()=>{ if(audio.paused) audio.play().catch(()=>showToast('Demo audio could not be loaded')); else audio.pause(); });
//     $('#prev-btn').addEventListener('click',()=>changeTrack(-1));
//     $('#next-btn').addEventListener('click',()=>changeTrack(1));
//     $('#seek').addEventListener('input', e=>{if(audio.duration) audio.currentTime=(Number(e.target.value)/100)*audio.duration;});
//     $('#volume').addEventListener('input', e=>{audio.volume=Number(e.target.value);});
//     $('#player-like').addEventListener('click',()=>toggleFavorite(tracks[state.currentIndex].id));
//   }

//   function formatTime(sec) { if(!Number.isFinite(sec)) return '0:00'; const m=Math.floor(sec/60); const s=Math.floor(sec%60).toString().padStart(2,'0'); return `${m}:${s}`; }
//   function changeTrack(delta) { state.currentIndex=(state.currentIndex+delta+tracks.length)%tracks.length; localStorage.setItem('melodifyCurrentIndex',state.currentIndex);const a=$('#audio');if(a){a.src=tracks[state.currentIndex].audio;a.play().catch(()=>{});}renderPlayer(); }
//   function playTrack(id) { const idx=tracks.findIndex(t=>t.id===id);if(idx<0)return;state.currentIndex=idx;localStorage.setItem('melodifyCurrentIndex',idx);const a=$('#audio');if(a){a.src=tracks[idx].audio;a.play().catch(()=>showToast('Demo audio could not be loaded'));}renderPlayer(); }

//   function renderPage() {
//     if (!$('#page-content')) return;
//     if (['login','signup'].includes(page)) return renderAuth();
//     switch(page){
//       case 'home': renderHome(); break;
//       case 'artists': renderArtists(); break;
//       case 'albums': renderAlbums(); break;
//       case 'favorites': renderFavorites(); break;
//       case 'categories': renderCategories(); break;
//       case 'about': renderAbout(); break;
//       case 'contact': renderContact(); break;
//       default: renderHome();
//     }
//   }

//   function setupEvents() {
//     $$('.nav-link').forEach(a=>{ if(a.dataset.page===page) a.classList.add('active'); });
//     $$('[data-action="play"]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();playTrack(b.dataset.id);}));
//     $$('[data-action="like"]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.id);}));
//     $$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#popular')?.scrollIntoView({behavior:'smooth'})));
//     $('#search')?.addEventListener('input', e=>{const q=e.target.value.trim().toLowerCase();if(!q)return; if(page==='home'){const matches=tracks.filter(t=>(t.title+t.artist+t.album).toLowerCase().includes(q));const target=$('#popular');if(target&&matches.length){target.querySelector('.grid').innerHTML=matches.slice(0,5).map(trackCard).join('');setupDynamicButtons();}}});
//     setupDynamicButtons();
//   }
//   function setupDynamicButtons(){
//     $$('[data-action="play"]').forEach(b=>{if(b.dataset.bound)return;b.dataset.bound='1';b.addEventListener('click',e=>{e.stopPropagation();playTrack(b.dataset.id);});});
//     $$('[data-action="like"]').forEach(b=>{if(b.dataset.bound)return;b.dataset.bound='1';b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.id);});});
//     $$('[data-artist]').forEach(b=>{if(b.dataset.bound)return;b.dataset.bound='1';b.addEventListener('click',()=>{const a=artists.find(x=>x.id===b.dataset.artist);if(a) showToast(`${a.name}: ${a.songs} songs in demo catalog`);});});
//   }

//   function updateUserUI(){
//     $$('.logged-name').forEach(el=>el.textContent=state.user?.name || 'Guest');
//     $$('.avatar').forEach(el=>el.textContent=initials(state.user?.name || 'Guest'));
//     const logout=$('#logout'); if(logout){logout.style.display=state.user?'inline-block':'none';logout.addEventListener('click',()=>{localStorage.removeItem('melodifyUser');location.href='index.html';});}
//   }

//   // Build shared shell for every page except the auth pages.
//   function injectShell(){
//     if(['login','signup'].includes(page)) return;
//     const root=document.body;
//     const pageContent=root.innerHTML;
//     root.innerHTML=`<div class="app-shell">
//       <aside class="sidebar"><a class="brand" href="index.html"><span class="brand-mark">♫</span><span>${appCopy.brand}</span></a>
//         <div class="nav-group"><div class="nav-label">Browse</div>
//           <a class="nav-link" data-page="home" href="index.html"><span class="nav-icon">⌂</span><span>Home</span></a>
//           <a class="nav-link" data-page="artists" href="artists.html"><span class="nav-icon">♬</span><span>Artists</span></a>
//           <a class="nav-link" data-page="albums" href="albums.html"><span class="nav-icon">▣</span><span>Albums</span></a>
//           <a class="nav-link" data-page="categories" href="categories.html"><span class="nav-icon">◒</span><span>Categories</span></a>
//         </div>
//         <div class="nav-group"><div class="nav-label">Your library</div>
//           <a class="nav-link" data-page="favorites" href="favorites.html"><span class="nav-icon">♥</span><span>Favorites</span></a>
//         </div>
//         <div class="nav-group"><div class="nav-label">Info</div>
//           <a class="nav-link" data-page="about" href="about.html"><span class="nav-icon">ⓘ</span><span>About</span></a>
//           <a class="nav-link" data-page="contact" href="contact.html"><span class="nav-icon">✉</span><span>Contact</span></a>
//         </div>
//         <div class="sidebar-bottom"><div class="small-user"><span class="avatar">G</span><div><div class="logged-name">Guest</div><small style="color:#666">Free plan</small></div></div></div>
//       </aside>
//       <main class="main"><header class="topbar"><div class="topbar-left"><button class="circle-btn" onclick="history.back()">‹</button><button class="circle-btn" onclick="history.forward()">›</button></div><label class="search-wrap"><span>⌕</span><input id="search" placeholder="What do you want to play?" aria-label="Search songs"></label><div class="header-actions"><a class="btn btn-ghost" href="login.html" style="padding:9px 13px;font-size:12px;">Log in</a><a class="btn btn-primary" href="signup.html" style="padding:9px 13px;font-size:12px;">Sign up</a><button id="logout" class="logout-btn" style="display:none">Log out</button></div></header><div class="content" id="page-content"></div><div class="content" style="padding-top:0"><div class="footer"><span id="footer-text"></span><span>Frontend demo · No backend required</span></div></div></main>
//       <section class="player" id="player"><audio id="audio"></audio><div class="now-playing"><button class="track-cover" id="player-cover"></button><div class="now-playing-info"><div class="player-title" id="player-title">Select a song</div><div class="player-artist" id="player-artist">Melodify</div></div><button class="player-like" id="player-like">♡</button></div><div class="player-controls"><div class="control-row"><button class="control" id="prev-btn">↶</button><button class="play-main" id="player-play">▶</button><button class="control" id="next-btn">↷</button></div><div class="progress-row"><span class="time" id="current-time">0:00</span><input class="range" id="seek" type="range" min="0" max="100" value="0"><span class="time" id="total-time">0:00</span></div></div><div class="player-extra"><span style="font-size:13px;color:#888">🔊</span><input class="range volume" id="volume" type="range" min="0" max="1" step="0.01" value="0.75"></div></section>
//       <div class="toast" id="toast"></div>
//     </div>`;
//   }

//   injectShell();
//   renderPage();
//   updateUserUI();
//   setupEvents();
//   if(!['login','signup'].includes(page)){ renderPlayer(); setupAudio(); }
// })();



const audioPlayer = document.getElementById("audioPlayer");

const playButtons = document.querySelectorAll(".play-song");
const mainPlayButton = document.getElementById("mainPlayButton");

const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");
const currentCover = document.getElementById("currentCover");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");
const favoriteButton = document.getElementById("favoriteButton");

let currentSongIndex = -1;


/* GET SONG INFORMATION FROM HTML */
function getSongInfo(button) {
    const card = button.closest(".song-card");

    return {
        title: button.dataset.title,
        artist: button.dataset.artist,
        audio: button.dataset.audio,
        cover: card.querySelector("img").src
    };
}


/* PLAY A SELECTED SONG */
async function playSong(index) {
    if (index < 0 || index >= playButtons.length) {
        return;
    }

    currentSongIndex = index;

    const song = getSongInfo(playButtons[index]);

    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentCover.src = song.cover;

    audioPlayer.src = song.audio;
    progressBar.value = 0;
    currentTime.textContent = "0:00";

    favoriteButton.classList.remove("liked");
    favoriteButton.textContent = "♡";

    try {
        await audioPlayer.play();
    } catch (error) {
        mainPlayButton.textContent = "▶";
        console.error("Could not play this audio file:", error);
    }
}


/* CONNECT EACH SONG CARD TO THE PLAYER */
playButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        playSong(index);
    });
});


/* MAIN PLAY / PAUSE BUTTON */
mainPlayButton.addEventListener("click", async function() {
    if (!audioPlayer.src) {
        playSong(0);
        return;
    }

    if (audioPlayer.paused) {
        try {
            await audioPlayer.play();
        } catch (error) {
            console.error("Playback failed:", error);
        }
    } else {
        audioPlayer.pause();
    }
});


/* UPDATE PLAY BUTTON WHEN AUDIO STARTS */
audioPlayer.addEventListener("play", function() {
    mainPlayButton.textContent = "Ⅱ";
});


/* UPDATE PLAY BUTTON WHEN AUDIO PAUSES */
audioPlayer.addEventListener("pause", function() {
    mainPlayButton.textContent = "▶";
});


/* FORMAT SECONDS AS MINUTES:SECONDS */
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}


/* UPDATE SONG DURATION */
audioPlayer.addEventListener("loadedmetadata", function() {
    duration.textContent = formatTime(audioPlayer.duration);
});


/* UPDATE PROGRESS WHILE PLAYING */
audioPlayer.addEventListener("timeupdate", function() {
    currentTime.textContent = formatTime(audioPlayer.currentTime);

    if (audioPlayer.duration) {
        progressBar.value =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});


/* SEEK TO A DIFFERENT PART OF THE SONG */
progressBar.addEventListener("input", function() {
    if (audioPlayer.duration) {
        audioPlayer.currentTime =
            (Number(progressBar.value) / 100) * audioPlayer.duration;
    }
});


/* CHANGE VOLUME */
audioPlayer.volume = Number(volumeBar.value);

volumeBar.addEventListener("input", function() {
    audioPlayer.volume = Number(volumeBar.value);
});


/* NEXT SONG */
document.getElementById("nextButton").addEventListener("click", function() {
    const nextIndex =
        currentSongIndex < 0
            ? 0
            : (currentSongIndex + 1) % playButtons.length;

    playSong(nextIndex);
});


/* PREVIOUS SONG */
document.getElementById("previousButton").addEventListener("click", function() {
    const previousIndex =
        currentSongIndex < 0
            ? 0
            : (currentSongIndex - 1 + playButtons.length) % playButtons.length;

    playSong(previousIndex);
});


/* SEARCH SONGS */
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    document.querySelectorAll(".song-card").forEach(function(card) {
        const matches = card.dataset.search.includes(query);

        card.hidden = !matches;

        if (matches) {
            visibleCount++;
        }
    });

    noResults.hidden = visibleCount !== 0;
});


/* ADD / REMOVE FROM FAVORITES VISUALLY */
favoriteButton.addEventListener("click", function() {
    if (currentSongIndex < 0) {
        return;
    }

    const isLiked = favoriteButton.classList.toggle("liked");

    favoriteButton.textContent = isLiked ? "♥" : "♡";
});


/* WHEN A SONG FINISHES */
audioPlayer.addEventListener("ended", function() {
    const nextIndex = (currentSongIndex + 1) % playButtons.length;

    playSong(nextIndex);
});
