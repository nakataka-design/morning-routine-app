'use strict';

// ─────────────────────────────────────────────
// タスクデータ（デフォルト）
// ─────────────────────────────────────────────
const DEFAULT_TASKS = [
  { id:1, name:'おきる',       emoji:'🌅', duration:60,  c1:'#FF6B6B', c2:'#FF8E53',  enabled:true },
  { id:2, name:'かおをあらう', emoji:'💧', duration:120, c1:'#4ECDC4', c2:'#45B7D1',  enabled:true },
  { id:3, name:'はみがき',     emoji:'🦷', duration:180, c1:'#00C9FF', c2:'#92FE9D',  enabled:true },
  { id:4, name:'きがえ',       emoji:'👕', duration:300, c1:'#C77DFF', c2:'#9B5DE5',  enabled:true },
  { id:5, name:'あさごはん',   emoji:'🍳', duration:900, c1:'#F7971E', c2:'#FFD200',  enabled:true },
  { id:6, name:'もちもの',     emoji:'🎒', duration:120, c1:'#43E97B', c2:'#38F9D7',  enabled:true },
];

const TASK_COLORS = [
  ['#FF6B6B','#FF8E53'], ['#4ECDC4','#45B7D1'], ['#00C9FF','#92FE9D'],
  ['#C77DFF','#9B5DE5'], ['#F7971E','#FFD200'], ['#43E97B','#38F9D7'],
  ['#FF9A9E','#FECFEF'], ['#667eea','#764ba2'],
];

const EMOJI_OPTIONS = [
  '🌅','💧','🦷','👕','🍳','🎒','📚','✏️',
  '🥛','🍎','🛁','🏃','⚽','🎮','📱','👟',
  '🪥','🧹','🌸','🎵','🎨','🌙','🌈','🎪',
];

let TASKS = []; // loadTasks() で初期化

const CHEERS = [
  { text:'すごい！できたね！',     emoji:'🌟' },
  { text:'やったね！かっこいい！', emoji:'⭐' },
  { text:'完璧！天才だね！',       emoji:'🏆' },
  { text:'さすが！！',             emoji:'👑' },
  { text:'もう終わった？はやい！', emoji:'⚡' },
  { text:'えらい！すごすぎる！',   emoji:'🔥' },
  { text:'ばっちり！完璧！',       emoji:'💫' },
  { text:'よくできました！',       emoji:'🎉' },
];

const TIMER_MSGS = [
  'がんばれ！',
  'もうすぐだよ！',
  'できるできる！',
  'すごいぞ！',
  'その調子！',
  'いい感じ！',
];

const CIRCUMFERENCE = 553; // 2π × 88 ≈ 552.9

// ─────────────────────────────────────────────
// キャラクターデータ
// ─────────────────────────────────────────────
const CHARACTERS = [
  {
    id:'cat', emoji:'🐱', name:'ねこ', color:'#FF8E53',
    greeting: 'にゃ〜！よろしくにゃ！いっしょにがんばろうにゃ！',
    cheers:  ['にゃ！すごいにゃ！', 'さすが！にゃ〜！', 'ぱちぱち〜にゃ！', 'かっこいいにゃ！', 'にゃんと！はやい！'],
    timer:   ['がんばるにゃ！', 'もうすぐにゃ！', 'できるにゃ！', 'すごいにゃ！', 'その調子にゃ！', 'いい感じにゃ！'],
    done:    'にゃーん！ぜんぶできたにゃ！最高にゃ！',
  },
  {
    id:'dog', emoji:'🐶', name:'いぬ', color:'#FFD93D',
    greeting: 'わん！よろしく！いっしょにがんばろう！',
    cheers:  ['わん！やったね！', 'すごいわん！', 'えらいわん！', 'ワンダフル！', 'だいすき！わん！'],
    timer:   ['がんばれ〜わん！', 'もうすぐわん！', 'できるわん！', 'すごいわん！', 'その調子わん！', 'いい子いい子！'],
    done:    'わわわ〜ん！ぜんぶできた！いい子いい子！',
  },
  {
    id:'panda', emoji:'🐼', name:'パンダ', color:'#4ECDC4',
    greeting: 'もぐもぐ...よろしく！いっしょにがんばろう！',
    cheers:  ['ぱちぱち〜！', 'もぐもぐ...天才！', 'パンダより速い！', 'すごいぞ！', 'パンダも嬉しい！'],
    timer:   ['がんばれ！', 'もうすぐだよ！', 'できるできる！', 'すごいぞ！', 'もぐもぐ...応援中！', 'その調子！'],
    done:    'もぐもぐ！！ぜんぶできた！パンダもハッピー！',
  },
  {
    id:'fox', emoji:'🦊', name:'きつね', color:'#FF6B6B',
    greeting: 'こんこん！よろしく！はやく準備しよう！',
    cheers:  ['こんこん！すごい！', 'さすがだね！', 'よくできた！', 'ぱちぱちこん！', 'きつねも応援！'],
    timer:   ['こんこん！がんばれ！', 'もうすぐこん！', 'できるこん！', 'すごいこん！', 'その調子こん！', 'いい感じこん！'],
    done:    'こんこん〜！ぜんぶできた！すごすぎる！',
  },
  {
    id:'frog', emoji:'🐸', name:'かえる', color:'#43E97B',
    greeting: 'ケロ！よろしくケロ！がんばろうケロ！',
    cheers:  ['ケロ！すごい！', 'やったケロ！', 'えらいケロ！', 'ぴょん！天才！', 'ケロケロ大成功！'],
    timer:   ['がんばるケロ！', 'もうすぐケロ！', 'できるケロ！', 'すごいケロ！', 'その調子ケロ！', 'ケロケロ〜！'],
    done:    'ケロケロ〜！ぜんぶできたケロ！最高ケロ！',
  },
  {
    id:'unicorn', emoji:'🦄', name:'ユニコーン', color:'#C77DFF',
    greeting: '✨よろしく！いっしょに輝こう！✨',
    cheers:  ['✨すごい！✨', '魔法みたい！', 'きらきら！', '虹が出そう！', '完璧！✨'],
    timer:   ['✨がんばれ！', 'きらきら！もうすぐ！', '魔法の力で！', '輝いてる！', '✨その調子！', 'まばゆい！'],
    done:    '✨✨ぜんぶできた！最高に輝いてる！✨✨',
  },
  {
    id:'penguin', emoji:'🐧', name:'ペンギン', color:'#45B7D1',
    greeting: 'よちよち！よろしく！いっしょにがんばろう！',
    cheers:  ['よちよち！すごい！', 'ぺんぺん！やったね！', 'ぴょこ！最高！', '南極一番！', 'かわいい！えらい！'],
    timer:   ['よちよち...がんばれ！', 'もうすぐだよ！', 'ぺんぺん！できる！', 'すごい！', 'ぴょこぴょこ！', 'その調子！'],
    done:    'よちよち〜！ぜんぶできた！南極で一番すごい！',
  },
  {
    id:'rabbit', emoji:'🐰', name:'うさぎ', color:'#FF9A9E',
    greeting: 'ぴょん！よろしく！いっしょにがんばろう！',
    cheers:  ['ぴょん！すごい！', 'うさぎもびっくり！', 'ぴょこ！やったね！', 'にんじんあげたい！', 'ほっぺぷにぷに！えらい！'],
    timer:   ['ぴょん！がんばれ！', 'もうすぐだよ！', 'できるできる！', 'すごいぴょん！', 'その調子ぴょん！', 'うさぎも応援！'],
    done:    'ぴょんぴょん！ぜんぶできた！うさぎより速い！',
  },
];

// ─────────────────────────────────────────────
// 状態
// ─────────────────────────────────────────────
let completed    = new Set();
let activeTaskId = null;
let timerTotal   = 0;
let timerRem     = 0;
let timerIv      = null;
let msgIv        = null;
let msgIdx       = 0;
let cheerTmo     = null;

// キャラクター
let selectedChar  = null;
let bubbleTmo     = null;

// ─────────────────────────────────────────────
// 初期化
// ─────────────────────────────────────────────
// アクティブタスク（有効なもの）
function getActiveTasks() {
  return TASKS.filter(t => t.enabled !== false);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadState();
  loadCharacter();
  renderTasks();
  updateHeader();
  updateClock();
  setInterval(updateClock, 1000);

  // 最初のタップでオーディオをアンロック＋BGM開始
  function onFirstTouch() {
    unlockAudio();
    if (localStorage.getItem('mrapp_bgm') !== '0') {
      setTimeout(() => {
        startBGM();
        document.getElementById('bgm-btn').textContent = '🎵 BGM';
      }, 300);
    }
  }
  document.addEventListener('touchstart', onFirstTouch, { once: true });
  document.addEventListener('pointerdown', onFirstTouch, { once: true });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

// ─────────────────────────────────────────────
// レンダリング
// ─────────────────────────────────────────────
function renderTasks() {
  const grid = document.getElementById('task-grid');
  grid.innerHTML = '';

  getActiveTasks().forEach(t => {
    const done = completed.has(t.id);
    const card = document.createElement('div');
    card.className = 'task-card' + (done ? ' done' : '');
    card.dataset.id = t.id;
    card.setAttribute('role', 'listitem');
    card.style.setProperty('--c1', t.c1);
    card.style.setProperty('--c2', t.c2);

    if (done) {
      card.innerHTML = `
        <div class="card-done-badge">✅</div>
        <div class="card-emoji">${t.emoji}</div>
        <div class="card-name">${t.name}</div>
        <div class="card-done-label">できた！⭐</div>`;
    } else {
      card.innerHTML = `
        <div class="card-emoji">${t.emoji}</div>
        <div class="card-name">${t.name}</div>
        <div class="card-time">${fmtDur(t.duration)}</div>
        <div class="card-hint">タップしてはじめる</div>`;
    }

    card.addEventListener('click', () => onCardTap(t.id));
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────────
// カードタップ
// ─────────────────────────────────────────────
function onCardTap(id) {
  if (completed.has(id)) {
    const card = document.querySelector(`[data-id="${id}"]`);
    showQuickMsg(card, 'もうできてるよ！✅');
    return;
  }

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.classList.add('bounce');
    card.addEventListener('animationend', () => card.classList.remove('bounce'), { once: true });
  }

  const task = TASKS.find(t => t.id === id);
  if (task) openTimer(task);
}

// ─────────────────────────────────────────────
// タイマー
// ─────────────────────────────────────────────
function openTimer(task) {
  // 別タスクが動いていれば停止（完了はしない）
  if (timerIv) {
    clearInterval(timerIv);
    clearInterval(msgIv);
    timerIv = null; msgIv = null;
  }

  activeTaskId = task.id;
  timerTotal   = task.duration;
  timerRem     = task.duration;
  msgIdx       = 0;

  // 色設定
  const card = document.getElementById('timer-card');
  card.style.setProperty('--c1', task.c1);
  card.style.setProperty('--c2', task.c2);

  document.getElementById('timer-emoji').textContent = task.emoji;
  document.getElementById('timer-name').textContent  = task.name;
  const initMsgs = selectedChar ? selectedChar.timer : TIMER_MSGS;
  document.getElementById('timer-msg').textContent   = initMsgs[0];
  document.getElementById('timer-msg').style.opacity = '1';

  // アーク即時リセット（トランジション無効→復帰）
  const arc = document.getElementById('timer-arc');
  arc.classList.add('no-transition');
  arc.style.strokeDashoffset = '0';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => arc.classList.remove('no-transition'));
  });

  updateTimerDisplay();

  document.getElementById('timer-overlay').classList.remove('hidden');

  // カウントダウン開始
  timerIv = setInterval(() => {
    timerRem--;
    updateTimerDisplay();
    if (timerRem <= 0) {
      clearInterval(timerIv);
      timerIv = null;
      onTimerEnd();
    }
  }, 1000);

  // メッセージローテーション（キャラのセリフ優先）
  const msgs = selectedChar ? selectedChar.timer : TIMER_MSGS;
  msgIv = setInterval(() => {
    msgIdx = (msgIdx + 1) % msgs.length;
    const el = document.getElementById('timer-msg');
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent   = msgs[msgIdx];
      el.style.opacity = '1';
    }, 300);
  }, 4000);
}

function updateTimerDisplay() {
  const m = Math.floor(timerRem / 60);
  const s = timerRem % 60;
  document.getElementById('t-min').textContent = String(m).padStart(2, '0');
  document.getElementById('t-sec').textContent = String(s).padStart(2, '0');

  const frac   = timerTotal > 0 ? timerRem / timerTotal : 0;
  const offset = CIRCUMFERENCE * (1 - frac);
  document.getElementById('timer-arc').style.strokeDashoffset = offset;

  const digits = document.getElementById('timer-digits');
  if (timerRem <= 10 && timerRem > 0) {
    digits.classList.add('low');
  } else {
    digits.classList.remove('low');
  }
}

function onTimerEnd() {
  playTimerEndSound();
  const el = document.getElementById('timer-msg');
  el.textContent = '⏰ 時間だよ！できたかな？';
}

function closeTimerOverlay() {
  clearInterval(timerIv);
  clearInterval(msgIv);
  timerIv = null; msgIv = null;
  activeTaskId = null;
  document.getElementById('timer-overlay').classList.add('hidden');
}

function completeCurrentTask() {
  if (!activeTaskId) return;
  const taskId = activeTaskId;

  closeTimerOverlay();

  // 完了登録
  completed.add(taskId);
  saveState();

  // フラッシュアニメ
  const card = document.querySelector(`[data-id="${taskId}"]`);
  if (card) {
    card.classList.add('flash');
    card.addEventListener('animationend', () => {
      renderTasks();
      updateHeader();
    }, { once: true });
  } else {
    renderTasks();
    updateHeader();
  }

  // エフェクト
  launchParticles(card);
  playSuccessSound();

  // キャラのセリフ優先、なければ汎用 CHEERS
  const cheerPool = selectedChar ? selectedChar.cheers.map(t => ({ text: t, emoji: selectedChar.emoji })) : CHEERS;
  const cheer = rand(cheerPool);
  showCheer(cheer);
  showCharBubble(cheer.text);
  // 効果音が終わってから読み上げ（iOS干渉対策）
  setTimeout(() => speak(cheer.text), 700);

  if (getActiveTasks().every(t => completed.has(t.id))) {
    setTimeout(showCompletion, 1900);
  }
}

// ─────────────────────────────────────────────
// 応援ポップアップ
// ─────────────────────────────────────────────
function showCheer(cheer) {
  document.getElementById('cheer-emoji').textContent = cheer.emoji;
  document.getElementById('cheer-text').textContent  = cheer.text;

  const popup = document.getElementById('cheer-popup');
  const box   = document.getElementById('cheer-box');
  box.classList.remove('out');
  popup.classList.remove('hidden');

  clearTimeout(cheerTmo);
  cheerTmo = setTimeout(() => {
    box.classList.add('out');
    setTimeout(() => popup.classList.add('hidden'), 300);
  }, 2200);
}

// ─────────────────────────────────────────────
// 全完了画面
// ─────────────────────────────────────────────
function showCompletion() {
  document.getElementById('done-screen').classList.remove('hidden');
  playCompletionSound();
  const doneMsg = selectedChar
    ? `${selectedChar.emoji} ${selectedChar.done}`
    : '今日も完璧！ぜんぶできたね！すごい！';
  document.getElementById('done-sub').textContent = selectedChar
    ? selectedChar.done
    : 'ぜんぶできたね！すごい！！';
  speak(selectedChar ? selectedChar.done : '今日も完璧！ぜんぶできたね！すごい！');
  setTimeout(() => showCharBubble(selectedChar ? selectedChar.done : '今日も完璧！'), 800);
  launchConfetti();
}

function resetAll() {
  completed.clear();
  activeTaskId = null;
  saveState();
  document.getElementById('done-screen').classList.add('hidden');
  renderTasks();
  updateHeader();
}

// ─────────────────────────────────────────────
// ヘッダー更新
// ─────────────────────────────────────────────
function updateHeader() {
  const active = getActiveTasks();
  const n = active.length;
  const d = active.filter(t => completed.has(t.id)).length;
  document.getElementById('done-count').textContent = d;
  document.getElementById('all-count').textContent  = n;
  document.getElementById('progress-bar').style.width = n > 0 ? (d / n * 100) + '%' : '0%';
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}

// ─────────────────────────────────────────────
// コンフェッティ
// ─────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const cols   = ['#FF6B6B','#FFD93D','#4ECDC4','#C77DFF','#FF9A9E','#43E97B','#FF8E53','#45B7D1'];
  const shapes = ['rect','circle','star'];

  const pts = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 120,
    vx: (Math.random() - 0.5) * 7,
    vy: Math.random() * 4.5 + 2,
    col: cols[Math.floor(Math.random() * cols.length)],
    sz: Math.random() * 14 + 6,
    rot: Math.random() * 360,
    rs: (Math.random() - 0.5) * 11,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    a: 1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pts.forEach(p => {
      if (p.a <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.07; p.rot += p.rs;
      if (p.y > canvas.height * 0.62) p.a -= 0.02;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.col;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.sz / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawStar(ctx, p.sz / 2);
      }
      ctx.restore();
    });

    if (alive) requestAnimationFrame(draw);
  }
  draw();
}

function drawStar(ctx, r) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI / 5) - Math.PI / 2;
    i === 0
      ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}

// ─────────────────────────────────────────────
// 浮遊パーティクル
// ─────────────────────────────────────────────
function launchParticles(fromEl) {
  const emojis = ['⭐','✨','🌟','💫','🎉','🎊'];
  const rect   = fromEl
    ? fromEl.getBoundingClientRect()
    : { left: window.innerWidth/2, top: window.innerHeight/2, width:0, height:0 };

  const cx = rect.left + rect.width / 2;
  const cy = rect.top  + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (cx + (Math.random() - 0.5) * 100) + 'px';
    el.style.top  = cy + 'px';
    el.style.setProperty('--tx', (Math.random() - 0.5) * 130 + 'px');
    el.style.animationDelay = (i * 0.07) + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ─────────────────────────────────────────────
// 音声（Web Audio API）
// ─────────────────────────────────────────────
// グローバルAudioContext（使い回してiOS制限を回避）
let _audioCtx = null;

function getCtx() {
  try {
    if (!_audioCtx) {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
  } catch(e) { return null; }
}

// 最初のタップでオーディオをアンロック（iOS必須）
function unlockAudio() {
  const ctx = getCtx();
  if (!ctx) return;
  // 無音バッファを再生してロック解除
  const buf = ctx.createBuffer(1, 1, 22050);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start(0);
  ctx.resume();
}

// ─────────────────────────────────────────────
// BGM（Web Audio APIで生成するループ音楽）
// ─────────────────────────────────────────────
let _bgmNodes = [];
let _bgmPlaying = false;

function startBGM() {
  if (_bgmPlaying) return;
  const ctx = getCtx();
  if (!ctx) return;
  _bgmPlaying = true;

  // かわいいメロディ（ハ長調）
  const melody = [
    523.25, 587.33, 659.25, 698.46,
    783.99, 698.46, 659.25, 587.33,
    523.25, 659.25, 783.99, 1046.5,
    880.00, 783.99, 698.46, 659.25,
  ];
  const beatLen = 0.4; // 1音の長さ（秒）
  const loopLen = melody.length * beatLen;

  function scheduleLoop(startTime) {
    if (!_bgmPlaying) return;
    melody.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = startTime + i * beatLen;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + beatLen * 0.9);
      osc.start(t);
      osc.stop(t + beatLen);
      _bgmNodes.push(osc);
    });
    // 次のループをスケジュール
    setTimeout(() => scheduleLoop(startTime + loopLen), (loopLen - 0.5) * 1000);
  }

  scheduleLoop(ctx.currentTime + 0.1);
}

function stopBGM() {
  _bgmPlaying = false;
  _bgmNodes.forEach(n => { try { n.stop(); } catch(e) {} });
  _bgmNodes = [];
}

function toggleBGM() {
  if (_bgmPlaying) {
    stopBGM();
    document.getElementById('bgm-btn').textContent = '🔇 BGM';
    localStorage.setItem('mrapp_bgm', '0');
  } else {
    startBGM();
    document.getElementById('bgm-btn').textContent = '🎵 BGM';
    localStorage.setItem('mrapp_bgm', '1');
  }
}

function playTones(notes) {
  const ctx = getCtx();
  if (!ctx) return;
  notes.forEach(([freq, start, dur, vol = 0.25]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t); osc.stop(t + dur + 0.05);
  });
}

function playSuccessSound() {
  playTones([
    [523.25, 0.00, 0.30],
    [659.25, 0.13, 0.30],
    [783.99, 0.26, 0.30],
    [1046.5, 0.39, 0.50],
  ]);
}

function playTimerEndSound() {
  playTones([
    [440, 0.0, 0.4, 0.2],
    [550, 0.4, 0.4, 0.2],
  ]);
}

function playCompletionSound() {
  playTones([
    [523.25, 0.00, 0.18],
    [523.25, 0.18, 0.18],
    [523.25, 0.36, 0.18],
    [659.25, 0.58, 0.32, 0.35],
    [587.33, 0.94, 0.16],
    [622.25, 1.12, 0.16],
    [659.25, 1.30, 0.55, 0.35],
    [783.99, 1.90, 0.80, 0.35],
  ]);
}

// ─────────────────────────────────────────────
// 音声合成（日本語TTS）
// ─────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang   = 'ja-JP';
    u.rate   = 1.0;
    u.pitch  = 1.3;
    u.volume = 1.0;
    speechSynthesis.speak(u);
  } catch(e) {}
}

// ─────────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────────
function fmtDur(secs) {
  if (secs < 60) return `${secs}びょう`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s === 0 ? `${m}ふん` : `${m}ふん${s}びょう`;
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function showQuickMsg(el, msg) {
  if (!el) return;
  const tip = document.createElement('div');
  tip.className = 'quick-msg';
  tip.textContent = msg;
  el.appendChild(tip);
  setTimeout(() => tip.remove(), 1600);
}

// ─────────────────────────────────────────────
// キャラクター
// ─────────────────────────────────────────────

function loadCharacter() {
  const saved = localStorage.getItem('mrapp_char');
  if (saved) {
    selectedChar = CHARACTERS.find(c => c.id === saved) || null;
    updateCharDisplay();
    // 起動時の挨拶（少し遅らせて）
    if (selectedChar) {
      setTimeout(() => showCharBubble(selectedChar.greeting), 800);
    }
  } else {
    // 初回：キャラ選択を表示
    setTimeout(() => openCharSelect(), 400);
  }
}

function updateCharDisplay() {
  if (!selectedChar) return;
  document.getElementById('char-emoji').textContent = selectedChar.emoji;
  // キャラカラーでボーダー演出
  document.getElementById('char-body').style.borderColor =
    selectedChar.color + '99';
  document.getElementById('char-body').style.boxShadow =
    `0 6px 22px rgba(0,0,0,0.35), 0 0 0 3px ${selectedChar.color}44`;
}

function showCharBubble(text) {
  if (!text) return;
  const bubble  = document.getElementById('char-bubble');
  const textEl  = document.getElementById('char-bubble-text');
  const charEl  = document.getElementById('char-body');

  // テキスト更新
  textEl.textContent = text;
  bubble.classList.remove('out', 'hidden');

  // キャラジャンプ
  charEl.classList.remove('happy');
  void charEl.offsetWidth; // reflow
  charEl.classList.add('happy');

  clearTimeout(bubbleTmo);
  bubbleTmo = setTimeout(() => {
    bubble.classList.add('out');
    setTimeout(() => bubble.classList.add('hidden'), 260);
  }, 3200);
}

function openCharSelect() {
  const overlay = document.getElementById('char-select-overlay');
  const grid    = document.getElementById('char-grid-sel');
  grid.innerHTML = '';

  CHARACTERS.forEach(c => {
    const el = document.createElement('div');
    el.className = 'char-opt' + (selectedChar?.id === c.id ? ' sel' : '');
    el.innerHTML = `
      <div class="char-opt-emoji">${c.emoji}</div>
      <div class="char-opt-name">${c.name}</div>`;
    el.addEventListener('click', () => {
      document.querySelectorAll('.char-opt').forEach(o => o.classList.remove('sel'));
      el.classList.add('sel');
      selectedChar = c;
    });
    grid.appendChild(el);
  });

  overlay.classList.remove('hidden');
}

function closeCharSelect() {
  if (!selectedChar) selectedChar = CHARACTERS[0];
  localStorage.setItem('mrapp_char', selectedChar.id);
  updateCharDisplay();
  document.getElementById('char-select-overlay').classList.add('hidden');
  setTimeout(() => showCharBubble(selectedChar.greeting), 400);
  speak(selectedChar.greeting);
}

// ─────────────────────────────────────────────
// 状態の永続化（localStorage）
// ─────────────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem('mrapp_v1', JSON.stringify({
      done: [...completed],
      date: new Date().toDateString(),
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const d = JSON.parse(localStorage.getItem('mrapp_v1') || 'null');
    if (d && d.date === new Date().toDateString()) {
      d.done.forEach(id => completed.add(Number(id)));
    }
  } catch(e) {}
}

// ─────────────────────────────────────────────
// タスクの永続化
// ─────────────────────────────────────────────
function saveTasks() {
  try { localStorage.setItem('mrapp_tasks_v1', JSON.stringify(TASKS)); } catch(e) {}
}

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem('mrapp_tasks_v1') || 'null');
    if (Array.isArray(saved) && saved.length > 0) {
      TASKS = saved;
    } else {
      TASKS = DEFAULT_TASKS.map(t => ({ ...t }));
    }
  } catch(e) {
    TASKS = DEFAULT_TASKS.map(t => ({ ...t }));
  }
}

// ─────────────────────────────────────────────
// PIN
// ─────────────────────────────────────────────
let pinBuffer = '';

function getStoredPin() { return localStorage.getItem('mrapp_pin') || '0000'; }

function openPinScreen() {
  pinBuffer = '';
  updatePinDisplay();
  document.getElementById('pin-error').classList.add('hidden');
  document.getElementById('pin-overlay').classList.remove('hidden');
}

function closePinScreen() {
  document.getElementById('pin-overlay').classList.add('hidden');
}

function onPinDigit(d) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += d;
  updatePinDisplay();
  if (pinBuffer.length === 4) setTimeout(verifyPin, 180);
}

function onPinDelete() {
  pinBuffer = pinBuffer.slice(0, -1);
  updatePinDisplay();
}

function onPinClear() {
  pinBuffer = '';
  updatePinDisplay();
}

function updatePinDisplay() {
  document.querySelectorAll('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < pinBuffer.length);
  });
}

function verifyPin() {
  if (pinBuffer === getStoredPin()) {
    closePinScreen();
    openSettingsScreen();
  } else {
    pinBuffer = '';
    updatePinDisplay();
    const err = document.getElementById('pin-error');
    err.classList.remove('hidden');
    setTimeout(() => err.classList.add('hidden'), 2000);
  }
}

// ─────────────────────────────────────────────
// 設定画面
// ─────────────────────────────────────────────
function openSettingsScreen() {
  renderSettingsTasks();
  document.getElementById('new-pin-input').value = '';
  document.getElementById('pin-change-msg').classList.add('hidden');
  document.getElementById('settings-overlay').classList.remove('hidden');
}

function closeSettings() {
  saveTasks();
  document.getElementById('settings-overlay').classList.add('hidden');
  // 今日の完了済みIDのうち削除されたタスクを除外
  const activeIds = new Set(getActiveTasks().map(t => t.id));
  [...completed].forEach(id => { if (!activeIds.has(id)) completed.delete(id); });
  saveState();
  renderTasks();
  updateHeader();
}

function renderSettingsTasks() {
  const list = document.getElementById('settings-task-list');
  list.innerHTML = '';

  TASKS.forEach(task => {
    const row = document.createElement('div');
    row.className = 's-task-row';
    row.dataset.id = task.id;

    const durMin = Math.round(task.duration / 60);

    row.innerHTML = `
      <label class="s-toggle">
        <input type="checkbox" ${task.enabled !== false ? 'checked' : ''}
          onchange="toggleTask(${task.id}, this.checked)">
        <div class="s-toggle-track"></div>
      </label>
      <button class="s-emoji-btn" title="タップで絵文字をかえる"
        onclick="cycleEmoji(${task.id})">${task.emoji}</button>
      <input class="s-name-input" type="text" value="${task.name}"
        oninput="updateTaskName(${task.id}, this.value)" maxlength="10">
      <div class="s-duration">
        <button class="s-dur-btn" onclick="adjustDuration(${task.id}, -60)">−</button>
        <span class="s-dur-label" id="dur-${task.id}">${durMin}ふん</span>
        <button class="s-dur-btn" onclick="adjustDuration(${task.id}, 60)">＋</button>
      </div>
      <button class="s-del-btn" onclick="deleteTask(${task.id})" title="タスクをけす">🗑</button>`;

    list.appendChild(row);
  });
}

function toggleTask(id, enabled) {
  const task = TASKS.find(t => t.id === id);
  if (task) task.enabled = enabled;
}

function cycleEmoji(id) {
  const task = TASKS.find(t => t.id === id);
  if (!task) return;
  const idx = EMOJI_OPTIONS.indexOf(task.emoji);
  task.emoji = EMOJI_OPTIONS[(idx + 1) % EMOJI_OPTIONS.length];
  renderSettingsTasks();
}

function updateTaskName(id, val) {
  const task = TASKS.find(t => t.id === id);
  if (task && val.trim()) task.name = val.trim();
}

function adjustDuration(id, delta) {
  const task = TASKS.find(t => t.id === id);
  if (!task) return;
  task.duration = Math.max(60, task.duration + delta);
  const min = Math.round(task.duration / 60);
  const el = document.getElementById(`dur-${id}`);
  if (el) el.textContent = `${min}ふん`;
}

function addTask() {
  const colorSet = TASK_COLORS[TASKS.length % TASK_COLORS.length];
  TASKS.push({
    id: Date.now(),
    name: 'あたらしいタスク',
    emoji: EMOJI_OPTIONS[Math.floor(Math.random() * EMOJI_OPTIONS.length)],
    duration: 60,
    c1: colorSet[0], c2: colorSet[1],
    enabled: true,
  });
  renderSettingsTasks();
  // スクロールで新タスクを表示
  const list = document.getElementById('settings-task-list');
  list.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
}

function deleteTask(id) {
  if (TASKS.length <= 1) return; // 最低1つ残す
  TASKS = TASKS.filter(t => t.id !== id);
  renderSettingsTasks();
}

function changePin() {
  const input = document.getElementById('new-pin-input');
  const val   = input.value.trim();
  const msg   = document.getElementById('pin-change-msg');
  msg.classList.remove('hidden', 'error');

  if (!/^\d{4}$/.test(val)) {
    msg.textContent = '4けたのかずをいれてね';
    msg.classList.add('error');
    return;
  }
  localStorage.setItem('mrapp_pin', val);
  input.value = '';
  msg.textContent = '✅ PINをかえました！';
  setTimeout(() => msg.classList.add('hidden'), 2500);
}
