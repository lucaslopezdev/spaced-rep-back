-- DROP TABLE IF EXISTS
DROP TABLE IF EXISTS Album_cards;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Cards;
DROP TABLE IF EXISTS UserAlbumAccess;

-- CREATE TABLE Album_cards
CREATE TABLE Album_cards (
  album_id UUID PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- CREATE TABLE Users
CREATE TABLE Users (
  user_id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp
);

-- CREATE TABLE Cards
CREATE TABLE Cards (
  card_id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  solution TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 0,
  last_review VARCHAR,
  next_review_interval INTEGER,
  user_id UUID,
  album_id UUID,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (album_id) REFERENCES Album_cards(album_id)
);

-- CREATE TABLE UserAlbumAccess
CREATE TABLE UserAlbumAccess (
  user_id UUID,
  album_id UUID,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (album_id) REFERENCES Album_cards(album_id),
  PRIMARY KEY (user_id, album_id)
);