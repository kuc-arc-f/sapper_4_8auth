CREATE TABLE tasks(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  uid INTEGER,
  up_date TIMESTAMP
);