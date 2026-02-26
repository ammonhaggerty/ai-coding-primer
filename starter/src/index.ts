import { Hono } from 'hono';
import { layout } from './layout';
import { chatPage, handleChat } from './chat';

type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
  AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  const content = `
    <div class="hero min-h-[60vh]">
      <div class="hero-content text-center">
        <div class="max-w-lg">
          <h1 class="text-6xl font-bold hero-title" style="opacity: 0;">Your Project</h1>
          <p class="py-6 text-lg text-base-content/70 hero-subtitle" style="opacity: 0;">Built with Hono, DaisyUI, and Cloudflare Workers. Edit this page and start building.</p>
          <div class="flex gap-3 justify-center hero-actions" style="opacity: 0;">
            <button class="btn btn-primary" hx-get="/api/hello" hx-target="#api-result" hx-swap="innerHTML">Test API</button>
            <a href="/chat" class="btn btn-outline">Try the Chat</a>
          </div>
          <div id="api-result" class="mt-6 text-sm text-base-content/50"></div>
        </div>
      </div>
    </div>
    <script>
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' });
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', delay: 0.15 });
      gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', delay: 0.3 });
    </script>
  `;
  return c.html(layout('Home', content));
});

app.get('/api/hello', (c) => {
  return c.html('<div class="badge badge-success gap-2">API is working</div>');
});

app.get('/chat', (c) => {
  return c.html(layout('Chat', chatPage()));
});

app.post('/api/chat', async (c) => {
  return handleChat(c);
});

export default app;
