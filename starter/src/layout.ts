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
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Instrument Serif', serif; }
  </style>
</head>
<body class="min-h-screen bg-base-200">
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" href="/" style="font-family: 'Instrument Serif', serif;">Your Project</a>
    </div>
    <div class="flex-none gap-2">
      <a href="/" class="btn btn-ghost btn-sm">Home</a>
      <a href="/chat" class="btn btn-ghost btn-sm">Chat</a>
      <div x-data="{
        dark: localStorage.getItem('theme') === 'forest',
        toggle() {
          this.dark = !this.dark;
          document.documentElement.setAttribute('data-theme', this.dark ? 'forest' : 'emerald');
          localStorage.setItem('theme', this.dark ? 'forest' : 'emerald');
        }
      }" x-init="if (dark) document.documentElement.setAttribute('data-theme', 'forest')">
        <button class="btn btn-ghost btn-sm btn-square" @click="toggle()">
          <svg x-show="!dark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          <svg x-show="dark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </button>
      </div>
    </div>
  </div>
  <main class="container mx-auto p-4">
    ${content}
  </main>
</body>
</html>`;
}
