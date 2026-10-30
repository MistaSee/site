



Play · A build sequence for ages 13–17

# Build a game by directing AI

You're the director. The AI is a very fast, very confident assistant. It drafts; you decide. In about an hour you'll have a game you designed, and you'll know exactly why it works.

By Mark Calleja · Published 30 October 2026



Lots of people now make games by describing them to an AI. That's brilliant, with one catch: if the AI does all the thinking, you end up with a game you didn't really make and can't fix. This sequence keeps the thinking with you. The AI writes the code. You decide what the game is, check what comes back, and choose what changes.

## Before you start

You'll need:

- **An AI chat tool you're allowed to use.** ChatGPT for Teens works if you're 13 or over. Some tools, such as Claude, are for over-18s only, so check the rules for yours, and your school's or family's rules too.
- **A laptop or desktop computer with a web browser.** You can play on a phone, but making is much easier with a keyboard.
- **About an hour,** and something to write notes on.

**For parents and teachers:** nothing on this page asks for an account, a name or an email, and nothing anyone does here is sent to me. The only AI involved is the one the young person already uses, under that tool's own rules.

## The one rule

When the AI says *"Done!"*, that's a claim, not a fact. Your job is to check it.

Everything below follows five moves. They come from OCEAN, a way of working with AI that I teach: **O**bjective, **C**ontext, **E**xamples, **A**ssess, **N**egotiate. The AI gets one turn in the middle. The rest is yours.

1.  [Objective:](#step-1) say what your game is in one sentence.
2.  [Context and examples:](#step-2) describe it properly.
3.  [Draft:](#step-3) let the AI write it, then run it.
4.  [Assess:](#step-4) find one thing that's wrong.
5.  [Negotiate:](#step-5) ask for one change, and say why.

We'll follow one example the whole way through: a game called **Comet Catcher**. Make your own game alongside it.

## Step 1 · Objective: say what your game is in one sentence

Pick a game you could explain to a friend in ten seconds. Simple is good, because you can always add more later. Some starting points: catch things that fall, dodge things that move, click targets before time runs out, or steer something through a maze.





**Too vague:** "Make me a fun space game."





**Better:** "A game where you move a basket left and right to catch falling comets, and it's fun because they get faster the longer you survive."





The "because" matters. It tells the AI, and you, what makes the game worth playing. You'll use it again in step 4.

**Check:** Could a friend picture your game from that one sentence? Read it out loud. If they'd ask "but what do you actually do?", add the thing the player does.

## Step 2 · Context and examples: describe it properly

Now fill in the details the AI can't guess. Copy this into your notes and fill in the gaps:

``` prompt-block
I'm making a game that runs in a web browser.

The game: [your sentence from step 1]
The player: [what you control, and what it looks like]
The screen: [what's on it: background, things that move, score]
Controls: [which keys or clicks do what]
Winning and losing: [how you score, and how the game ends]
A game I like that's a bit like this: [name it, and say which part you like]
```

Here's Comet Catcher filled in:

``` prompt-block
I'm making a game that runs in a web browser.

The game: move a basket to catch falling comets. They get faster the longer you survive.
The player: a basket at the bottom of the screen.
The screen: dark blue sky, white comets falling from the top, score in the top-left corner, lives in the top-right.
Controls: the left and right arrow keys move the basket.
Winning and losing: each comet caught is 1 point. Miss three and the game ends and shows your score. Press space to play again.
A game I like that's a bit like this: Fruit Ninja, because things keep coming faster and faster.
```

**Check:** Did you say what winning and losing look like? If your game has no ending, the AI will invent one, or forget to.

## Step 3 · Draft: let the AI write it, then run it

Now it's the AI's turn. Paste your description, then add this line at the end:

``` prompt-block
Write this as one complete HTML file I can save and open in a web browser. Put everything in that one file, and don't use any images or downloads.
```

To run what comes back:

1.  **If your AI tool shows a Preview or Run button** next to the code, use that.
2.  **If it doesn't,** copy all of the code. Open a plain text editor: Notepad on Windows, or TextEdit on a Mac (choose *Format › Make Plain Text* first). Paste the code, save the file as `game.html`, then double-click it to open it in your browser.
3.  **On a Chromebook,** use the Preview option, or ask a teacher which online code editor your school allows.

**Check:** What did it do that you didn't ask for? Write down one surprise. It might be good (a nice animation) or bad (the comets are green). Either way, whether it stays is now your decision.

## Step 4 · Assess: find one thing that's wrong

Play your game on purpose, like a tester rather than a player. Try to break it: hold both keys down, miss every comet, press space in the middle of a game, and keep going until it's fast. Then compare what you see with your sentence from step 1. Does the game actually do the thing that was meant to make it fun?

Pick **one** thing that's wrong and describe it precisely:

``` prompt-block
What I did: …
What I expected: …
What happened instead: …
```

For example: *"I missed three comets. I expected the game to end. Instead the lives counter went to −1 and the comets kept falling."*

**Check:** Can you point to where it goes wrong? "It's broken" isn't something anyone can fix. "The lives counter goes below zero" is.

**Read one bit of the code.** Ask the AI: *"Which line of the code decides when the game ends? Explain it in one sentence."* Then find that line yourself. You don't need to understand all the code, just that one part.

## Step 5 · Negotiate: ask for one change, and say why

Ask for exactly one change, and give your reason. The reason helps the AI make the change you meant, not just one that matches your words.

``` prompt-block
When lives reach zero, stop the game and show "Game over" with the final score, because right now the comets keep falling forever. Change only this. Keep everything else the same.
```

*"Change only this. Keep everything else the same."* is the most useful sentence in this whole sequence. Without it, AI tools love to "improve" things you didn't ask about.

**Check:** Did the change do what you meant? Run the game and repeat the exact test from step 4. If it's still wrong, say what's still wrong, using the same three lines.

Then go back to step 4. Three or four rounds of "find one thing, fix one thing" will take your game a long way.

## Make it yours

- **Change one number yourself.** Ask the AI which number controls how fast things fall. Find it in the code, change it, save, and play again. That's real programming, and you did it.
- **Add one feature at a time:** a sound, a high score, or a second kind of comet that loses you points. Same rule as before: one change, with a reason.
- **Swap the theme.** Keep the game and change the world: falling pizzas, a goalkeeper, raindrops in a bucket. Your sentence from step 1 changes, and everything after it is checking.

## Finish: explain your game in three sentences

1.  "My game is …"
2.  "One decision I made was … because …"
3.  "One thing the AI got wrong, and how I spotted it, was …"

If you can say those three things, you didn't just get a game out of an AI. You made one, and you were in charge.

## Stuck?

- **The page is blank.** The code may have been cut off. Ask: *"Is that the complete file? Send the whole thing again, from start to finish."*
- **Everything changed when I asked for one thing.** Ask it to go back: *"Undo that. Make only this change: …"*, and end with *"Change only this. Keep everything else the same."*
- **It's too fast, or too slow.** Ask which number controls the speed, then change it yourself.
- **The AI says it fixed it, but it didn't.** That happens a lot. Describe the problem again using *what I did, what I expected, what happened instead*. That's the skill you're practising.

## Practise without an AI

No AI tool to hand? You can still practise steps 4 and 5. [Here's a draft of Comet Catcher](comet-catcher-draft.html), written the way an AI might write it. It works, mostly. Play it as a tester, compare it with the description in step 2, and write up what's wrong using the three lines from step 4. There's at least one problem in it on purpose.


