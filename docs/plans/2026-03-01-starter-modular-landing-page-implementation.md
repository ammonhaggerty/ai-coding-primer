# Modular Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the starter project into a mobile-first modular personal landing page with profile/weather, terminal chat, and link tree modules.

**Architecture:** Server-rendered Hono app. All modules render on page load as HTML strings. HTMX for chat interaction. Alpine.js for theme toggle and chat expand/collapse. GSAP for animations. D1 for link storage. WeatherAPI.com for live weather.

**Tech Stack:** Hono, DaisyUI 5/Tailwind, HTMX, Alpine.js, GSAP, Cloudflare Workers + D1 + Workers AI, WeatherAPI.com, weather-icons CSS

**Design doc:** `docs/plans/2026-03-01-starter-modular-landing-page-design.md`

---

### Task 1: Update layout.ts — Remove navbar, add CDN links

**Files:**
- Modify: `starter/src/layout.ts`

**Step 1: Rewrite layout.ts**

Replace the entire layout function. Remove the navbar. Add weather-icons CDN and JetBrains Mono font. Keep the Alpine.js theme toggle logic but move it out of the navbar (it'll be used inline by the page). The `<main>` wrapper becomes a centered column.

```typescript
export function layout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="emerald">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5/dist/full.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@2"></script>
  <script src="https://unpkg.com/alpinejs@3" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Instrument Serif', serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen bg-base-200" x-data="{
  dark: localStorage.getItem('theme') === 'forest',
  toggle() {
    this.dark = !this.dark;
    document.documentElement.setAttribute('data-theme', this.dark ? 'forest' : 'emerald');
    localStorage.setItem('theme', this.dark ? 'forest' : 'emerald');
  }
}" x-init="if (dark) document.documentElement.setAttribute('data-theme', 'forest')">
  <main class="max-w-[430px] mx-auto p-5 flex flex-col gap-5">
    ${content}
  </main>
</body>
</html>`;
}
```

Key changes:
- No navbar
- Added JetBrains Mono to Google Fonts link
- Added weather-icons CSS CDN
- Added `.font-mono` style rule
- Alpine.js theme state moved to `<body>` so all modules can reference it
- `<main>` is max-w-[430px], centered, flex column with gap-5 (20px)

**Step 2: Verify layout compiles**

Run: `cd starter && npx wrangler dev` (just make sure it starts without TypeScript errors — the page will look broken until we update index.ts, which is expected)

**Step 3: Commit**

```bash
git add starter/src/layout.ts
git commit -m "refactor: strip navbar from layout, add weather-icons and mono font CDNs"
```

---

### Task 2: Create D1 schema and seed data

**Files:**
- Modify: `starter/schema.sql`

**Step 1: Write the links table schema with seed data**

Replace the contents of `schema.sql`:

```sql
-- Links table for the link tree module
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Seed data (example links — customize these!)
INSERT INTO links (icon, label, url, sort_order) VALUES
  ('github', '/ammonhaggerty', 'https://github.com/ammonhaggerty', 1),
  ('linkedin', '/ammon', 'https://linkedin.com/in/ammon', 2),
  ('link', 'qaswa.com', 'https://qaswa.com', 3),
  ('instagram', '/ammonhaggerty', 'https://instagram.com/ammonhaggerty', 4),
  ('threads', '/ammonhaggerty', 'https://threads.net/@ammonhaggerty', 5),
  ('pinterest', '/qaswa', 'https://pinterest.com/qaswa', 6),
  ('dribbble', '/djammon', 'https://dribbble.com/djammon', 7),
  ('bluesky', '/ammon', 'https://bsky.app/profile/ammon.bsky.social', 8);
```

**Step 2: Apply schema locally**

Run: `cd starter && npx wrangler d1 execute starter-db --local --file=./schema.sql`

Expected: Success message, no errors.

**Step 3: Verify data**

Run: `cd starter && npx wrangler d1 execute starter-db --local --command="SELECT * FROM links ORDER BY sort_order"`

Expected: 8 rows returned with the seed data.

**Step 4: Commit**

```bash
git add starter/schema.sql
git commit -m "feat: add links table schema with seed data"
```

---

### Task 3: Create profile module with weather widget

**Files:**
- Create: `starter/src/modules/profile.ts`

**Step 1: Create the modules directory**

Run: `mkdir -p starter/src/modules`

**Step 2: Write profile.ts**

This module exports two things:
1. `fetchWeather()` — calls WeatherAPI, returns structured data
2. `profileCard()` — returns the HTML string for the profile card

```typescript
// Weather condition code to weather-icons class mapping
const weatherIconMap: Record<number, { day: string; night: string }> = {
  1000: { day: 'wi-day-sunny', night: 'wi-night-clear' },
  1003: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy' },
  1006: { day: 'wi-cloudy', night: 'wi-cloudy' },
  1009: { day: 'wi-cloudy', night: 'wi-cloudy' },
  1030: { day: 'wi-fog', night: 'wi-fog' },
  1063: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1066: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1069: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1072: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1087: { day: 'wi-day-thunderstorm', night: 'wi-night-alt-thunderstorm' },
  1114: { day: 'wi-snow-wind', night: 'wi-snow-wind' },
  1117: { day: 'wi-snow-wind', night: 'wi-snow-wind' },
  1135: { day: 'wi-fog', night: 'wi-fog' },
  1147: { day: 'wi-fog', night: 'wi-fog' },
  1150: { day: 'wi-day-sprinkle', night: 'wi-night-alt-sprinkle' },
  1153: { day: 'wi-day-sprinkle', night: 'wi-night-alt-sprinkle' },
  1168: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1171: { day: 'wi-sleet', night: 'wi-sleet' },
  1180: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1183: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1186: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1189: { day: 'wi-rain', night: 'wi-rain' },
  1192: { day: 'wi-rain', night: 'wi-rain' },
  1195: { day: 'wi-rain', night: 'wi-rain' },
  1198: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  1201: { day: 'wi-rain-mix', night: 'wi-rain-mix' },
  1204: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1207: { day: 'wi-sleet', night: 'wi-sleet' },
  1210: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1213: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1216: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1219: { day: 'wi-snow', night: 'wi-snow' },
  1222: { day: 'wi-snow', night: 'wi-snow' },
  1225: { day: 'wi-snow', night: 'wi-snow' },
  1237: { day: 'wi-hail', night: 'wi-hail' },
  1240: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1243: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1246: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1249: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1252: { day: 'wi-sleet', night: 'wi-sleet' },
  1255: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1258: { day: 'wi-snow', night: 'wi-snow' },
  1261: { day: 'wi-hail', night: 'wi-hail' },
  1264: { day: 'wi-hail', night: 'wi-hail' },
  1273: { day: 'wi-day-thunderstorm', night: 'wi-night-alt-thunderstorm' },
  1276: { day: 'wi-thunderstorm', night: 'wi-thunderstorm' },
  1279: { day: 'wi-day-snow-thunderstorm', night: 'wi-night-alt-snow-thunderstorm' },
  1282: { day: 'wi-snow-thunderstorm', night: 'wi-snow-thunderstorm' },
};

function getWeatherIcon(code: number, isDay: boolean): string {
  const entry = weatherIconMap[code];
  if (!entry) return 'wi-na';
  return isDay ? entry.day : entry.night;
}

interface WeatherData {
  tempF: number;
  conditionCode: number;
  isDay: boolean;
  maxTempF: number;
  minTempF: number;
  sunrise: string;
  sunset: string;
}

export async function fetchWeather(apiKey: string, location: string): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=1`
    );
    if (!res.ok) return null;
    const data = await res.json() as any;
    return {
      tempF: Math.round(data.current.temp_f),
      conditionCode: data.current.condition.code,
      isDay: data.current.is_day === 1,
      maxTempF: Math.round(data.forecast.forecastday[0].day.maxtemp_f),
      minTempF: Math.round(data.forecast.forecastday[0].day.mintemp_f),
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
    };
  } catch {
    return null;
  }
}

// Format "06:02 AM" -> "6:02a"
function formatTime(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;
  const hour = parseInt(match[1], 10);
  const min = match[2];
  const period = match[3].toLowerCase().charAt(0);
  return `${hour}:${min}${period}`;
}

export function profileCard(name: string, location: string, weather: WeatherData | null): string {
  const weatherHtml = weather ? `
          <div class="flex gap-5 items-end mt-1">
            <div class="flex items-end gap-1">
              <i class="wi ${getWeatherIcon(weather.conditionCode, weather.isDay)} text-3xl text-base-content/50"></i>
              <span class="text-xl font-medium">${weather.tempF}&deg;F</span>
            </div>
            <div class="flex flex-col text-xs text-base-content/70">
              <span class="text-sm">&nbsp;</span>
              <span><span class="font-bold text-base-content/40">&darr;</span>${weather.minTempF} <span class="text-base-content/20">|</span> <span class="font-bold text-base-content/40">&uarr;</span>${weather.maxTempF}</span>
            </div>
            <div class="flex flex-col items-center text-xs text-base-content/60 pb-0.5">
              <i class="wi wi-sunrise text-base-content text-base"></i>
              <span>${formatTime(weather.sunrise)}</span>
            </div>
            <div class="flex flex-col items-center text-xs text-base-content/60 pb-0.5">
              <i class="wi wi-sunset text-base-content text-base"></i>
              <span>${formatTime(weather.sunset)}</span>
            </div>
          </div>` : '';

  return `
    <div class="bg-base-100 rounded-xl border border-base-300 flex gap-5 items-center p-4 w-full">
      <div class="w-[82px] h-[82px] rounded-full border border-base-300 bg-base-200 flex-shrink-0 overflow-hidden">
        <img src="https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}" alt="avatar" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col gap-1.5 min-w-0 flex-1">
        <p class="text-lg font-medium tracking-wide">I'm ${escapeHtml(name)}</p>
        <div class="flex gap-1.5 items-center text-base-content/70">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span class="text-sm">${escapeHtml(location)}</span>
        </div>
        ${weatherHtml}
      </div>
    </div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

**Notes for implementer:**
- The avatar uses DiceBear API as a placeholder. Users will replace this with their own image (stored in R2 or a URL).
- `fetchWeather` returns `null` on any error — the card gracefully hides the weather row.
- `formatTime` converts WeatherAPI's "06:02 AM" format to the compact "6:02a" shown in the Figma.
- The weather icon mapping covers all 49 WeatherAPI condition codes.

**Step 3: Commit**

```bash
git add starter/src/modules/profile.ts
git commit -m "feat: add profile module with weather widget"
```

---

### Task 4: Create chat terminal module

**Files:**
- Create: `starter/src/modules/chat.ts`
- Delete: `starter/src/chat.ts` (old chat)

**Step 1: Write the terminal chat module**

```typescript
import type { Context } from 'hono';

export function chatCard(): string {
  return `
    <div class="bg-neutral text-neutral-content rounded-xl w-full cursor-pointer overflow-hidden transition-all duration-300"
         x-data="{ open: false }"
         @click="if (!open) { open = true; $nextTick(() => $refs.chatInput.focus()) }">

      <!-- LED indicator -->
      <div class="p-5 pb-0">
        <div class="rounded-full transition-all duration-500"
             :class="open ? 'w-5 h-5 bg-success shadow-[0_0_12px_rgba(0,255,100,0.4)]' : 'w-3 h-3 bg-neutral-content/30'">
        </div>
      </div>

      <!-- Chat messages -->
      <div class="p-5 pt-4 font-mono text-xs">
        <div id="chat-messages">
          <p class="text-neutral-content/70">&gt; Hi there! I'm your personal assistant.</p>
        </div>

        <!-- Input area (only visible when expanded) -->
        <div x-show="open" x-transition class="mt-3">
          <div class="border-t border-neutral-content/20 pt-3">
            <form hx-post="/api/chat" hx-target="#chat-messages" hx-swap="beforeend"
                  hx-on::after-request="this.reset(); this.querySelector('input').focus();"
                  class="flex items-center gap-2" @click.stop>
              <span class="text-neutral-content/70">&gt;</span>
              <input type="text" name="message" x-ref="chatInput"
                     class="bg-transparent border-none outline-none flex-1 text-white text-xs font-mono placeholder-neutral-content/30"
                     placeholder="type here..." autocomplete="off" required @click.stop />
            </form>
          </div>
        </div>
      </div>
    </div>`;
}

export async function handleChat(c: Context): Promise<Response> {
  const body = await c.req.parseBody();
  const message = body.message as string;

  if (!message?.trim()) {
    return c.html('<p class="text-error">&gt; Please enter a message.</p>');
  }

  try {
    const ai = c.env.AI as Ai;

    const response = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You are a friendly, concise personal assistant. Keep responses to 1-2 sentences. Be warm and helpful.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    }) as { response: string };

    const userLine = `<div class="border-t border-neutral-content/20 mt-3 pt-3"><p>&gt; ${escapeHtml(message)}</p></div>`;
    const aiLine = `<p class="text-neutral-content/70 mt-1">&gt; ${escapeHtml(response.response)}</p>`;

    return c.html(userLine + aiLine);
  } catch {
    const userLine = `<div class="border-t border-neutral-content/20 mt-3 pt-3"><p>&gt; ${escapeHtml(message)}</p></div>`;
    const errorLine = `<p class="text-error mt-1">&gt; Something went wrong. Make sure Workers AI is enabled.</p>`;
    return c.html(userLine + errorLine);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

**Key details:**
- Alpine.js `x-data="{ open: false }"` manages expand/collapse
- Clicking the card sets `open = true` and auto-focuses the input
- The LED circle transitions from small/dim (3x3, 30% opacity) to larger/glowing (5x5, green with box-shadow)
- Chat messages render as terminal lines with `>` prefix
- `@click.stop` on the form/input prevents clicks from toggling the card
- HTMX appends new messages into `#chat-messages`

**Step 2: Delete the old chat file**

Run: `rm starter/src/chat.ts`

**Step 3: Commit**

```bash
git add starter/src/modules/chat.ts
git rm starter/src/chat.ts
git commit -m "feat: add terminal-style chat module, remove old chat page"
```

---

### Task 5: Create links module

**Files:**
- Create: `starter/src/modules/links.ts`

**Step 1: Write links.ts with inline SVG icon map**

```typescript
// Inline SVG icons for social platforms (24x24)
const icons: Record<string, string> = {
  github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  threads: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.29 3.276-.776.965-1.834 1.546-3.15 1.726-1.075.147-2.099-.007-2.96-.446-1-.51-1.661-1.348-1.862-2.36-.17-.857-.025-1.73.408-2.457.498-.836 1.348-1.413 2.46-1.67.89-.206 1.868-.223 2.906-.052.267.044.53.1.789.166.013-.55-.035-1.076-.15-1.55-.236-.97-.79-1.588-1.55-1.77l-.003-.001c-.655-.157-1.399-.093-2.22.19l-.664-1.962c1.114-.377 2.182-.5 3.173-.366 1.424.192 2.506.96 2.946 2.257l.006.002c.003.006.003.012.006.018.344.81.496 1.854.444 3.097l.002.005c.016.128.022.258.022.39 1.076.593 1.903 1.46 2.381 2.559.776 1.782.854 4.588-1.295 6.692-1.783 1.746-4.042 2.558-7.105 2.583zm-1.14-7.036c.074.38.293.678.635.867.467.257 1.112.343 1.76.263.896-.11 1.594-.49 2.133-1.16.426-.531.739-1.246.937-2.142-.483-.123-.987-.21-1.505-.26-1.472-.14-2.654.014-3.405.453-.53.31-.801.738-.801 1.245.001.254.078.487.226.706l.02.028z"/></svg>',
  pinterest: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
  dribbble: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zm7.56-7.872c.282.39 2.145 2.906 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>',
  bluesky: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.52 6.158 3.271-.038 0-.076.009-.113.022-3.677.933-7.592 3.292-4.091 9.146 3.835 5.456 6.647-1.168 7.422-3.547.775 2.379 2.333 8.673 7.422 3.547 3.501-5.854-.414-8.213-4.091-9.146a.903.903 0 0 0-.113-.022c2.558.249 5.373-.644 6.158-3.271C19.622 9.418 20 4.458 20 3.768c0-.69-.139-1.861-.902-2.203-.659-.298-1.664-.62-4.3 1.24C12.046 4.747 9.087 8.686 8 10.8h4z" transform="translate(2 1.5)"/></svg>',
  link: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
};

function getIcon(name: string): string {
  return icons[name] || icons.link;
}

interface Link {
  icon: string;
  label: string;
  url: string;
}

export async function fetchLinks(db: D1Database): Promise<Link[]> {
  try {
    const result = await db.prepare('SELECT icon, label, url FROM links ORDER BY sort_order ASC').all<Link>();
    return result.results;
  } catch {
    return [];
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function linksCard(links: Link[]): string {
  if (links.length === 0) return '';

  const rows = links.map(link => `
        <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"
           class="flex gap-3 items-center p-2 -mx-2 rounded-lg hover:bg-base-200 transition-colors text-base-content">
          <span class="w-6 h-6 flex-shrink-0">${getIcon(link.icon)}</span>
          <span class="text-sm">${escapeHtml(link.label)}</span>
        </a>`).join('\n');

  return `
    <div class="bg-base-100 rounded-xl border border-base-300 p-4 w-full">
      <p class="text-xs font-bold tracking-widest text-base-content/70 mb-4">LINKS</p>
      <div class="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        ${rows}
      </div>
    </div>`;
}
```

**Key details:**
- Links fetched from D1 via `fetchLinks()`, sorted by `sort_order`
- Each link row: icon SVG + label, wrapped in an `<a>` tag
- Responsive: single column on mobile, 2-col on sm, 3-col on lg
- If no links in DB, the card is hidden entirely
- All 8 social icon SVGs are self-contained (no external icon library)

**Step 2: Commit**

```bash
git add starter/src/modules/links.ts
git commit -m "feat: add links module with inline SVG icons and D1 queries"
```

---

### Task 6: Update index.ts — Assemble the modular page

**Files:**
- Modify: `starter/src/index.ts`

**Step 1: Rewrite index.ts**

Replace the entire file. The new version imports all three modules, fetches data, and assembles the page.

```typescript
import { Hono } from 'hono';
import { layout } from './layout';
import { profileCard, fetchWeather } from './modules/profile';
import { chatCard, handleChat } from './modules/chat';
import { linksCard, fetchLinks } from './modules/links';

type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  AI: Ai;
  WEATHER_API_KEY: string;
  WEATHER_LOCATION: string;
  PROFILE_NAME: string;
  PROFILE_LOCATION: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  const name = c.env.PROFILE_NAME || 'Your Name';
  const location = c.env.PROFILE_LOCATION || 'Your City';

  // Fetch weather and links in parallel
  const [weather, links] = await Promise.all([
    c.env.WEATHER_API_KEY
      ? fetchWeather(c.env.WEATHER_API_KEY, c.env.WEATHER_LOCATION || location)
      : Promise.resolve(null),
    fetchLinks(c.env.DB),
  ]);

  const content = `
    <!-- Top bar: greeting + theme toggle -->
    <div class="flex items-center justify-between">
      <h1 class="text-5xl font-bold">Hi!</h1>
      <label class="swap swap-rotate btn btn-ghost btn-circle">
        <input type="checkbox" :checked="dark" @change="toggle()" />
        <svg class="swap-off h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        <svg class="swap-on h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/></svg>
      </label>
    </div>

    ${profileCard(name, location, weather)}
    ${chatCard()}
    ${linksCard(links)}
  `;

  return c.html(layout('Hi!', content));
});

app.post('/api/chat', async (c) => {
  return handleChat(c);
});

export default app;
```

**Key details:**
- Removed: `/api/hello`, `/chat` route, old chat import
- Added: all module imports, env var bindings for weather/profile
- Weather and links fetched in parallel via `Promise.all`
- Weather gracefully skipped if `WEATHER_API_KEY` is not set
- The DaisyUI swap component is used for the theme toggle, driven by Alpine.js `:checked` and `@change`
- Page title is "Hi!" (matching the greeting)

**Step 2: Update .dev.vars with new environment variables**

Add to `starter/.dev.vars` (create if it doesn't exist):

```
WEATHER_API_KEY=your_weatherapi_key_here
WEATHER_LOCATION=Oakland,CA
PROFILE_NAME=Ammon Haggerty
PROFILE_LOCATION=Oakland, CA
```

**Step 3: Start the dev server and verify**

Run: `cd starter && npm run dev`

Expected: Server starts on localhost:8787. Page shows:
- "Hi!" greeting with theme toggle
- Profile card with name and location (weather may show if API key is valid)
- Dark terminal card with greeting text (expandable on click)
- Links card with seed data from D1

**Step 4: Commit**

```bash
git add starter/src/index.ts
git commit -m "feat: assemble modular landing page with profile, chat, and links"
```

---

### Task 7: Final polish and manual verification

**Step 1: Verify all three modules render correctly**

Run: `cd starter && npm run dev`

Check in browser at `http://localhost:8787`:
- [ ] Page loads with "Hi!" greeting and theme toggle
- [ ] Theme toggle switches between emerald and forest
- [ ] Profile card shows name and location
- [ ] Weather widget shows (if API key configured) with icon, temp, high/low, sunrise/sunset
- [ ] Terminal chat card is collapsed with dim LED and greeting
- [ ] Clicking terminal expands it, LED grows and glows green
- [ ] Typing a message and pressing Enter sends it, AI responds
- [ ] Links card shows all 8 seed links with correct icons
- [ ] Links open in new tabs
- [ ] Page is centered and looks good on mobile width (~430px)
- [ ] Dark mode works across all modules

**Step 2: Fix any visual issues found during verification**

Adjust spacing, colors, or sizing as needed to match the Figma design intent.

**Step 3: Final commit**

```bash
git add -A
git commit -m "polish: final adjustments to modular landing page"
```
