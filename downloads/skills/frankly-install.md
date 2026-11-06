# Install Frankly

Created by Mark Calleja · Portable edition 1.0 · 6 November 2026

This package contains Frankly’s original coaching instructions and original Markdown knowledge reference. It requires no scripts, API keys or external services of its own.

## Import a skill

Import frankly.skill if your application accepts it. Use frankly.zip if it requests ZIP. For a folder importer, extract the archive and select the frankly folder containing SKILL.md and references/.

- Claude: use the ZIP download where the custom-skill importer requests ZIP, then enable the skill.
- Gemini: use its Skills upload controls. Extract the archive first if it requests a folder.
- ChatGPT: use skill importing where available. A custom GPT, Project or ordinary chat can use the instructions-and-reference route below.

## Use the content in any suitable AI chat

1. Extract the archive. The .skill and ZIP downloads contain identical files.
2. Copy system-prompt.md into the assistant’s instructions, or the first message of a fresh chat.
3. Attach references/frankly_knowledge_base.md. Ask the assistant to read it before critiquing your work.
4. Start with: “Use Frankly as my critical friend. Here is my idea, plan or draft. Test its assumptions and reasoning, offer counterpoints and give actionable advice.”

The original prompt and reference are preserved. No new profanity rule or substantive coaching revision has been added in this conversion. SKILL.md adds metadata and reference-loading guidance.

## Check it in your chosen tool

Try a weak argument, a well-supported argument and a claim that needs verification. Check that criticism is specific, uncertainty is acknowledged and the feedback concerns ideas rather than personal attributes. The package has passed structural and archive-integrity checks; it has not been behaviour-tested across every model.

Source provenance is in references/SOURCES.md. The original knowledge document’s bibliography has not been independently verified during packaging.
