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
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" rel="stylesheet" />
  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Fraunces', serif; }
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
  <main class="max-w-[1320px] mx-auto p-5 flex flex-col gap-5">
    ${content}
  </main>
</body>
</html>`;
}
