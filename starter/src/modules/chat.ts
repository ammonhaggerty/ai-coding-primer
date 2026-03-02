import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { SYSTEM_PROMPT } from '../system-prompt';

// Inline SVGs for expand/collapse buttons (from provided SVG files)
const expandIcon = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H3V7H2V2Z" fill="currentColor"/><path d="M2 3V2L7 2V3L2 3Z" fill="currentColor"/><path d="M2 2.70715L2.70711 2.00005L6.34694 5.63988L5.63983 6.34698L2 2.70715Z" fill="currentColor"/><path d="M9 9L8 9L8 4L9 4L9 9Z" fill="currentColor"/><path d="M9 8L9 9L4 9L4 8L9 8Z" fill="currentColor"/><path d="M9 8.29285L8.29289 8.99995L4.65306 5.36012L5.36017 4.65301L9 8.29285Z" fill="currentColor"/></svg>`;

const collapseIcon = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H7V11H6V6Z" fill="currentColor"/><path d="M6 7V6L11 6V7L6 7Z" fill="currentColor"/><path d="M6 6.70715L6.70711 6.00005L10.3469 9.63988L9.63983 10.347L6 6.70715Z" fill="currentColor"/><path d="M5 5L4 5L4 -8.74228e-08L5 0L5 5Z" fill="currentColor"/><path d="M5 4L5 5L0 5L8.74228e-08 4L5 4Z" fill="currentColor"/><path d="M5 4.29285L4.29289 4.99995L0.653062 1.36012L1.36017 0.653015L5 4.29285Z" fill="currentColor"/></svg>`;

export function chatCard(): string {
  return `
    <div id="chat-card"
         class="bg-neutral text-neutral-content w-full overflow-hidden rounded-[10px] h-[280px] flex flex-col transition-[height] duration-300 relative font-light"
         x-data="{ expanded: false }"
         :style="expanded ? 'position:fixed; z-index:50; top:20px; left:50%; transform:translateX(-50%); width:calc(100vw - 40px); max-width:1320px; height:calc(100vh - 40px); border-radius:10px;' : ''"
         @keydown.escape.window="if (expanded) { expanded = false; document.getElementById('module-profile').style.display = ''; document.getElementById('module-links').style.display = ''; document.getElementById('module-timeline').style.display = ''; document.getElementById('module-timeline-lg').style.display = ''; document.getElementById('module-listening').style.display = ''; document.getElementById('top-bar').style.display = ''; }">

      <!-- Toggle button: 17px visible circle, 30px invisible hit area, circle at 20px from card edge -->
      <button class="absolute z-10 cursor-pointer bg-transparent border-none p-0"
              style="top: 13.5px; left: 13.5px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;"
              @click="expanded = !expanded;
                if (expanded) {
                  document.getElementById('module-profile').style.display = 'none';
                  document.getElementById('module-links').style.display = 'none';
                  document.getElementById('module-timeline').style.display = 'none'; document.getElementById('module-timeline-lg').style.display = 'none';
                  document.getElementById('module-listening').style.display = 'none';
                  document.getElementById('top-bar').style.display = 'none';
                } else {
                  document.getElementById('module-profile').style.display = '';
                  document.getElementById('module-links').style.display = '';
                  document.getElementById('module-timeline').style.display = ''; document.getElementById('module-timeline-lg').style.display = '';
                  document.getElementById('module-listening').style.display = '';
                  document.getElementById('top-bar').style.display = '';
                }
                $nextTick(() => { var el = document.getElementById('chat-scroll'); if (el) el.scrollTop = el.scrollHeight; $refs.chatInput.focus(); setTimeout(() => { if (el) el.scrollTop = el.scrollHeight; }, 350); })">
        <span x-show="!expanded" class="w-[17px] h-[17px] rounded-full bg-[#6E7581] flex items-center justify-center text-neutral-content">${expandIcon}</span>
        <span x-show="expanded" class="w-[17px] h-[17px] rounded-full bg-[#6E7581] flex items-center justify-center text-neutral-content">${collapseIcon}</span>
      </button>

      <!-- Scrollable chat area: top padding = 20px pad + 17px button + 20px gap = 57px -->
      <div id="chat-scroll" class="flex-1 overflow-y-auto"
           style="padding: 57px 20px 20px 20px; scrollbar-width: none; -ms-overflow-style: none;">
        <style>#chat-scroll::-webkit-scrollbar { display: none; }</style>

        <div id="chat-messages" class="flex flex-col gap-[10px]">
          <p class="text-[14px] leading-[1.6]"><span class="text-neutral-content/50">&#x276E;</span> Hi there! I'm here to answer any questions about this starter project, customizing it, or dreaming up something new! Ask me anything.</p>
        </div>

        <!-- Input line: wrapping mirror with hanging indent -->
        <div class="border-t border-neutral-content/20 mt-[10px] pt-[10px] relative">
          <div class="text-[14px] leading-[1.6]" style="padding-left: 2ch; text-indent: -2ch;">
            <span style="font-weight: 800;" class="text-neutral-content/50">&#x276F;</span> <span id="chat-mirror" class="text-neutral-content whitespace-pre-wrap break-words"></span><span class="text-neutral-content animate-blink">&#x2588;</span>
          </div>
          <textarea name="message" x-ref="chatInput" form="chat-form"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                    autocomplete="off" required rows="1"
                    @input="document.getElementById('chat-mirror').textContent = $el.value; var el = document.getElementById('chat-scroll'); el.scrollTop = el.scrollHeight;"
                    @keydown.enter.prevent="if ($el.value.trim()) { document.getElementById('chat-form').requestSubmit(); }"></textarea>
          <form id="chat-form" hx-post="/api/chat" hx-target="#chat-messages" hx-swap="beforeend"
                hx-on::after-request="var inp = document.querySelector('[x-ref=chatInput]'); inp.value = ''; document.getElementById('chat-mirror').textContent = ''; inp.focus(); var el = document.getElementById('chat-scroll'); el.scrollTop = el.scrollHeight;">
          </form>
        </div>
      </div>
    </div>`;
}

function getSessionId(c: Context): string {
  let sid = getCookie(c, 'chat_session');
  if (!sid) {
    sid = crypto.randomUUID();
    setCookie(c, 'chat_session', sid, {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  return sid;
}

const MAX_HISTORY = 30; // last 30 messages (15 exchanges)

export async function handleChat(c: Context): Promise<Response> {
  const body = await c.req.parseBody();
  const message = body.message as string;

  if (!message?.trim()) {
    return c.html('<p class="text-error text-[14px] leading-[1.6]">&#x276E; Please enter a message.</p>');
  }

  const sessionId = getSessionId(c);
  const db = c.env.DB as D1Database;

  try {
    // Store user message
    await db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)')
      .bind(sessionId, 'user', message).run();

    // Load conversation history
    const history = await db.prepare(
      'SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at DESC LIMIT ?'
    ).bind(sessionId, MAX_HISTORY).all<{ role: string; content: string }>();

    // Build messages array: system prompt + history (reversed to chronological)
    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.results.reverse(),
    ];

    const ai = c.env.AI as Ai;
    const response = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
      messages,
    }) as { response: string };

    // Store AI response
    await db.prepare('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)')
      .bind(sessionId, 'assistant', response.response).run();

    const userLine = `<div class="border-t border-neutral-content/20 mt-[10px] pt-[10px]"><p class="text-[14px] leading-[1.6]"><span style="font-weight: 800;" class="text-neutral-content/50">&#x276F;</span> ${escapeHtml(message)}</p></div>`;
    const aiLine = `<p class="text-[14px] leading-[1.6] mt-[10px]"><span class="text-neutral-content/50">&#x276E;</span> ${escapeHtml(response.response)}</p>`;

    return c.html(userLine + aiLine);
  } catch {
    const userLine = `<div class="border-t border-neutral-content/20 mt-[10px] pt-[10px]"><p class="text-[14px] leading-[1.6]"><span style="font-weight: 800;" class="text-neutral-content/50">&#x276F;</span> ${escapeHtml(message)}</p></div>`;
    const errorLine = `<p class="text-error text-[14px] leading-[1.6] mt-[10px]">&#x276E; Something went wrong. Make sure Workers AI is enabled.</p>`;
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
