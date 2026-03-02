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
      <h1 class="text-5xl font-black">Hi!</h1>
      <label class="swap swap-rotate btn btn-ghost btn-circle">
        <input type="checkbox" :checked="dark" @change="toggle()" />
        <svg class="swap-off h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        <svg class="swap-on h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z"/></svg>
      </label>
    </div>

    <!-- Module grid: 1 col on mobile, 3 cols on desktop -->
    <div class="flex flex-col lg:flex-row gap-5 items-start">
      <!-- Column 1: Profile + Links -->
      <div class="w-full lg:flex-1 lg:max-w-[420px] flex flex-col gap-5">
        ${profileCard(name, location, weather)}
        ${linksCard(links)}
      </div>

      <!-- Column 2: (future modules) -->
      <div class="hidden lg:flex lg:flex-1 lg:max-w-[420px] flex-col gap-5">
      </div>

      <!-- Column 3: Chat -->
      <div class="w-full lg:flex-1 lg:max-w-[420px] flex flex-col gap-5">
        ${chatCard()}
      </div>
    </div>
  `;

  return c.html(layout('Hi!', content));
});

app.post('/api/chat', async (c) => {
  return handleChat(c);
});

export default app;
