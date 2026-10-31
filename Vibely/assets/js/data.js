const artists = [
  { id: 'arijit', name: 'Arijit Singh', genre: 'Bollywood · Romantic', songs: 128, initials: 'AS', tone: ['#7c3aed', '#ec4899'] },
  { id: 'shreya', name: 'Shreya Ghoshal', genre: 'Bollywood · Playback', songs: 112, initials: 'SG', tone: ['#0ea5e9', '#6366f1'] },
  { id: 'rahman', name: 'A. R. Rahman', genre: 'Indian · Composer', songs: 96, initials: 'AR', tone: ['#f97316', '#ef4444'] },
  { id: 'sonu', name: 'Sonu Nigam', genre: 'Bollywood · Classics', songs: 89, initials: 'SN', tone: ['#14b8a6', '#0f766e'] },
  { id: 'neha', name: 'Neha Kakkar', genre: 'Pop · Party', songs: 82, initials: 'NK', tone: ['#f43f5e', '#f59e0b'] },
  { id: 'jubin', name: 'Jubin Nautiyal', genre: 'Bollywood · Melody', songs: 74, initials: 'JN', tone: ['#2563eb', '#06b6d4'] },
  { id: 'darshan', name: 'Darshan Raval', genre: 'Indian Pop', songs: 67, initials: 'DR', tone: ['#8b5cf6', '#3b82f6'] },
  { id: 'king', name: 'KING', genre: 'Hip-Hop · Pop', songs: 54, initials: 'KG', tone: ['#111827', '#4b5563'] },
];

const albums = [
  { id:'a1', title:'Midnight Melodies', artist:'Arijit Singh', kind:'Artist Album', year:2026, tracks:12, tone:['#4c1d95','#db2777'], cover:'MM' },
  { id:'a2', title:'Golden Voice', artist:'Shreya Ghoshal', kind:'Artist Album', year:2025, tracks:10, tone:['#1e3a8a','#0ea5e9'], cover:'GV' },
  { id:'a3', title:'Cinema Symphony', artist:'A. R. Rahman', kind:'Composer Album', year:2026, tracks:14, tone:['#7f1d1d','#ea580c'], cover:'CS' },
  { id:'a4', title:'Timeless Love', artist:'Sonu Nigam', kind:'Artist Album', year:2024, tracks:11, tone:['#134e4a','#10b981'], cover:'TL' },
  { id:'a5', title:'Party Punch', artist:'Neha Kakkar', kind:'Artist Album', year:2026, tracks:9, tone:['#881337','#f97316'], cover:'PP' },
  { id:'a6', title:'Soulful Nights', artist:'Jubin Nautiyal', kind:'Artist Album', year:2025, tracks:10, tone:['#172554','#2563eb'], cover:'SN' },
  { id:'m1', title:'Aashiqui 2', artist:'Movie Soundtrack', kind:'Movie Album', year:2013, tracks:11, tone:['#3f0f20','#be185d'], cover:'A2' },
  { id:'m2', title:'Rockstar', artist:'Movie Soundtrack', kind:'Movie Album', year:2011, tracks:14, tone:['#111827','#dc2626'], cover:'RS' },
  { id:'m3', title:'Jab We Met', artist:'Movie Soundtrack', kind:'Movie Album', year:2007, tracks:10, tone:['#14532d','#16a34a'], cover:'JWM' },
  { id:'m4', title:'Yeh Jawaani Hai Deewani', artist:'Movie Soundtrack', kind:'Movie Album', year:2013, tracks:9, tone:['#164e63','#06b6d4'], cover:'YJHD' },
];

const categories = [
  { id:'romance', name:'Romance', description:'Soft songs for late-night feelings', icon:'♡', tone:['#831843','#f43f5e'] },
  { id:'party', name:'Party', description:'High-energy picks for your next night out', icon:'✦', tone:['#7e22ce','#db2777'] },
  { id:'gym', name:'Gym / Exercise', description:'Power tracks that keep you moving', icon:'⚡', tone:['#0f766e','#14b8a6'] },
  { id:'calm', name:'Calm', description:'Peaceful music for quiet moments', icon:'☾', tone:['#1e3a8a','#0ea5e9'] },
  { id:'bollywood', name:'Bollywood', description:'Fresh and timeless Hindi favorites', icon:'♪', tone:['#b45309','#f59e0b'] },
  { id:'focus', name:'Focus', description:'Low-distraction tracks for deep work', icon:'◈', tone:['#334155','#64748b'] },
  { id:'happy', name:'Happy', description:'Feel-good songs for a better mood', icon:'☀', tone:['#c2410c','#facc15'] },
  { id:'indie', name:'Indie Pop', description:'Modern independent sounds and vibes', icon:'◆', tone:['#3730a3','#8b5cf6'] },
];

const tracks = [
  { id:'t1', title:'Raah Nayi', artist:'Arijit Singh', album:'Midnight Melodies', category:'romance', duration:'3:42', durationSec:222, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tone:['#4c1d95','#ec4899'], cover:'RN' },
  { id:'t2', title:'Saanson Ki Dhun', artist:'Shreya Ghoshal', album:'Golden Voice', category:'romance', duration:'4:08', durationSec:248, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tone:['#0f766e','#0ea5e9'], cover:'SD' },
  { id:'t3', title:'City Lights', artist:'A. R. Rahman', album:'Cinema Symphony', category:'focus', duration:'5:12', durationSec:312, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', tone:['#7f1d1d','#f97316'], cover:'CL' },
  { id:'t4', title:'Dil Se Again', artist:'Sonu Nigam', album:'Timeless Love', category:'romance', duration:'4:01', durationSec:241, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tone:['#134e4a','#14b8a6'], cover:'DS' },
  { id:'t5', title:'Dancefloor Dreams', artist:'Neha Kakkar', album:'Party Punch', category:'party', duration:'3:26', durationSec:206, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tone:['#9f1239','#f97316'], cover:'DD' },
  { id:'t6', title:'Chaand Sa Safar', artist:'Jubin Nautiyal', album:'Soulful Nights', category:'calm', duration:'4:32', durationSec:272, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', tone:['#172554','#2563eb'], cover:'CS' },
  { id:'t7', title:'Heartbeat Run', artist:'Darshan Raval', album:'Singles', category:'gym', duration:'3:18', durationSec:198, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tone:['#312e81','#06b6d4'], cover:'HR' },
  { id:'t8', title:'Weekend Mode', artist:'KING', album:'Urban Nights', category:'party', duration:'2:58', durationSec:178, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tone:['#111827','#6b7280'], cover:'WM' },
  { id:'t9', title:'Quiet Skies', artist:'Arijit Singh', album:'Midnight Melodies', category:'calm', duration:'4:20', durationSec:260, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', tone:['#0f172a','#3b82f6'], cover:'QS' },
  { id:'t10', title:'First Coffee', artist:'Shreya Ghoshal', album:'Golden Voice', category:'happy', duration:'3:54', durationSec:234, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tone:['#b45309','#f59e0b'], cover:'FC' },
  { id:'t11', title:'Rise Higher', artist:'A. R. Rahman', album:'Cinema Symphony', category:'gym', duration:'4:46', durationSec:286, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tone:['#7f1d1d','#dc2626'], cover:'RH' },
  { id:'t12', title:'Afterglow', artist:'Jubin Nautiyal', album:'Soulful Nights', category:'indie', duration:'3:38', durationSec:218, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', tone:['#3730a3','#8b5cf6'], cover:'AG' },
  { id:'t13', title:'Tum Bin Kahaani', artist:'Sonu Nigam', album:'Timeless Love', category:'bollywood', duration:'4:18', durationSec:258, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', tone:['#3f0f20','#be185d'], cover:'TB' },
  { id:'t14', title:'City Celebration', artist:'Neha Kakkar', album:'Party Punch', category:'happy', duration:'3:11', durationSec:191, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', tone:['#7e22ce','#db2777'], cover:'CC' },
  { id:'t15', title:'Open Road', artist:'Darshan Raval', album:'Singles', category:'indie', duration:'3:47', durationSec:227, audio:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', tone:['#075985','#38bdf8'], cover:'OR' },
];

const appCopy = {
  brand: 'Melodify',
  tagline: 'Your music. Your mood. Your moment.',
  description: 'A Spotify-inspired educational music streaming interface built entirely with HTML, CSS, JavaScript and browser APIs.'
};

window.MUSIC_DATA = { artists, albums, categories, tracks, appCopy };
