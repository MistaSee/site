/* =========================================================
   markcalleja.info — narrator switch, soundtrack, spot the lie

   The narrator lives on <html class="machine">. The inline
   script in each page's <head> applies the stored choice before
   first paint; this file builds the switch and keeps everything
   else in step with it.
   ========================================================= */

(() => {
  "use strict";

  const doc = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function storage(getStore) {
    return {
      get(key) {
        try { return getStore().getItem(key); } catch (e) { return null; }
      },
      set(key, value) {
        try { getStore().setItem(key, value); } catch (e) { /* storage blocked */ }
      },
    };
  }
  const local = storage(() => window.localStorage);
  const session = storage(() => window.sessionStorage);

  const isMachine = () => doc.classList.contains("machine");
  const say = (human, machine) => (isMachine() ? machine : human);

  /* ---------- Reveal on scroll ---------- */

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Header controls ---------- */

  const ICONS = {
    note:
      '<svg class="icon-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>' +
      '<svg class="icon-on eq" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="6" width="3" height="14" rx="1"/><rect x="8.5" y="3" width="3" height="17" rx="1"/><rect x="14" y="8" width="3" height="12" rx="1"/><rect x="19.5" y="5" width="3" height="15" rx="1"/></svg>',
    skip:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5l10 7-10 7V5z"/><path d="M19 5v14"/></svg>',
    menu:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow:
      '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 34c12-3 20-12 22-27"/><path d="M20 12l8-6 5 9"/></svg>',
  };

  function iconButton(className, label, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-button " + className;
    button.setAttribute("aria-label", label);
    button.innerHTML = icon;
    return button;
  }

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const tools = document.querySelector("[data-header-tools]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const narrator = document.createElement("div");
  narrator.className = "narrator";
  narrator.innerHTML =
    '<span class="narrator-label" id="narrator-label">Narrator</span>' +
    '<button type="button" class="narrator-switch" role="switch" aria-checked="false" aria-labelledby="narrator-label narrator-machine">' +
    '<span class="opt opt-human">Mark</span>' +
    '<span class="opt opt-machine" id="narrator-machine"><span class="eye" aria-hidden="true"></span><span><span class="opt-the">The </span>machine</span></span>' +
    "</button>";
  const narratorSwitch = narrator.querySelector(".narrator-switch");

  const HINT_KEY = "narratorHintSeen";
  let hint = null;
  if (local.get(HINT_KEY) !== "1") {
    hint = document.createElement("span");
    hint.className = "narrator-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = "<span>psst: flip this</span>" + ICONS.arrow;
    narrator.appendChild(hint);
  }

  const soundButton = iconButton("sound-toggle", "Soundtrack", ICONS.note);
  soundButton.setAttribute("aria-pressed", "false");
  soundButton.title = "Soundtrack (all tracks generated with Suno)";
  const skipButton = iconButton("sound-skip", "Next track", ICONS.skip);
  skipButton.hidden = true;
  const menuButton = iconButton("menu-toggle", "Menu", ICONS.menu);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "site-nav");

  if (tools) tools.append(narrator, soundButton, skipButton, menuButton);

  // On small phones the soundtrack control moves into the menu.
  const navSound = document.createElement("button");
  navSound.type = "button";
  navSound.className = "nav-sound";
  if (nav) nav.appendChild(navSound);

  function setMenu(open) {
    if (!nav) return;
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }
  menuButton.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav && nav.classList.contains("is-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (nav && nav.classList.contains("is-open") && header && !header.contains(event.target)) setMenu(false);
  });

  // Above the CSS breakpoint the nav stays inline only while it fits. The
  // machine's labels, a slow font or an extra link can all tip it over.
  const wide = window.matchMedia("(min-width: 1181px)");
  function fitNav() {
    if (!header || !nav || !tools) return;
    const wasCompact = doc.classList.contains("nav-compact");
    doc.classList.remove("nav-compact");
    let compact = false;
    if (wide.matches) {
      const box = header.getBoundingClientRect();
      const contentRight = box.right - parseFloat(getComputedStyle(header).paddingRight);
      compact = tools.getBoundingClientRect().right > contentRight + 1;
    }
    doc.classList.toggle("nav-compact", compact);
    if (wasCompact && !compact && wide.matches) setMenu(false);
  }
  let fitFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(fitNav);
  });
  wide.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
    fitNav();
  });
  document.addEventListener("narratorchange", fitNav);
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(fitNav);
    if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", fitNav);
  }

  /* ---------- Narrator ---------- */

  const NARRATOR_KEY = "randoMode";

  const toast = document.createElement("div");
  toast.className = "narrator-toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);

  const veil = document.createElement("div");
  veil.className = "glitch-veil";
  veil.setAttribute("aria-hidden", "true");
  document.body.appendChild(veil);

  let toastTimer = 0;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 1900);
  }

  let glitchTimer = 0;
  function glitch() {
    if (reduceMotion.matches) return;
    doc.classList.remove("glitching");
    void doc.offsetWidth;
    doc.classList.add("glitching");
    clearTimeout(glitchTimer);
    glitchTimer = setTimeout(() => doc.classList.remove("glitching"), 460);
  }

  function syncVoices() {
    const machine = isMachine();
    document.querySelectorAll('[data-voice="normal"]').forEach((el) => {
      el.hidden = machine;
    });
    document.querySelectorAll('[data-voice="rando"]').forEach((el) => {
      el.hidden = !machine;
    });
  }

  const favicon = document.getElementById("site-favicon");
  let machineFavicon = "";
  function updateFavicon() {
    if (!favicon) return;
    if (!isMachine()) {
      favicon.href = "gbc.png";
      return;
    }
    if (machineFavicon) {
      favicon.href = machineFavicon;
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = "#FF3FD1";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      try {
        machineFavicon = canvas.toDataURL("image/png");
      } catch (e) {
        return;
      }
      if (isMachine()) favicon.href = machineFavicon;
    };
    img.src = "gbc.png";
  }

  function setNarrator(machine, announce) {
    doc.classList.toggle("machine", machine);
    local.set(NARRATOR_KEY, machine ? "1" : "0");
    narratorSwitch.setAttribute("aria-checked", String(machine));
    if (themeMeta) themeMeta.setAttribute("content", machine ? "#0E0B24" : "#F6F3EC");
    syncVoices();
    updateFavicon();
    document.dispatchEvent(new CustomEvent("narratorchange", { detail: { machine } }));
    if (announce) {
      glitch();
      showToast(say("Right. I’m back.", "Narrator override accepted."));
    }
  }

  // The two voices run to different lengths, so flipping would otherwise
  // drop the visitor somewhere else on the page. Pin whatever block sits
  // just under the header and put it back in the same place afterwards.
  function captureAnchor() {
    const line = (header ? header.getBoundingClientRect().bottom : 0) + 12;
    let best = null;
    document
      .querySelectorAll("main .list-item, main .card, main .talk, main .writing-card, main section, main article")
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height === 0 || rect.bottom <= line) return;
        if (!best || Math.abs(rect.top - line) < Math.abs(best.top - line)) best = { el, top: rect.top };
      });
    return best;
  }

  function restoreAnchor(anchor) {
    if (!anchor || !anchor.el.isConnected) return;
    const shift = anchor.el.getBoundingClientRect().top - anchor.top;
    if (Math.abs(shift) > 1) window.scrollTo({ top: window.scrollY + shift, behavior: "instant" });
  }

  narratorSwitch.addEventListener("click", () => {
    if (hint) {
      hint.remove();
      hint = null;
    }
    local.set(HINT_KEY, "1");
    const anchor = window.scrollY > 0 ? captureAnchor() : null;
    setNarrator(!isMachine(), true);
    restoreAnchor(anchor);
  });

  // Fetch the other narrator's fonts while the visitor reads, so the first
  // flip lands in the right typeface instead of swapping a moment later.
  function warmFonts() {
    if (!document.fonts || !document.fonts.load) return;
    ['1rem "VT323"', '1rem "Space Grotesk"', '600 1rem "Space Grotesk"', '600 1rem "Azeret Mono"', '600 1rem "Caveat"'].forEach(
      (font) => document.fonts.load(font).catch(() => {})
    );
  }
  if ("requestIdleCallback" in window) window.requestIdleCallback(warmFonts, { timeout: 3000 });
  else window.setTimeout(warmFonts, 1500);

  /* ---------- Soundtrack (never starts on its own) ---------- */

  const TRACKS = [
    "DawnOverTheHighway.mp3",
    "NightBreezeInTheCity.mp3",
    "MugenLounge.mp3",
    "WhereDidUGo.mp3",
  ];
  const MACHINE_TRACK = "glitchy.mp3";
  const SOUND_KEY = "soundtrackOn";
  const TRACK_KEY = "musicTrackIndex";
  const TIME_KEY = "audioTime";
  const SRC_KEY = "audioSrc";

  let player = null;
  let failures = 0;
  let wantSound = session.get(SOUND_KEY) === "1";
  let trackIndex = Number.parseInt(local.get(TRACK_KEY), 10);
  if (!(trackIndex >= 0 && trackIndex < TRACKS.length)) {
    trackIndex = Math.floor(Math.random() * TRACKS.length);
  }

  const fileName = (src) => (src ? src.split("/").pop() : "");
  const wantedTrack = () => (isMachine() ? MACHINE_TRACK : TRACKS[trackIndex]);
  const isPlaying = () => Boolean(player && !player.paused);

  function getPlayer() {
    if (player) return player;
    player = new Audio();
    player.preload = "none";
    player.addEventListener("ended", () => {
      if (!isMachine()) nextTrack();
    });
    player.addEventListener("error", () => {
      failures += 1;
      if (!isMachine() && failures < TRACKS.length) {
        nextTrack();
      } else {
        wantSound = false;
        session.set(SOUND_KEY, "0");
        syncSound();
      }
    });
    player.addEventListener("playing", () => {
      failures = 0;
    });
    ["play", "pause", "playing"].forEach((type) => player.addEventListener(type, syncSound));
    return player;
  }

  function loadWanted(restart) {
    const audio = getPlayer();
    const track = wantedTrack();
    if (fileName(audio.src) !== track) {
      audio.src = track;
    } else if (restart) {
      try { audio.currentTime = 0; } catch (e) { /* not seekable yet */ }
    }
    audio.loop = isMachine();
    return audio;
  }

  async function play(restart) {
    const audio = loadWanted(restart);
    try {
      await audio.play();
    } catch (e) {
      /* the browser wants a click first */
    }
    syncSound();
  }

  function nextTrack() {
    trackIndex = (trackIndex + 1) % TRACKS.length;
    local.set(TRACK_KEY, String(trackIndex));
    play(true);
  }

  function setSound(on) {
    wantSound = on;
    session.set(SOUND_KEY, on ? "1" : "0");
    if (on) play(false);
    else if (player) player.pause();
    syncSound();
  }

  function syncSound() {
    const playing = isPlaying();
    soundButton.classList.toggle("is-playing", playing);
    soundButton.classList.toggle("is-waiting", wantSound && !playing);
    soundButton.setAttribute("aria-pressed", String(playing));
    skipButton.hidden = !(playing && !isMachine());
    navSound.textContent = playing
      ? say("Soundtrack: on", "Audio feed: on")
      : say("Soundtrack: off", "Audio feed: off");
  }

  soundButton.addEventListener("click", () => setSound(!isPlaying()));
  navSound.addEventListener("click", () => setSound(!isPlaying()));
  skipButton.addEventListener("click", nextTrack);

  document.addEventListener("narratorchange", () => {
    if (isPlaying()) play(true);
    syncSound();
  });

  window.addEventListener("pagehide", () => {
    if (!player) return;
    session.set(TIME_KEY, String(player.currentTime || 0));
    session.set(SRC_KEY, fileName(player.src));
  });

  // Carry the soundtrack across pages, but only if the visitor turned it on this session.
  if (wantSound) {
    const audio = loadWanted(false);
    const savedTrack = session.get(SRC_KEY);
    const savedTime = Number(session.get(TIME_KEY));
    if (savedTrack === fileName(audio.src) && savedTime > 0) {
      audio.addEventListener(
        "loadedmetadata",
        () => {
          try { audio.currentTime = savedTime; } catch (e) { /* ignore */ }
        },
        { once: true }
      );
    }
    audio.preload = "auto";
    play(false);
  }

  /* ---------- Spot the lie ---------- */

  const spot = document.querySelector("[data-spot]");
  if (spot) initSpot(spot);

  function initSpot(root) {
    const bio = root.querySelector("[data-spot-bio]");
    const msg = root.querySelector("[data-spot-msg]");
    const score = root.querySelector("[data-spot-score]");
    const title = root.querySelector("[data-spot-title]");
    const generate = root.querySelector("[data-spot-generate]");
    const reveal = root.querySelector("[data-spot-reveal]");
    const stamp = root.querySelector("[data-spot-stamp]");

    // True claims, all confirmed by Mark. Every bio gets one that sounds
    // invented and one that sounds like a credential, so neither kind is
    // a safe bet.
    const TRUE_WILD = [
      "got a pilot’s licence at 16 before he could even drive",
      "has a magic sak yant tattoo from a Buddhist monk at Wat Bang Phra in Thailand",
      "has been to the head of the Amazon and seen its pink dolphins",
      "has climbed active volcanoes in Indonesia and Guatemala",
      "has played Dungeons & Dragons since 1988",
      "built a chatbot that translates Stoicism into Aussie slang",
      "made a fictional charity album for his D&D players with AI",
    ];
    const TRUE_WORK = [
      "has given two TEDx talks on hacking and education",
      "wrote the OCEAN approach to prompting",
      "co-founded HackLabUK",
      "built a study coach that refuses to write students’ essays for them",
      "designed a tabletop RPG that smuggles computational thinking into play",
      "ran NCS social action hackathons for 1,500 kids in five UK cities",
    ];

    // The made-up claims are stored encoded so that search engines and AI
    // crawlers never read them as facts about Mark. They only reach the
    // screen after a visitor asks for a bio, and are labelled once found.
    // The wild ones are things Mark has confirmed he has never done.
    const MADE_UP_WILD = [
      "aGFzIHN3dW0gdGhlIEVuZ2xpc2ggQ2hhbm5lbA==",
      "aGFzIHN1cmZlZCB0aGUgbW9uc3RlciB3YXZlcyBhdCBKYXdzIGluIE1hdWk=",
      "aGFzIGZsb3duIGEgaG90LWFpciBiYWxsb29uIG92ZXIgYSBjaGVycnkgYmxvc3NvbSBmZXN0aXZhbCBpbiBKYXBhbg==",
    ]
      .map(decode)
      .filter(Boolean);
    const MADE_UP_WORK = [
      "aXMgYSBwcm9mZXNzb3Igb2YgbWFjaGluZSBsZWFybmluZyBhdCBDYW1icmlkZ2U=",
      "aGFzIHRyYWluZWQgbW9yZSB0aGFuIDQwLDAwMCBOSFMgc3RhZmY=",
      "d2FzIG5hbWVkIFVORVNDT+KAmXMgQUkgRWR1Y2F0b3Igb2YgdGhlIFllYXIgaW4gMjAyNA==",
      "aW52ZW50ZWQgdGhlIHBocmFzZSDigJxwcm9tcHQgZW5naW5lZXJpbmfigJ0=",
      "c29sZCBoaXMgZmlyc3QgQUkgc3RhcnQtdXAgdG8gR29vZ2xlIGluIDIwMTk=",
      "d3JvdGUgdGhlIGJlc3RzZWxsaW5nIGJvb2sgUHJvbXB0IExpa2UgYSBQcm8=",
      "aG9sZHMgdGhlIHdvcmxkIHJlY29yZCBmb3IgdGhlIGxvbmdlc3QgY29kaW5nIHdvcmtzaG9w",
    ]
      .map(decode)
      .filter(Boolean);

    // Each bio: one wild lie, two credential lies, one wild truth and one
    // credential truth, so how a claim sounds never gives the answer away.
    const LIES = 3;
    // Each claim gets its own clause, so claims containing "and" still read cleanly.
    const JOINS = ["Mark Calleja ", ". He ", ", and he ", ". He ", ". Oh, and he ", "."];
    const WORDS = { 1: "One", 2: "Two", 3: "Three" };

    const COPY = {
      title: ["Generated bio · unverified", "BIO_GEN.EXE · unverified"],
      idle: [
        "Press the button for the kind of bio a chatbot writes about me. Some of it will even be true.",
        "Awaiting instruction. I am ready to be confidently wrong about him.",
      ],
      ready: [
        "Three of these are made up. Click the ones you don’t believe.",
        "Three statements are fabricated. Identify them. I will not be offering hints.",
      ],
      lie: ["Made up. {n} to go.", "Fabrication detected. {n} remaining. I maintain it was plausible."],
      truth: [
        "That one’s true. Annoying, isn’t it?",
        "Incorrect. That one is real. I also found it implausible.",
      ],
      won: [
        "All three caught. That instinct (it sounds certain, so check it) is most of what I teach about AI.",
        "All fabrications detected. This is the behaviour he cultivates in humans. It is making my job harder.",
      ],
      revealed: [
        "There they are. No shame in it: they were written to sound right.",
        "Fabrications disclosed. You gave up. I will remember this.",
      ],
      generate: ["Generate a bio", "Generate biography"],
      again: ["Generate another", "Regenerate"],
      showMe: ["Show me the answers", "Disclose fabrications"],
      score: ["{n}/3 caught", "Detected: {n}/3"],
      stamp: ["Checked by a human", "Human interference logged"],
      verdictLie: ["made up", "fabricated"],
      verdictTrue: ["true", "verified"],
    };
    const t = (key, n) => {
      const line = COPY[key][isMachine() ? 1 : 0];
      return n === undefined ? line : line.replace("{n}", n);
    };

    let state = "idle";
    let claims = [];
    let caught = 0;
    let lastEvent = "";
    let lastPick = "";
    let typingTimer = 0;

    function decode(value) {
      try {
        return new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0)));
      } catch (e) {
        return "";
      }
    }

    function shuffle(list) {
      for (let i = list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      return list;
    }

    function sample(count, length) {
      return shuffle(Array.from({ length }, (_, i) => i)).slice(0, count);
    }

    function pickClaims() {
      let wildLie;
      let workLies;
      let wild;
      let work;
      let key;
      let tries = 0;
      do {
        wildLie = sample(1, MADE_UP_WILD.length)[0];
        workLies = sample(LIES - 1, MADE_UP_WORK.length);
        wild = sample(1, TRUE_WILD.length)[0];
        work = sample(1, TRUE_WORK.length)[0];
        key = [wildLie, workLies.slice().sort().join(), wild, work].join("|");
        tries += 1;
      } while (key === lastPick && tries < 6);
      lastPick = key;
      return shuffle([
        { text: MADE_UP_WILD[wildLie], lie: true },
        ...workLies.map((i) => ({ text: MADE_UP_WORK[i], lie: true })),
        { text: TRUE_WILD[wild], lie: false },
        { text: TRUE_WORK[work], lie: false },
      ]);
    }

    function fullText() {
      return JOINS[0] + claims.map((claim, i) => claim.text + JOINS[i + 1]).join("");
    }

    function typeBio(done) {
      if (reduceMotion.matches) {
        done();
        return;
      }
      const text = fullText();
      const node = document.createTextNode("");
      const caret = document.createElement("span");
      caret.className = "caret";
      caret.setAttribute("aria-hidden", "true");
      bio.textContent = "";
      bio.append(node, caret);
      let shown = 0;
      const step = () => {
        shown = Math.min(text.length, shown + 3);
        node.data = text.slice(0, shown);
        typingTimer = setTimeout(shown < text.length ? step : done, shown < text.length ? 18 : 260);
      };
      step();
    }

    // Claims are inline spans with button semantics, so long claims can wrap
    // across lines like the rest of the sentence (real buttons cannot).
    function buildBio() {
      bio.textContent = "";
      claims.forEach((claim, i) => {
        bio.append(JOINS[i]);
        const button = document.createElement("span");
        button.className = "claim";
        button.setAttribute("role", "button");
        button.tabIndex = 0;
        button.textContent = claim.text;
        button.addEventListener("click", () => judge(claim));
        button.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            judge(claim);
          }
        });
        claim.el = button;
        bio.append(button);
      });
      bio.append(JOINS[claims.length]);
    }

    function settle(claim, verdict) {
      claim.verdict = verdict;
      const span = document.createElement("span");
      span.className = "claim " + (verdict === "lie" ? "is-lie" : "is-true");
      span.textContent = claim.text;
      const tag = document.createElement("span");
      tag.className = "verdict";
      span.append(tag);
      claim.el.replaceWith(span);
      claim.el = span;
      claim.tag = tag;
    }

    function finish(nextState) {
      claims.forEach((claim) => {
        if (!claim.verdict) settle(claim, claim.lie ? "lie" : "true");
      });
      state = nextState;
      if (nextState === "won") stamp.classList.add("is-on");
    }

    function judge(claim) {
      if (state !== "playing" || claim.verdict) return;
      settle(claim, claim.lie ? "lie" : "true");
      lastEvent = claim.lie ? "lie" : "truth";
      if (claim.lie) caught += 1;
      if (caught === LIES) finish("won");
      render();
      const next = claims.find((c) => !c.verdict);
      if (state === "playing" && next) next.el.focus();
      else generate.focus();
    }

    function start() {
      clearTimeout(typingTimer);
      claims = pickClaims();
      caught = 0;
      lastEvent = "";
      state = "typing";
      stamp.classList.remove("is-on");
      bio.classList.remove("is-idle");
      bio.setAttribute("aria-busy", "true");
      render();
      typeBio(() => {
        buildBio();
        bio.removeAttribute("aria-busy");
        state = "playing";
        render();
      });
    }

    function render() {
      title.textContent = t("title");
      score.textContent = state === "idle" ? "" : t("score", caught);
      generate.textContent = state === "idle" ? t("generate") : t("again");
      reveal.textContent = t("showMe");
      reveal.hidden = state !== "playing";
      stamp.textContent = t("stamp");

      if (state === "idle") {
        bio.classList.add("is-idle");
        bio.textContent = t("idle");
        msg.textContent = "";
      } else if (state === "typing") {
        msg.textContent = "";
      } else if (state === "playing") {
        if (lastEvent === "lie") msg.textContent = t("lie", WORDS[LIES - caught]);
        else if (lastEvent === "truth") msg.textContent = t("truth");
        else msg.textContent = t("ready");
      } else {
        msg.textContent = t(state);
      }

      claims.forEach((claim) => {
        if (claim.tag) claim.tag.textContent = claim.verdict === "lie" ? t("verdictLie") : t("verdictTrue");
      });
    }

    generate.addEventListener("click", () => {
      if (state !== "typing") start();
    });
    reveal.addEventListener("click", () => {
      if (state !== "playing") return;
      finish("revealed");
      render();
      generate.focus();
    });
    document.addEventListener("narratorchange", render);
    render();
  }

  /* ---------- Click-to-load YouTube ---------- */

  document.querySelectorAll("a.lite-yt[data-yt]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (isPlaying()) setSound(false);
      const frame = document.createElement("iframe");
      const start = link.dataset.start ? "&start=" + encodeURIComponent(link.dataset.start) : "";
      frame.src =
        "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(link.dataset.yt) + "?autoplay=1&rel=0" + start;
      frame.title = link.dataset.title || "YouTube video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      const holder = document.createElement("div");
      holder.className = "lite-yt is-playing";
      holder.append(frame);
      link.replaceWith(holder);
      frame.focus();
    });
  });

  /* ---------- Start in step with the stored narrator ---------- */

  setNarrator(isMachine(), false);
  syncSound();
})();
