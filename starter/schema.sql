-- Chat conversation history
CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id, created_at);

-- Links table for the link tree module
CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0
);

-- Seed data (example links — customize these!)
-- Uses INSERT OR IGNORE with a unique constraint to avoid duplicates on re-run.
INSERT OR IGNORE INTO links (icon, label, url, sort_order) VALUES
  ('github', '/ammonhaggerty', 'https://github.com/ammonhaggerty', 1),
  ('linkedin', '/ammon', 'https://linkedin.com/in/ammon', 2),
  ('link', 'qaswa.com', 'https://qaswa.com', 3),
  ('instagram', '/ammonhaggerty', 'https://instagram.com/ammonhaggerty', 4),
  ('threads', '/ammonhaggerty', 'https://threads.net/@ammonhaggerty', 5),
  ('discord', '/djammon', 'https://discord.com/users/djammon', 6),
  ('discogs', '/ammonhaggerty', 'https://discogs.com/user/ammonhaggerty', 7),
  ('substack', '/ammon', 'https://substack.com/@ammon', 8);
