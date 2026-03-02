interface TimelineEntry {
  year: string;
  badge: string;
  type: 'spring' | 'winter' | 'wave';
  description: string;
  side: 'left' | 'right';
}

const entries: TimelineEntry[] = [
  { year: '2023', badge: '4TH AGENT WAVE', type: 'wave', description: 'Autonomous AI Agents', side: 'right' },
  { year: '2018', badge: '5TH AI SPRING', type: 'spring', description: 'The Generative AI Era', side: 'left' },
  { year: '2016', badge: '4TH AI WINTER', type: 'winter', description: 'The Assistant Trough', side: 'left' },
  { year: '2012', badge: '4TH AI SPRING', type: 'spring', description: 'Deep Learning Revolution', side: 'left' },
  { year: '2011', badge: '3RD AGENT WAVE', type: 'wave', description: 'The Virtual Assistants', side: 'right' },
  { year: '2000', badge: '3RD AI WINTER', type: 'winter', description: 'The Analytics Rebrand', side: 'left' },
  { year: '1993', badge: '2ND AGENT WAVE', type: 'wave', description: 'Web Agents & Intelligent Bots', side: 'right' },
  { year: '1993', badge: '3RD AI SPRING', type: 'spring', description: 'Statistical AI & Internet Wave', side: 'left' },
  { year: '1987', badge: '2ND AI WINTER', type: 'winter', description: 'The Expert Systems Crash', side: 'left' },
  { year: '1980', badge: '2ND AI SPRING', type: 'spring', description: 'The Expert Systems Boom', side: 'left' },
  { year: '1974', badge: '1ST AI WINTER', type: 'winter', description: 'The Lighthill Chill', side: 'left' },
  { year: '1965', badge: '1ST AGENT WAVE', type: 'wave', description: 'Software Agents', side: 'right' },
  { year: '1956', badge: '1ST AI SPRING', type: 'spring', description: 'The Golden Era', side: 'left' },
];

function badgeClasses(type: 'spring' | 'winter' | 'wave'): string {
  if (type === 'winter') return 'bg-neutral text-neutral-content';
  return 'bg-base-200 text-base-content';
}

export function timelineCard(): string {
  const items = entries.map((entry, i) => {
    const isLast = i === entries.length - 1;
    const badge = badgeClasses(entry.type);
    const align = entry.side === 'left' ? ' items-end text-end' : '';

    const content = `
        <div class="flex flex-col gap-1 pb-[20px]${align}">
          <span class="text-[14px] font-extrabold">${entry.year}</span>
          <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${badge}">${entry.badge}</span>
          <span class="text-[14px]">${entry.description}</span>
        </div>`;

    const start = entry.side === 'left'
      ? `\n      <div class="timeline-start">${content}\n      </div>` : '';
    const end = entry.side === 'right'
      ? `\n      <div class="timeline-end">${content}\n      </div>` : '';

    return `
    <li>
      <hr/>${start}
      <div class="timeline-middle">
        <div class="w-2.5 h-2.5 rounded-full bg-base-content"></div>
      </div>${end}${!isLast ? '\n      <hr/>' : ''}
    </li>`;
  }).join('');

  return `
    <div class="card card-border bg-base-100 w-full">
      <div class="p-[15px] flex flex-col gap-[15px]">
        <p class="text-[14px] font-extrabold tracking-[0.28px]">TIMELINE OF AI</p>
        <ul class="timeline timeline-vertical">
          <li>
            <div class="timeline-middle">
              <div class="w-2.5 h-2.5 rounded-full bg-base-content"></div>
            </div>
            <div class="timeline-end">
              <span class="text-[14px] font-extrabold">NOW</span>
            </div>
            <hr/>
          </li>${items}
        </ul>
      </div>
    </div>`;
}
