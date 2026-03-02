export function layout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="emerald">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5/themes.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="https://unpkg.com/htmx.org@2"></script>
  <script src="https://unpkg.com/alpinejs@3" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=JetBrains+Mono:wght@100;300;400;500;700;800&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" rel="stylesheet" />
  <script>
    // Restore saved theme before paint to prevent flash
    if (localStorage.getItem('theme') === 'forest') {
      document.documentElement.setAttribute('data-theme', 'forest');
    }
  </script>
  <style>
    body { font-family: 'JetBrains Mono', monospace; }
    h1, h2, h3 { font-family: 'Fraunces', serif; }
  </style>
</head>
<body class="min-h-screen bg-base-200">
  <main class="max-w-[1320px] mx-auto p-5 flex flex-col gap-5">
    ${content}
  </main>
  <script>
    // Sync theme toggle with stored theme
    document.addEventListener('DOMContentLoaded', function() {
      var isDark = localStorage.getItem('theme') === 'forest';
      var tc = document.querySelector('.theme-controller');
      var knob = document.querySelector('.toggle-knob');
      if (tc && isDark) tc.checked = true;
      if (knob && isDark) {
        knob.classList.add('translate-x-[30px]');
        knob.querySelector('.icon-sun').style.display = 'none';
        knob.querySelector('.icon-moon').style.display = 'block';
      }
    });
  </script>
</body>
</html>`;
}
