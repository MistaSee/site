/* ========== existing reveal logic (preserved) ========== */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((item) => observer.observe(item));

// Fallback for mobile browsers where IntersectionObserver can miss updates
// when the scroll container is not the default document viewport.
setTimeout(() => {
  reveals.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      item.classList.add("is-visible");
      observer.unobserve(item);
    }
  });
}, 1200);

/* ========== RANDO-MODE TOGGLE (injects an undescribed corner button) ========== */

/*
Behavior:
- Injects a small circular button into the top-right corner.
- Clicking toggles .rando-mode on <body>.
- State is persisted in localStorage under "randoMode".
- The button has no label text on the page (mystery mode), but is keyboard-focusable and accessible (aria).
- If the user has 'prefers-reduced-motion: reduce' we avoid adding fast animations.
*/

(function() {
  const STORAGE_KEY = "randoMode";
  const MUSIC_INDEX_KEY = "musicTrackIndex";
  const MUSIC_MUTED_KEY = "musicMuted";
  const GLITCH_TRACK = "glitchy.mp3";
  const TRACKS = [
    "DawnOverTheHighway.mp3",
    "NightBreezeInTheCity.mp3",
    "MugenLounge.mp3",
    "WhereDidUGo.mp3",
  ];

  function createToggle() {
    const btn = document.createElement("button");
    btn.className = "rando-toggle";
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Toggle rando mode"); // accessible label but not visible
    btn.title = ""; // leave title blank so it remains undescribed on hover (optional)

    const dot = document.createElement("span");
    dot.className = "rando-toggle__dot";
    btn.appendChild(dot);

    // keyboard activation (Enter/Space)
    btn.addEventListener("keydown", (ev) => {
      if (ev.key === " " || ev.key === "Enter") {
        ev.preventDefault();
        btn.click();
      }
    });

    return btn;
  }

  function createMusicToggle() {
    const btn = document.createElement("button");
    btn.className = "music-toggle";
    btn.type = "button";
    btn.textContent = "🎵";
    btn.setAttribute("aria-label", "Change tune");
    btn.setAttribute("data-tooltip", "all tracks generated with Suno");
    btn.title = "all tracks generated with Suno";
    return btn;
  }

  function createMuteToggle() {
    const btn = document.createElement("button");
    btn.className = "mute-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Mute music");
    return btn;
  }

  function applyRandoMode(enabled) {
    const target = document.body || document.documentElement;
    if (!target) return;
    // We'll toggle class on the <body> element. Older pages use <body class="page"> and that will be fine.
    if (enabled) {
      target.classList.add("rando-mode");
    } else {
      target.classList.remove("rando-mode");
    }
    // keep button state in sync
    const btn = document.querySelector(".rando-toggle");
    if (btn) {
      btn.classList.toggle("active", enabled);
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
    }
  }

  function readStored() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function writeStored(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val ? "1" : "0");
    } catch (e) {
      // ignore
    }
  }

  function readTrackIndex() {
    try {
      const value = Number(localStorage.getItem(MUSIC_INDEX_KEY));
      return Number.isInteger(value) ? value : -1;
    } catch (e) {
      return -1;
    }
  }

  function writeTrackIndex(index) {
    try {
      localStorage.setItem(MUSIC_INDEX_KEY, String(index));
    } catch (e) {
      // ignore
    }
  }

  function readMuted() {
    try {
      return localStorage.getItem(MUSIC_MUTED_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function writeMuted(val) {
    try {
      localStorage.setItem(MUSIC_MUTED_KEY, val ? "1" : "0");
    } catch (e) {
      // ignore
    }
  }

  // Wait for DOM ready-ish
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }

  function initToggle() {
    // do not inject if an element with same class already exists
    if (document.querySelector(".rando-toggle")) return;

    const btn = createToggle();
    document.body.appendChild(btn);

    // initial state from storage
    const initial = readStored();
    applyRandoMode(initial);
    if (initial) btn.classList.add("active");

    btn.addEventListener("click", () => {
      const enabled = !document.body.classList.contains("rando-mode");
      applyRandoMode(enabled);
      writeStored(enabled);
      syncModeMusic(enabled);
      // small visual tick (subtle)
      btn.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
        { duration: 260, easing: "ease-out" }
      );
    });

    const musicBtn = createMusicToggle();
    const muteBtn = createMuteToggle();
    const player = new Audio();
    let trackIndex = readTrackIndex();
    let isMuted = readMuted();

    player.preload = "auto";

    function syncMuteUI() {
      player.muted = isMuted;
      muteBtn.textContent = isMuted ? "🔇" : "🔊";
      muteBtn.title = isMuted ? "Unmute music" : "Mute music";
      muteBtn.setAttribute("aria-label", muteBtn.title);
      muteBtn.classList.toggle("active", isMuted);
    }

    function pickRandomTrackIndex() {
      return Math.floor(Math.random() * TRACKS.length);
    }

    async function playCurrentTrack(restart = false) {
      if (trackIndex < 0) {
        trackIndex = 0;
        writeTrackIndex(trackIndex);
      }

      const nextSrc = TRACKS[trackIndex];
      const activeSrc = player.src ? player.src.split("/").pop() : "";

      if (activeSrc !== nextSrc) {
        player.src = nextSrc;
        player.load();
      }

      player.loop = false;

      if (restart) {
        player.currentTime = 0;
      }

      if (isMuted) return;

      try {
        await player.play();
      } catch (e) {
        // ignore autoplay policy errors
      }
    }

    function isRandoModeOn() {
      return document.body.classList.contains("rando-mode");
    }

    async function playGlitchTrack(restart = false) {
      const activeSrc = player.src ? player.src.split("/").pop() : "";

      if (activeSrc !== GLITCH_TRACK) {
        player.src = GLITCH_TRACK;
        player.load();
      }

      player.loop = true;

      if (restart) {
        player.currentTime = 0;
      }

      if (isMuted) return;

      try {
        await player.play();
      } catch (e) {
        // ignore autoplay policy errors
      }
    }

    async function playNextTrack() {
      if (isMuted || isRandoModeOn()) return;
      trackIndex = (trackIndex + 1) % TRACKS.length;
      writeTrackIndex(trackIndex);
      await playCurrentTrack(true);
    }

    function syncModeMusic(enabled) {
      if (enabled) {
        playGlitchTrack(true);
      } else {
        playCurrentTrack(true);
      }
    }

    player.addEventListener("ended", () => {
      if (isRandoModeOn()) {
        playGlitchTrack(true);
      } else {
        playNextTrack();
      }
    });

    player.addEventListener("error", () => {
      if (isRandoModeOn()) {
        playGlitchTrack(true);
      } else {
        playNextTrack();
      }
    });

    if (!initial) {
      trackIndex = pickRandomTrackIndex();
      writeTrackIndex(trackIndex);
    }

    syncMuteUI();

    musicBtn.addEventListener("click", async () => {
      if (isRandoModeOn()) {
        await playGlitchTrack(true);
        return;
      }
      trackIndex = (trackIndex + 1) % TRACKS.length;
      writeTrackIndex(trackIndex);
      await playCurrentTrack(true);
      musicBtn.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
        { duration: 260, easing: "ease-out" }
      );
    });

    muteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      writeMuted(isMuted);
      syncMuteUI();
      if (isMuted) {
        player.pause();
      } else {
        if (isRandoModeOn()) {
          playGlitchTrack(true);
        } else {
          playCurrentTrack(true);
        }
      }
      muteBtn.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
        { duration: 260, easing: "ease-out" }
      );
    });

    // Try autoplay immediately, then retry once on first user interaction if blocked.
    if (isRandoModeOn()) {
      playGlitchTrack(true);
    } else {
      playCurrentTrack(true);
    }
    const unlockAudio = () => {
      if (!isMuted && player.paused) {
        if (isRandoModeOn()) {
          playGlitchTrack(false);
        } else {
          playCurrentTrack(false);
        }
      }
    };
    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });

    document.body.appendChild(musicBtn);
    document.body.appendChild(muteBtn);
  }
})();
