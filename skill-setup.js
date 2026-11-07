(() => {
  document.querySelectorAll('[data-skill-setup]').forEach((panel) => {
    const button = panel.querySelector('[data-copy-setup]');
    const prompt = panel.querySelector('textarea');
    const status = panel.querySelector('[role="status"]');
    const details = panel.querySelector('details');
    if (!button || !prompt || !status || !details) return;
    button.hidden = false;
    let reset;

    button.addEventListener('click', async () => {
      clearTimeout(reset);
      button.disabled = true;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(prompt.value);
          copied = true;
        }
      } catch (_) {
        // A denied clipboard permission still leaves a manual copy route.
      }
      if (!copied) {
        details.open = true;
        prompt.focus();
        prompt.select();
        try { copied = document.execCommand('copy'); } catch (_) {}
      }
      button.disabled = false;
      if (copied) {
        button.textContent = 'Copied!';
        status.textContent = 'Setup prompt copied. Paste it into your AI agent.';
        button.focus();
        reset = setTimeout(() => { button.textContent = 'Copy prompt'; }, 2500);
      } else {
        button.textContent = 'Copy prompt';
        status.textContent = 'Automatic copying is unavailable. The prompt is selected below; copy it manually.';
      }
    });
  });
})();
