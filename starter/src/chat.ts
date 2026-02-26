import type { Context } from 'hono';

export function chatPage(): string {
  return `
    <div class="max-w-2xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      <h1 class="text-3xl font-bold mb-4">Chat</h1>
      <p class="text-sm text-base-content/60 mb-4">A simple AI chat powered by Cloudflare Workers AI. Ask anything.</p>

      <div id="messages" class="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-base-100 rounded-lg border border-base-300">
        <div class="chat chat-start">
          <div class="chat-bubble chat-bubble-primary">Hi! I'm an AI assistant running on Cloudflare Workers AI. How can I help?</div>
        </div>
      </div>

      <form hx-post="/api/chat" hx-target="#messages" hx-swap="beforeend" hx-on::after-request="this.reset(); document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;" class="flex gap-2">
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          class="input input-bordered flex-1"
          autocomplete="off"
          required
        />
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
  `;
}

export async function handleChat(c: Context): Promise<Response> {
  const body = await c.req.parseBody();
  const message = body.message as string;

  if (!message?.trim()) {
    return c.html('<div class="chat chat-start"><div class="chat-bubble chat-bubble-error">Please enter a message.</div></div>');
  }

  try {
    const ai = c.env.AI as Ai;

    const response = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful, friendly assistant. Keep responses concise — a few sentences at most. Be warm and clear.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    }) as { response: string };

    const userBubble = `<div class="chat chat-end"><div class="chat-bubble">${escapeHtml(message)}</div></div>`;
    const aiBubble = `<div class="chat chat-start"><div class="chat-bubble chat-bubble-primary">${escapeHtml(response.response)}</div></div>`;

    return c.html(userBubble + aiBubble);
  } catch {
    return c.html(
      `<div class="chat chat-end"><div class="chat-bubble">${escapeHtml(message)}</div></div>` +
      `<div class="chat chat-start"><div class="chat-bubble chat-bubble-error">Something went wrong. Make sure Workers AI is enabled on your Cloudflare account.</div></div>`
    );
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
