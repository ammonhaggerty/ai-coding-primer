# Part 4: Building — From Idea to Working Product

You have a terminal, an AI partner, and cloud infrastructure waiting for code. The pieces are in place. This section is about using them — taking an idea from "what if..." to a working product with a URL, a database, and real users.

This is where it gets fun.

---

## Starting with Intent

Before you type anything into Claude, spend ten minutes thinking. Not about technology — about what you're building and who it's for.

Write a brief. Two or three paragraphs. What is this product? Who uses it? What does the core experience feel like? Be specific. "Build me a social app" gives Claude almost nothing to work with — the possibility space is infinite, and Claude will either ask you twenty clarifying questions or make a hundred assumptions, most of them wrong. But "Build a page where a user answers five personality questions, sees a compatibility score, and can share their results" — that's something Claude can run with immediately.

Your brief doesn't need to be formal. It can be casual, conversational, incomplete. What matters is that it captures intent. Here's a real example:

*"I want to build a daily check-in tool. A user visits the page, sees a simple question about how they're feeling today, picks from a few options, and optionally writes a short note. Their responses are saved so they can see a history of how they've been over the past month. Simple, clean, no login for now — just a cookie to remember them."*

That's about sixty words, and it's enough for Claude to build a working first version. The product is clear. The user experience is specific. The scope is bounded. Claude knows what data to store, what UI to build, and what to skip.

This brief becomes your first real prompt. Paste it into Claude, and the conversation begins.

The single most valuable habit in this entire workflow: ten minutes of clear thinking saves hours of building in circles.

---

## Design: Figma to Claude

You don't need Figma to follow this guide. If you can sketch on paper or describe what you want in words, that's enough. But if you do use Figma — even at a basic level — the workflow becomes remarkably smooth.

The Figma MCP server lets Claude look directly at your design files. You share a link to a frame, and Claude reads the layout, spacing, colors, typography, and component structure. Then it generates code that matches. Not a screenshot-to-code gimmick — it understands the design semantically: "this is a card with a title, subtitle, and action button, arranged vertically with 16px gaps."

What translates well: layout structure, spacing, color palettes, typography hierarchy, component composition. If you designed a card with a heading, body text, and a button, Claude will produce exactly that — properly styled, properly spaced.

What needs your judgment: interaction patterns (what happens when someone clicks?), edge cases (what if the text is really long?), responsive behavior (how should this look on a phone?). Figma shows a static frame. The behavior lives in your head, and you communicate it through conversation.

There's a shortcut that makes all of this easier: a component library. This guide's stack includes DaisyUI, which gives you pre-built buttons, cards, forms, navigation, modals — dozens of components that look good out of the box. When Claude sees a button in your Figma design, it doesn't need to recreate it from scratch. It reaches for `class="btn btn-primary"` and gets a consistent, styled button instantly. The design system acts as shared vocabulary between you, your design, and Claude.

Even without Figma, describing your UI to Claude works well. "A centered card with a question at the top, four option buttons stacked vertically, and a subtle progress indicator" is specific enough for Claude to produce something usable on the first pass — and then you iterate from there.

---

## The Stack (Explained for Humans)

Every tool in the building stack exists for a reason. You don't need to master any of them — Claude handles the syntax — but understanding what each one does helps you have better conversations about what you're building.

**Hono** is the web framework. It's the skeleton that connects URLs to responses. When someone visits `/dashboard`, Hono routes that request to the right piece of code. When a form submits to `/api/submit`, Hono catches it and processes the data. Think of it as the receptionist — it directs traffic to the right place.

**HTML** is the bones of every web page. It's what your browser actually reads. Claude writes it. And here's the thing: HTML is surprisingly readable. `<h1>Welcome</h1>` is a heading that says "Welcome." `<button>Submit</button>` is a button labeled "Submit." You'll find yourself reading Claude's HTML and understanding most of it without any training.

**Tailwind CSS** is styling without separate files. Instead of writing design rules in one place and applying them elsewhere, you add descriptive classes directly to elements: `class="text-lg font-bold text-gray-800"` means "large text, bold, dark gray." It reads almost like English. Claude uses it fluently, and you'll start recognizing patterns quickly — `mt-4` means "margin top, size 4," `rounded-lg` means "large rounded corners."

**DaisyUI** (version 5) is a component library built on Tailwind. It gives you pre-built, styled components: `class="btn btn-primary"` produces a polished button. `class="card"` produces a card container. `class="alert alert-error"` produces a red error banner. Instead of designing every element from scratch, Claude reaches for these building blocks and assembles them. Consistent, good-looking UI with minimal effort. Projects in this guide use the "emerald" theme, which gives you a clean, professional look out of the box.

**HTMX** makes pages interactive without writing JavaScript. Traditional web development requires JavaScript for anything dynamic — loading new content, submitting forms without refreshing the page, updating parts of the UI. HTMX does this through HTML attributes. `hx-post="/api/submit"` means "when this form is submitted, send the data to this URL." `hx-swap="innerHTML"` means "replace this element's content with the response." It's remarkably powerful for how simple it is.

**Alpine.js** handles small interactive bits: showing and hiding elements, toggling states, counting things. If HTMX handles the conversation between your page and the server, Alpine handles the conversation within the page itself — dropdown menus, accordion panels, character counters in text fields.

**Why this stack?** No build step. You don't need a compiler, a bundler, or a twenty-minute build process. The libraries load from CDNs — URLs that serve the code directly to the browser. The HTML is readable. Claude is excellent at all of it. And most importantly, it's honest technology — there's no magic layer hiding what's happening. When you look at the code Claude writes, you can follow the logic even if you couldn't write it yourself.

---

## Building a Feature: The Full Loop

Let's walk through building one feature, start to finish. This is the rhythm you'll repeat for everything you build.

### The Prompt

You've described your daily check-in tool. Now you want to add a specific feature: the history view. You tell Claude:

*"Add a history page. When a user visits /history, they see their past check-ins displayed as a timeline — most recent at the top. Each entry shows the date, the mood they selected, and their optional note. If they have no check-ins yet, show a friendly empty state that encourages them to do their first one."*

Notice what's in this prompt: a URL (`/history`), a layout (timeline, most recent first), data requirements (date, mood, note), and an edge case (empty state). That's enough.

### Claude Works

Claude reads your project files, understands the existing code structure, and starts building. It creates a new route in your Hono app. It writes a database query to fetch check-ins for the current user. It builds the HTML template — a timeline of cards, each showing a date, a mood indicator, and a note. It adds the empty state with an encouraging message and a link to the check-in page.

You'll see Claude working in the terminal — creating files, editing existing ones, running commands. It's not a black box. You can watch every step.

### Running Locally

Claude runs `npm run dev` (or it's already running). You open your browser to `localhost:8787/history` and see the page. Maybe it looks great on the first try. More likely, something is slightly off.

### The First Issue

The dates are showing in a format like `2026-02-25T14:30:00.000Z`. That's technically correct but nobody wants to read that. You tell Claude:

*"The dates look robotic. Can you format them as something friendlier, like 'Tuesday, Feb 25'?"*

Claude updates the template. You refresh. Better.

### Iterating

"Can the mood be an emoji instead of text? A happy face for great, a neutral face for okay, a sad face for rough."

Claude makes the change. You refresh.

"The empty state feels too plain. Can you add a small illustration or icon?"

Claude adds an SVG and adjusts the layout. You refresh.

"Actually, I want the most recent entry to be visually larger than the older ones."

Claude updates the CSS. You refresh.

Three or four rounds of this, and the feature feels right. Not because you got it perfect on the first prompt — nobody does — but because the iteration loop is so fast that refinement is effortless.

### Deploying

You tell Claude to deploy. Ten seconds later, the history page is live. You can share the URL with someone and say "check this out."

### The Rhythm

That's the loop. Every feature, every page, every fix follows this pattern:

**Dream it** → you imagine what should exist.
**Describe it** → you tell Claude, in plain English, what you want.
**Build it** → Claude writes the code, creates the files, connects the pieces.
**React to it** → you look at what Claude built and notice what's off.
**Refine it** → you describe the adjustments, Claude makes them.
**Ship it** → one command, it's live.
**Repeat** → next feature.

The whole cycle for a single feature might take twenty minutes. A complex one might take an hour. An entire app, built this way, might take a weekend. The speed comes not from rushing but from the fact that every step in the loop is fast — and nothing requires you to context-switch into a skill you don't have.

---

## Working with Data

Every interesting app stores data. User input, content, preferences, history, relationships between things. The database is where your app's memory lives, and working with it is simpler than it sounds.

Tell Claude what you need to remember. In plain English:

*"I need to store check-in entries. Each one has a user ID, a timestamp, a mood (one of: great, okay, rough, bad), and an optional text note."*

Claude creates a `schema.sql` file — a document that defines the structure of your database. It looks something like this:

```sql
CREATE TABLE check_ins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  mood TEXT NOT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Even if you've never seen SQL, that's readable. A table called `check_ins` with columns for ID, user ID, mood, note, and creation time. Claude runs this against your D1 database, and the table exists.

From here, everything your app does with data boils down to four operations — what developers call CRUD:

**Create** — adding a new entry. A user submits a check-in, Claude writes the code that inserts a new row.
**Read** — retrieving entries. The history page loads, Claude writes the code that fetches the user's check-ins.
**Update** — changing an entry. A user edits their note, Claude writes the code that modifies the existing row.
**Delete** — removing an entry. A user removes a check-in, Claude writes the code that deletes the row.

That's it. Every database-driven feature in every app you've ever used is some combination of these four operations. When you describe a feature to Claude — "show the user their last ten entries, sorted by date" — Claude translates that into a Read operation with sorting and a limit. You don't need to know SQL. You need to know what data you want.

### When Data Meets AI

The interesting territory opens up when your stored data becomes input for AI features. Your check-in app has a month of mood data — that's enough for Workers AI to generate insights: "You tend to feel best on Wednesdays" or "Your mood dipped during the second week of February — your notes mention work stress." The data you're already collecting becomes the raw material for intelligence your users find genuinely useful.

---

## Adding AI to Your Product

There's a distinction worth drawing clearly. Claude Code is your building partner — the AI that helps you create the app. Workers AI is something different: AI that runs *inside* your app, that your users interact with. Claude helps you build the kitchen. Workers AI is an ingredient you put in the food.

### System Prompts

When you add an AI feature to your app — a chatbot, a recommendation engine, a content generator — you give it a system prompt. This is a set of instructions that shapes how the AI behaves in your product. It's like a job description for the AI inside your app.

*"You are a wellness companion. You're warm, supportive, and concise. When a user shares how they're feeling, acknowledge their experience and offer one brief, practical suggestion. Never diagnose. Never prescribe. Keep responses under three sentences."*

That system prompt defines the personality, the boundaries, and the format. Claude helps you write these, and they make the difference between an AI feature that feels thoughtful and one that feels generic.

### Building Conversational Interfaces

Chat is the most common AI feature, and the workflow for building one is straightforward. You describe the experience you want: "A chat interface at the bottom of the check-in page where users can talk about their mood and get supportive responses." Claude builds the UI (a message list, an input field, a send button), connects it to Workers AI, and wires up the system prompt.

The result is a conversational feature inside your app — not Claude, but a specialized AI tuned to your product's purpose. Your users don't need to know it's there. It just works as part of the experience.

### AI as Substance, Not Decoration

The temptation with AI features is to add them because you can. A chatbot on every page. AI-generated summaries of things that don't need summarizing. "Powered by AI" badges on features that are simple database queries wearing a trench coat.

Resist this. Add AI where it genuinely improves the experience — where a human would otherwise do tedious work, where patterns in data reveal something useful, where personalization makes the product meaningfully better for each user. Your check-in app doesn't need AI to display a list of entries. It might benefit from AI to notice patterns across a month of data and surface a gentle insight. The difference is substance versus decoration.

### The Cost Reality

AI features consume tokens — units of text that models process. Every prompt and every response costs something. On Workers AI, the free tier is generous for development and light usage, but if your app gets real traffic with real AI features, there's a cost curve.

For context: a typical AI response (a few sentences) costs a fraction of a cent. A hundred users having short conversations might cost a dollar or two per day. At scale, it matters — but at the stage you're at, the free tier covers experimentation, and costs scale gradually enough that you'll see them coming.

Claude can help you design AI features that are cost-conscious: caching common responses, limiting response length, using smaller models for simpler tasks. This is an optimization conversation you'll have when it's relevant, not something to worry about on day one.

---

## Where You Are Now

You've built a feature from start to finish. You've seen the loop — dream, describe, build, react, refine, ship. You've stored data in a database, queried it, and displayed it. You've added an AI feature that runs inside your app, with a personality shaped by a system prompt.

None of this required you to write code by hand. All of it required you to think clearly about what you wanted, describe it precisely, and iterate on the result. The skills that mattered were imagination, taste, and the willingness to say "close, but not quite" until it felt right.

That's building. It's not magic. It's conversation — with a partner that happens to be extraordinarily good at the implementation part.

---

**Next:** [Part 5: The Daily Practice](06-daily-practice.md)
