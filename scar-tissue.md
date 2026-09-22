# Scar Tissue: The Editorial Residue LLMs Leave Behind

> Why finished AI-assisted projects keep answering questions their readers never asked, and how to remove that editorial residue without losing useful rationale.

- **Author:** [Mark Calleja](https://markcalleja.info/about.html)
- **Published:** 22 September 2026
- **Canonical URL:** https://markcalleja.info/scar-tissue.html

I found it lurking in the instructions for an online coding project:

*You do not need to add a timer.*

Perfectly clear. Perfectly accurate. Also completely weird.

Nothing else in the project mentioned a timer. Learners were never asked to create one, the starter code did not contain one, and the finished game did not use one. A countdown had existed in an early draft, but the game had since been redesigned to end when the player reached the exit.

The sentence was not helping learners understand the current project. It was reassuring them that they did not need to complete a task they had never been given.

It was arguing with a ghost.

It was **scar tissue.**

This happens surprisingly often when you manage a large project through an extended conversation with a large language model. Corrections leave behind disclaimers. Source conflicts leave behind explanations of how they were resolved. Instructions written for the model resurface as advice to the reader. The subject you discussed for an hour suddenly receives six times as much space as something more important.

None of it necessarily looks wrong, which is precisely what makes it dangerous.

### What is editorial residue?

I use **editorial residue** to mean:

**Authoring material that remains in a reader-facing artefact after its authoring function has ended.**

During development, you need to compare sources, challenge assumptions, test interpretations and explain decisions. This is useful work, and you should keep doing it. The problem begins when the scaffolding gets bricked into the building.

Editorial residue takes several forms:

- **Dated corrections:** “Updated from arrow keys on 1 September.”
- **Historical apologies:** “This section was previously only a placeholder.”
- **Orphaned disclaimers:** “You do not need to add a timer.”
- **Justification residue:** “This step focuses on collision detection because movement was covered earlier.”
- **Invisible arguments:** “These two code examples should not be reconciled.”
- **Provenance inflation:** “The original learning objective explicitly requires this interaction.”
- **Conversational sediment:** “As discussed”, “worth noting” and “the good news is”.
- **Compliance leakage:** “This feature is working as intended.”

Every one of these are examples I have found in my own work. These statements answer questions from the authoring process:

- What did the project used to say?
- What was the writer worried about?
- Which instruction did the model follow?
- How was the disagreement between two sources resolved?
- Why did we spend so much time on this section?

The eventual reader has a different set of questions:

- What am I making?
- What do I need to do?
- Why does this work?
- What happens next?

Scar tissue appears when the finished artefact answers the first set rather than the second.

### Why LLM-managed projects are particularly vulnerable

Editorial residue wasn't created with the invention of LLMs. Committee-written reports, repeatedly revised policies and long-lived software projects have always accumulated obsolete caveats, dead terminology and notes addressed to people who left the organisation three years ago.

LLMs accelerate their accumulation because they make it very easy, maybe even necessary, to collapse the authoring conversation and the publication environment into the same space.

Visible diligence is valuable during collaboration. When an error is corrected, explaining what changed builds confidence. When two sources disagree, showing how they were reconciled demonstrates that both were considered. When an instruction matters, repeating it makes compliance visible. That behaviour works in a conversation, but produces terrible content.

The resulting prose starts performing the audit instead of embodying its conclusions. Tell an LLM, “Make sure the revised project no longer asks learners to create a countdown timer,” and you may receive:

*You do not need to add a timer in this project.*

The instruction has technically been followed. The learner, however, has now been introduced to a mechanic they had no reason to consider. A clean version might simply say:

*When your character reaches the exit, show the win screen.*

The correction has now been absorbed into the current project rather than preserved as a rebuttal.

This gets worse as the conversation grows. Every rejected interpretation, repeated warning and carefully negotiated correction remains available in the context. The material we most want removed may become the most focused-on material in the whole exchange.

The finished artefact then inherits four things from the conversation:

1. **Its audience.** It addresses the collaborator rather than the eventual reader.
2. **Its history.** Resolved corrections remain visible as corrections.
3. **Its attention.** Heavily discussed subjects acquire disproportionate weight.
4. **Its scaffolding.** Checklists, audits and source comparisons survive into the output.

You are also poorly placed to catch the problem, because you were ‘in the room’ too. A sentence referring obliquely to last Tuesday’s disagreement makes perfect sense if you remember last Tuesday’s disagreement. If you don't, it's just confusion fuel.

Worse, it fails for the teacher, volunteer or learner who arrives six months later with only the published content to work from, and no idea what you mean.

### Scar tissue is not every kind of LLM mess

There is a temptation to throw every oddity produced by an LLM-managed project into the same bucket. This is lazy and a bad idea. If “editorial residue” comes to mean “anything the model did badly”, the term stops helping us diagnose the problem.

An obsolete correction is editorial residue. An invented statistic is not; that is unsupported synthesis (aka hallucination). Two project files containing different values indicate state drift. Five pages repeating the same explanation suggest an ownership or information-architecture problem. These failures may belong in the same quality-control system, but they require different treatments.

A broader category (**production artefacts**, perhaps?) could include:

- editorial residue;
- duplicated information;
- stale dependencies;
- attention distortion;
- template-filling;
- false precision;
- invented terminology;
- unresolved contradictions.

Keep the boundaries reasonably firm. You can delete a historical aside; you cannot delete your way out of a project with no canonical source of truth.

### How to identify editorial residue

Start with one question:

**Would a reader who was not present during development be worse off without this?**

Then apply the test:

**Would this material exist if the artefact were recreated today using only the current requirements and accepted facts?**

These questions catch statements that are *accurate* but functionally misplaced. They also work beyond writing copy: use them on code comments, learning objectives, project instructions, product specifications and technical documentation.

You can support this with a simple lexical scan. Flag phrases such as:

- previously, formerly, originally and corrected;
- as discussed, as requested and as noted;
- this file, this section and the purpose of this document;
- according to the specification and the source says;
- working as intended and deliberately left open;
- no example currently exists and still to be determined.

Treat hits on these things as warning signs to look closer, not automatic deletion rules. Sometimes history, provenance or rationale genuinely matters to the relationship between the material and reader.

Consider this note in a project’s source files:

*Keyboard controls were kept after the old touchscreen version was removed.*

Most of that information belongs in the commit history.

Now compare it with:

*Keep every control keyboard-operable so learners who cannot use a pointer can complete the project.*

The second version explains a constraint that still exists. A future author could make a serious accessibility mistake without it.

That is the boundary. Useful rationale explains why the present content must behave as it does. Editorial residue explains how the author arrived there.

Do not limit the audit to individual sentences. Look at the shape of the project as well. Compare step lengths, repeated concepts, numbers of examples and levels of technical detail against their actual importance.

Ask:

**If we had spent half as long discussing this subject, would it still occupy this much of the finished project?**

If not, conversational attention has distorted the product.

### Collect the evidence—but keep it lightweight

Once you begin looking, you will find this stuff *everywhere*. One thing I’ve started to do is create a small production-artefact register so that recurring examples can improve the workflow rather than merely annoy you.

A useful entry might look like this:

```text
Location: projects/maze-game/step-4.md
Type: Orphaned disclaimer
Symptom: Tells learners that they do not need to add a timer
Reader harm: Introduces an abandoned mechanic with no relevance to the project
Current truth: The game ends when the character reaches the exit
Cause: Timer removed during an earlier redesign
Action: Replace with the current completion condition
Prevention: Render the revised step from accepted project facts in a clean context
```

Record examples that are recurring, subtle or damaging. Do not document every trivial deletion. That way lies an impressively complete register that nobody reads (which would be a very meta new layer of residue!)

Use the collection to identify patterns. A recurring problem should eventually produce one of the following:

- a lint rule;
- a prompt change;
- a canonical source;
- an automated test;
- a change to the editing workflow.

The point is not to build a museum of mistakes; it’s to stop making the same ones each time.

### How to remove existing residue

Most findings require one of six actions:

1. **Delete** material with no remaining reader-facing purpose.
2. **Rewrite** defensive or historical language as a direct statement of current truth.
3. **Relocate** useful history into a commit, issue, decision record or change log.
4. **Consolidate** duplicated facts under one canonical owner.
5. **Reconcile** contradictory sources and propagate the decision.
6. **Rebalance** sections distorted by conversational attention.

Be careful how you instruct the LLM during this process. “Remove all references to the old timer mechanic” repeats and foregrounds the very material you want to eliminate.

Instead, extract the accepted state:

```text
Current facts:
- The player guides a character through the maze.
- Reaching the exit completes the game.
- The game then displays a success message.
```

Now reconstruct the affected passage from those facts.

This distinction matters. Patching encourages the model to retain the argumentative skeleton of the existing text. Reconstruction gives it a clean foundation.

### Preventing scar tissue

Prevention begins with separation.

Maintain three distinct information layers:

- **Authoring state:** discussions, research, objections, alternatives and audit evidence.
- **Current state:** accepted facts, requirements, terminology and genuinely unresolved questions.
- **Published artefact:** the information required by the eventual reader.

The publication pass should consume the current state. It should not inherit the entire authoring history.

Use a workflow like this:

1. Investigate the problem with access to its history.
2. Decide what is currently true.
3. Record that decision in the appropriate log.
4. Update the canonical source.
5. Start a clean publication context.
6. Render the affected material for a named reader.
7. Verify the result without exposing the verifier to the preceding conversation.

The reconciler, writer and verifier can all use the same LLM. They should not necessarily share the same context.

This also complicates the apparently sensible advice to “write the log entry first”. Do that - but keep the publication pass separate. If you write a detailed account of the correction and immediately ask the same context for polished prose, you may simply have made the unwanted history more prominent.

**No prompt can rescue fundamentally poor information architecture.** If the project is substantial, establish:

- one canonical owner for every important fact;
- separate locations for tasks, decisions and published content;
- a controlled glossary;
- automated checks for deterministic claims;
- regular duplicate and consistency sweeps;
- cold reviews of complete projects, not just diffs;
- a clear reader definition for every deliverable.

Treat an LLM-managed project as a small publishing system, not one endlessly extended writing task. Give working material somewhere to live, give accepted facts an authoritative home, and create a firm boundary around what reaches the reader.

The governing principle is simple:

**The authoring history may explain the product, but it should not become part of the product unless the eventual reader genuinely needs it.**

Or, as a working rule:

**Investigate with history. Decide in a log. Publish from current state. Verify cold.**

Large projects will still accumulate debris. That is normal. The objective is not immaculate generation; it is a process that exposes the residue, moves useful information to the right place and prevents yesterday’s argument from becoming tomorrow’s fact.

## Prompts for Identifying and Removing Editorial Residue

This works best on the desktop version of your chosen LLM/Agent system, so it can operate directly on the files included in the workflow.

The strongest approach uses separate contexts for identification, correction and verification. The workflow matters more than any supposedly magic wording.

Do not give the publication pass access to the entire conversation that created the residue, only the documents you want to release.

### 1. Cold-reader identification

Use this without providing the previous authoring conversation.

```text
Act as a cold publication editor.

Intended reader:
[DESCRIBE THE READER]

Purpose of the artefact:
[DESCRIBE WHAT THE READER SHOULD KNOW, DECIDE OR DO]

Review the attached artefact for editorial residue: material whose function belongs to the authoring process rather than the reader’s use of the finished artefact.

Look specifically for:

- corrections whose original error is no longer present;
- negative statements rebutting an absent claim;
- references to previous drafts, discussions or decisions;
- explanations of why the author included, omitted or prioritised something;
- statements demonstrating compliance with an instruction;
- source reconciliation exposed as reader-facing material;
- apologies for incomplete or previously incomplete work;
- comments about the file, section, template or writing process;
- repeated facts created by parallel editing;
- sections whose length appears disproportionate to their reader-facing importance.

Apply two tests:

1. Would a reader who never saw the authoring process be worse off without this?
2. Would this material exist in a clean-sheet version produced today from the current requirements and accepted facts?

Preserve material that communicates a current constraint, genuine uncertainty, necessary provenance, accessibility requirement, safety requirement or useful rationale.

Do not edit the artefact during this pass.

Return a table containing:

- location;
- exact excerpt;
- classification;
- why it appears to be residue;
- current information worth preserving;
- recommended action: keep, delete, rewrite, relocate, consolidate, reconcile or rebalance;
- confidence: high, medium or low.
```

### 2. Audience-and-purpose audit

Use this when you want the review to concentrate on whether every part of an artefact serves its intended audience.

```text
Review this artefact as though you are encountering it for the first time.

Intended reader:
[DESCRIBE THE READER]

The artefact should help the reader:

[LIST THE READER’S ACTUAL TASKS, QUESTIONS OR DECISIONS]

For each section, paragraph, instruction, comment or data block, determine whether it supports one of those reader needs.

Flag material that instead:

- speaks to an author, editor or collaborator;
- refers to an abandoned requirement, feature or interpretation;
- explains why the artefact was written or organised in a particular way;
- preserves discussion about previous versions;
- demonstrates that an instruction was followed;
- defends a decision against an objection the reader cannot see;
- exposes source conflicts that have already been resolved;
- records incomplete work that is now complete;
- adds detail without improving the reader’s understanding or decisions.

Protect material that provides durable rationale, necessary context, accessibility support, safety guidance, required attribution or uncertainty that genuinely affects the reader.

Return findings only. Quote each passage, explain the cold-reader problem and recommend a specific action.
```

### 3. Project-wide collection

Use this to build a register before changing anything.

```text
Conduct a read-only production-artefact audit across:

[TARGET FILES, DIRECTORIES OR MATERIALS]

Do not modify the source material during this pass.

Identify:

A. Editorial residue
B. Compliance leakage
C. Stale dependencies
D. Duplicated or conflicting facts
E. Attention distortion
F. Template-filling or false precision
G. Unsupported terminology or invention

For every confirmed or probable finding, create a register entry containing:

- unique ID;
- file, page or section;
- exact excerpt;
- category;
- severity;
- reader-facing harm;
- current fact, if established;
- probable cause;
- recommended action;
- supporting evidence;
- confidence level.

Distinguish between:

- material that is incorrect;
- material that is correct but misplaced;
- material that is useful but duplicated;
- material that cannot be judged without a decision.

Do not infer missing current facts. Mark them as unresolved and identify the decision or source required.

Finish with:

1. findings by category;
2. findings by severity;
3. repeated patterns suitable for linting;
4. systemic problems requiring changes to project structure;
5. the five highest-priority repairs.
```

### 4. Rectification planning

Run this after reviewing the findings yourself. Providing the plan of action for the LLM before it acts makes sure it is surgical rather than general in its editing.

```text
Using the attached artefact and approved audit findings, produce a precise rectification plan.

Approved findings:
[PASTE CONFIRMED FINDINGS]

For each finding, choose one action:

- Delete: no reader-facing value remains.
- Rewrite: useful current information is trapped inside historical or defensive language.
- Relocate: the material belongs in a commit, issue, decision log, research record or author note.
- Consolidate: the same fact appears in multiple places.
- Reconcile: sources disagree and a current state must be established.
- Rebalance: the section’s size or detail is disproportionate to its importance.
- Keep: the material serves a durable reader-facing purpose.

For every rewrite, state the current fact positively without repeating the abandoned claim.

Where the current truth is not established, stop and mark the item as requiring a decision. Do not invent a resolution.

Return an edit specification rather than revised content.
```

This stage gives you a chance to catch false positives before the LLM begins deleting or rewriting material.

### 5. Clean reconstruction

Run this in a fresh context. Supply the accepted current facts, not the conversation that produced them.

```text
Produce the final reader-facing artefact using the following current-state brief.

Intended reader:
[DESCRIBE THE READER]

Reader’s purpose:
[WHAT THEY NEED TO KNOW, DECIDE, CREATE OR DO]

Current facts and requirements:
[ACCEPTED CURRENT STATE ONLY]

Required structure:
[FORMAT, HEADINGS, SCHEMA OR TEMPLATE]

Each part of the output should perform at least one reader-facing function:

- state a current fact;
- give a necessary action;
- explain a relevant concept;
- describe an observable result;
- support a decision;
- clarify a durable constraint;
- provide necessary safety, accessibility, attribution or troubleshooting information.

Render resolved decisions as direct, present-tense content.

Output the complete replacement artefact only.
```

The crucial step is constructing the current-state brief. Include what is true now. Leave out the abandoned interpretation and the discussion that killed it.

### 6. Small-artefact, one-pass clean-up

Separation is safer, but this is adequate for a short, low-risk artefact.

```text
Prepare this artefact for publication.

Audience:
[DESCRIBE THE READER]

Purpose:
[DESCRIBE THE ARTEFACT’S PURPOSE]

First, identify material whose function belongs to drafting, correction, source reconciliation or author discussion.

Then revise the artefact by:

- deleting material with no present reader value;
- expressing useful information as direct current-state facts;
- preserving durable rationale, safety, accessibility and necessary provenance;
- consolidating repeated information;
- keeping unresolved matters unresolved rather than inventing answers.

Return two clearly separated sections:

1. REVISED ARTEFACT
   The complete publication-ready material.

2. EDITORIAL RECORD
   A concise list of deleted, rewritten, relocated or unresolved material.

The editorial record is separate from the revised artefact.
```

Avoid this one-pass version for complex projects. The identification language remains in the same context as the rewrite, so it can contaminate the result.

### 7. Structural-distortion audit

Scar tissue does not always appear as a suspicious sentence. Sometimes the whole artefact has grown around the conversation.

```text
Audit the structure and allocation of attention in this artefact.

Use the supplied priority map:

[LIST THE RELATIVE IMPORTANCE OF SECTIONS, FEATURES, QUESTIONS OR CONCEPTS]

Assess:

- length or implementation weight by section;
- repetition of the same facts;
- number of examples devoted to each concept;
- detail that exceeds likely reader need;
- exhaustive treatment of implausible edge cases;
- recently added terminology that has spread unusually far;
- sections that appear to justify their own length or existence;
- important reader tasks receiving comparatively little support.

For each imbalance, explain:

- the structural symptom;
- the probable reader impact;
- whether it appears intentional;
- what should be cut, combined, expanded or moved.

Do not equate length with importance automatically. Judge whether the allocated detail supports the reader’s actual task.
```

### 8. Final cold verification

Run this in another fresh context, supplying only the revised artefact and its reader brief.

```text
Act as the final publication gate for this artefact.

Intended reader:
[DESCRIBE THE READER]

Purpose:
[DESCRIBE THE ARTEFACT’S PURPOSE]

Review the finished artefact for escaped editorial residue.

A blocking finding is any passage whose primary function is to:

- address an author, editor or collaborator;
- rebut an absent claim;
- describe a previous version;
- demonstrate that an instruction was followed;
- expose source reconciliation the reader does not need;
- explain the artefact’s production rather than its subject;
- preserve an abandoned feature, term or assumption;
- compensate for conversational history unavailable to the reader.

Also identify durable rationale or necessary caveats that might superficially resemble residue but should remain.

Return one verdict:

- READY FOR PUBLICATION; or
- REVISION REQUIRED.
For every blocking finding, provide its location, exact excerpt, diagnosis and smallest safe correction.
```

### Recommended sequence

Use the prompts in this order:

1. Run the cold-reader audit.
2. Review and approve the findings.
3. Produce the rectification plan.
4. Build a current-state brief.
5. Open a clean context and reconstruct the artefact.
6. Open another clean context and run the publication gate.
7. Convert recurring findings into lint rules, validation tests or project controls.

The central rule remains simple:

**Give the auditor the finished artefact. Give the writer the current truth. Give neither of them the whole editorial saga.**
