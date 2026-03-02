import { Hono } from 'hono';
import { layout } from './layout';
import { profileCard, fetchWeather } from './modules/profile';
import { chatCard, handleChat } from './modules/chat';
import { linksCard, fetchLinks } from './modules/links';
import { timelineCard } from './modules/timeline';
import { listeningCard } from './modules/listening';

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
    <div id="top-bar" class="flex items-center justify-between">
      <h1 class="text-5xl font-black">Hi!</h1>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="forest" class="theme-controller sr-only"
               onchange="localStorage.setItem('theme', this.checked ? 'forest' : 'emerald'); var k=document.querySelector('.toggle-knob'); k.classList.toggle('translate-x-[30px]', this.checked); k.querySelector('.icon-sun').style.display=this.checked?'none':'block'; k.querySelector('.icon-moon').style.display=this.checked?'block':'none'" />
        <div class="w-[68px] bg-base-300 rounded-[40px] p-[3px] transition-colors">
          <div class="toggle-knob w-[30px] h-[30px] bg-base-100 rounded-[20px] flex items-center justify-center transition-transform duration-200">
            <svg class="icon-sun w-[20px] h-[20px] text-base-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
            <svg class="icon-moon w-[20px] h-[20px] text-base-content" style="display:none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
          </div>
        </div>
      </label>
    </div>

    <!-- Masonry layout: mobile 1-col, md 2-col, xl 3-col with spacer -->
    <div class="flex flex-col gap-5 md:flex-row md:items-start">
      <!-- Left column: contents on mobile, column wrapper on md+ -->
      <div class="contents md:flex md:flex-col md:gap-5 md:flex-1">
        <div id="module-profile" class="order-1 md:order-none">
          ${profileCard(name, location, weather)}
        </div>
        <div id="module-timeline" class="order-4 md:order-none min-[1100px]:hidden">
          ${timelineCard()}
        </div>
        <div id="module-links" class="order-5 md:order-none">
          ${linksCard(links)}
        </div>
      </div>
      <!-- Middle column: timeline (1100px+) -->
      <div id="module-timeline-lg" class="hidden min-[1100px]:block min-[1100px]:flex-1">
        ${timelineCard()}
      </div>
      <!-- Right column: contents on mobile, column wrapper on md+ -->
      <div class="contents md:flex md:flex-col md:gap-5 md:flex-1">
        <div class="order-2 md:order-none">
          ${chatCard()}
        </div>
        <div id="module-listening" class="order-3 md:order-none">
          ${listeningCard()}
        </div>
      </div>
    </div>

    <style>
      @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      .animate-blink { animation: blink 1s step-end infinite; }
    </style>
  `;

  return c.html(layout('Hi!', content));
});

app.post('/api/chat', async (c) => {
  return handleChat(c);
});

export default app;
