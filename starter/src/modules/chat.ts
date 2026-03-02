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
