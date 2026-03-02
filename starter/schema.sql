-- Links table for the link tree module
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Seed data (example links — customize these!)
INSERT INTO links (icon, label, url, sort_order) VALUES
  ('github', '/ammonhaggerty', 'https://github.com/ammonhaggerty', 1),
  ('linkedin', '/ammon', 'https://linkedin.com/in/ammon', 2),
  ('link', 'qaswa.com', 'https://qaswa.com', 3),
  ('instagram', '/ammonhaggerty', 'https://instagram.com/ammonhaggerty', 4),
  ('threads', '/ammonhaggerty', 'https://threads.net/@ammonhaggerty', 5),
  ('pinterest', '/qaswa', 'https://pinterest.com/qaswa', 6),
  ('dribbble', '/djammon', 'https://dribbble.com/djammon', 7),
  ('bluesky', '/ammon', 'https://bsky.app/profile/ammon.bsky.social', 8);
