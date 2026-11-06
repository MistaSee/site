# Install OCEAN Guide

Created by Mark Calleja · V2 · 6 November 2026

This is a self-contained coaching skill: instructions, a plain prompt and 1 reference PDFs. There are no scripts to run, API keys or external services required by the package itself. Your chosen AI application supplies the model and file-reading features.

## Choose the route your application supports

### Native skills

Import the .skill file if your application accepts it. If the importer expects ZIP, use the identical .zip download. Keep the ocean-guide/ folder, its SKILL.md and references together. For a folder-based skill system, extract the archive and place that folder in the application’s supported skill location. Importing a skill does not train the underlying model.

- Claude: its documented custom-skill importer accepts a ZIP containing the skill folder. Use the ZIP download when requested, then enable the skill.
- Gemini: use Customise → Skills → Create → Upload. If the picker accepts a folder, extract the archive and select the ocean-guide folder containing SKILL.md and references. Activate it in a chat using the application’s skill selector.
- ChatGPT: use native skill importing where your interface provides it. For a custom GPT, Project or ordinary chat, use the plain-prompt route below instead of assuming that attaching an archive installs it.

### Plain-prompt route for Claude, ChatGPT, Gemini or another LLM

1. Extract the archive. A .skill file is a ZIP archive; the .zip download contains the same bytes.
2. Open system-prompt.md and copy its text into your assistant’s instructions field. If there is no instructions field, put it at the beginning of a fresh chat.
3. Attach the PDFs from references/ as knowledge or chat files. If your tool cannot read PDFs, provide text extracted from the relevant sections instead.
4. Begin with: “Use OCEAN Guide to coach me through Objective, Context, Examples, Assess and Negotiate. Help me develop and test my own prompt.”

SKILL.md contains the same coaching instructions plus skill metadata and a reference map. system-prompt.md contains just the approved V2 prompt for copy-and-paste use.

## Check it in your chosen tool

Try a genuine question, a request to take over the task, a correction to an AI mistake and an input containing incidental profanity. Check that the coach helps with understanding, preserves your decisions and ignores the swearing. File access and instruction-following vary by application and model; this package is portable content, not a guarantee of identical behaviour everywhere.

## References and provenance

Use references/SOURCES.md for source links and PDF checksums. The included PDF files are unchanged. The original V2 prompts received brief fresh-chat checks in Gemini; this packaged version has structural and archive-integrity checks, not a behavioural evaluation on every LLM.

Official format and installation references:
- https://agentskills.io/specification
- https://support.claude.com/en/articles/12512180-use-skills-in-claude
- https://support.google.com/gemini/answer/18560919
