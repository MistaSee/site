# Install Copybot

Created by Mark Calleja · Portable edition 1.0 · 6 November 2026

The original prompt uses a CEFR B2 target and line-by-line suggestions. Its code-review instructions are preserved too.

## Import a skill

Import copybot.skill if your application accepts it, or use the identical ZIP download when requested. For folder importers, extract the archive and select the copybot folder containing SKILL.md and its resources.

Claude, ChatGPT and Gemini can use the instructions and references through the features available in their interface. Native import controls vary: use ZIP or an extracted folder if requested.

## Use instructions and knowledge files

1. Extract the archive.
2. Copy system-prompt.md into your assistant’s instructions, or the first message of a fresh chat.
3. Add any files in references/ as knowledge. For PlayGPT, references/text/ contains text copies of the original game documents. Read SOURCES.md for source status and compatibility details.
4. Begin with: “Use Copybot to review this Markdown for clarity, approachability and knowledge assumptions.”



The original prompt and knowledge files are preserved. SKILL.md adds metadata, resource routing and compatibility guidance. original-configuration.json records the source description, conversation starters and enabled capabilities. Capability settings record what the original GPT enabled; they do not mean every task requires every capability.

## Check your installation

Try a representative task and check that the assistant follows its method, can access the required references and truthfully reports any unavailable tools. The archive has passed structure and file-integrity checks. Model behaviour and tool availability vary across applications.
