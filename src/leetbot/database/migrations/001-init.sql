-- Up
PRAGMA foreign_keys = ON;
CREATE TABLE 'servers' (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE 'users' (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  avatarUrl TEXT
);

CREATE TABLE 'messages' (
  id INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  serverId INTEGER NOT NULL,
  type TEXT,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (serverId) REFERENCES servers (id)
);

-- Down
DROP TABLE IF EXISTS 'messages';
DROP TABLE IF EXISTS 'users';
DROP TABLE IF EXISTS 'servers';
PRAGMA foreign_keys = OFF;