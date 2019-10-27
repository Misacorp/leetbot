-- Up
PRAGMA foreign_keys = ON;
CREATE TABLE 'servers' (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  iconUrl TEXT
);

CREATE TABLE 'users' (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  avatarUrl TEXT
);

CREATE TABLE 'messages' (
  id INTEGER PRIMARY KEY NOT NULL,
  userId INTEGER NOT NULL,
  serverId INTEGER NOT NULL,
  type TEXT,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (serverId) REFERENCES servers (id)
);

-- Down
DROP TABLE IF EXISTS 'messages';
DROP TABLE IF EXISTS 'users';
DROP TABLE IF EXISTS 'servers';
PRAGMA foreign_keys = OFF;