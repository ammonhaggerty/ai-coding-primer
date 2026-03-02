# Starter Project: Modular Landing Page Design

**Date:** 2026-03-01
**Status:** Approved

## Overview

Transform the starter project from a generic hero page into a mobile-first personal landing page. The page is a vertical stack of modular cards — an empty vessel for new ideas that feels like a magic creation.

This replaces the current homepage entirely. No navbar. The page IS the app.

## Architecture

Server-rendered with Hono. All modules render server-side on page load. HTMX handles chat interaction. Alpine.js manages UI state (theme toggle, chat expand/collapse). GSAP for animations.

### File Structure

```
src/
├── index.ts              # Main route — assembles modules into page
├── layout.ts             # HTML shell — updated CDN links, no navbar
├── modules/
│   ├── profile.ts        # Profile card + weather widget
│   ├── chat.ts           # Terminal-style chat (replaces src/chat.ts)
│   └── links.ts          # Link tree from D1
schema.sql                # Links table + seed data
```

### Environment Variables (.dev.vars)

```
WEATHER_API_KEY=<weatherapi.com key>
WEATHER_LOCATION=Oakland,CA
PROFILE_NAME=Ammon Haggerty
PROFILE_LOCATION=Oakland, CA
```

## Page Layout

- Max width ~430px, centered on all viewports
- 20px padding, 20px gap between modules
- DaisyUI emerald (light) / forest (dark) themes
- Background: `bg-base-200`

**Top bar:** Large greeting ("Hi!") in Instrument Serif + DaisyUI swap toggle (sun/moon icons)

**Module stack:**
1. Profile card
2. Chat terminal card
3. Links card

## Module 1: Profile Card

White card (`bg-base-100 rounded-xl border border-base-300`) with horizontal layout:

- **Left:** 82px circle avatar with border
- **Right column:**
  - Name (from `PROFILE_NAME` env var)
  - Map-pin icon + location (from `PROFILE_LOCATION`)
  - Weather row:
    - Weather icon (weather-icons CDN, mapped from condition code) + current temp
    - High/low temps with up/down arrows
    - Sunrise icon + time
    - Sunset icon + time

### Weather Integration

- **API:** WeatherAPI.com free plan — `GET https://api.weatherapi.com/v1/forecast.json?key=KEY&q=LOCATION&days=1`
- **Fields used:** `current.temp_f`, `current.condition.code`, `current.is_day`, `forecast.forecastday[0].day.maxtemp_f`, `forecast.forecastday[0].day.mintemp_f`, `forecast.forecastday[0].astro.sunrise`, `forecast.forecastday[0].astro.sunset`
- **Icon mapping:** WeatherAPI condition code → weather-icons CSS class (e.g., 1000 + is_day → `wi-day-sunny`)
- **CDN:** `https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css`
- **Fallback:** If API call fails, hide weather row entirely. Card still shows name + location.

## Module 2: Chat Terminal

Dark card (`bg-neutral text-neutral-content rounded-xl`) styled as a terminal window.

### Collapsed State (default)
- Small circle LED indicator top-left (dim)
- Last 2-3 lines of chat in monospace font
- Subtle divider between messages
- Whole card clickable to expand

### Expanded State
- LED grows larger with subtle glow/pulse
- Card height increases (CSS transition / GSAP)
- Scrollable chat history
- Bottom input: `> [text input]` — monospace, no border, just the prompt character
- Send on Enter

### Backend
- Cloudflare Workers AI (`@cf/meta/llama-3.2-3b-instruct`)
- System prompt: friendly personal assistant
- HTMX `hx-post="/api/chat"` — response appends as new terminal lines
- Alpine.js: `x-data="{ open: false }"` for expand/collapse
- GSAP: LED scale animation

## Module 3: Links

White card (`bg-base-100 rounded-xl border border-base-300`) with vertical link list.

### Structure
- "LINKS" header — bold, small, label style
- Rows: 24px icon + label text, each an `<a target="_blank">`
- Hover: subtle background highlight

### D1 Schema

```sql
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);
```

Seeded with example social links (GitHub, LinkedIn, generic link, Instagram, Threads, Pinterest, Dribbble, Bluesky).

### Icons
Inline SVG map in the module code. Supported: `github`, `linkedin`, `instagram`, `threads`, `pinterest`, `dribbble`, `bluesky`, `link`.

### Responsive
Single column on mobile. CSS grid 2-3 columns on desktop when 6+ links.

## Typography

- **Greeting:** Instrument Serif (already in project via Google Fonts)
- **Body text:** Inter (already in project via Google Fonts)
- **Terminal:** JetBrains Mono or Fira Code (add via Google Fonts CDN)

## Theme

DaisyUI emerald (light) / forest (dark) with Alpine.js toggle. Same approach as current starter, just moved from navbar into the top bar next to the greeting.

## What Gets Removed

- Current hero section with GSAP animation
- Navbar with Home/Chat links
- Separate `/chat` route and page
- Current `src/chat.ts` (replaced by `src/modules/chat.ts`)

## What Gets Added

- `src/modules/` directory with three module files
- Weather-icons CDN link in layout
- Monospace font CDN link in layout
- D1 links table and seed data
- New env vars for weather API and profile info
