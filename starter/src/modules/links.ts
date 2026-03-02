// Bootstrap Icons class names for social platforms
const icons: Record<string, string> = {
  github: 'bi-github',
  linkedin: 'bi-linkedin',
  instagram: 'bi-instagram',
  threads: 'bi-threads',
  discord: 'bi-discord',
  discogs: 'bi-disc',
  substack: 'bi-substack',
  link: 'bi-link-45deg',
};

function getIcon(name: string): string {
  return icons[name] || icons.link;
}

interface Link {
  icon: string;
  label: string;
  url: string;
}

export async function fetchLinks(db: D1Database): Promise<Link[]> {
  try {
    const result = await db.prepare('SELECT icon, label, url FROM links ORDER BY sort_order ASC').all<Link>();
    return result.results;
  } catch {
    return [];
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

export function linksCard(links: Link[]): string {
  if (links.length === 0) return '';

  const rows = links.map(link => `
          <li>
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="text-[14px]">
              <i class="bi ${getIcon(link.icon)} text-[18px]"></i>
              ${escapeHtml(link.label)}
            </a>
          </li>`).join('\n');

  return `
    <div class="card card-border bg-base-100 w-full">
      <div class="p-[15px] pb-[20px] flex flex-col gap-[25px]">
        <p class="text-[14px] font-extrabold tracking-[0.28px]">LINKS</p>
        <ul class="menu gap-[10px] p-[0px]">
          ${rows}
        </ul>
      </div>
    </div>`;
}
