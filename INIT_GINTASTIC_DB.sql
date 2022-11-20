DROP DATABASE IF EXISTS gintasticDB;
CREATE DATABASE gintasticDB;
USE gintasticDB;

CREATE TABLE gins (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  alcohol_content FLOAT(3,1),
  origin_country VARCHAR(255),
  origin_city VARCHAR(255),
  botanicals VARCHAR(255),
  description VARCHAR(255),
  is_public BOOLEAN NOT NULL,
  is_tipp BOOLEAN NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  users VARCHAR(255) NOT NULL
);

CREATE TABLE friends (
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  FOREIGN KEY (user_id1) REFERENCES users(id),
  FOREIGN KEY (user_id2) REFERENCES users(id),
  CONSTRAINT id PRIMARY KEY (user_id1, user_id2)
);

CREATE TABLE tasting_notes (
  id INT PRIMARY KEY NOT NULL,
  gin_id INT NOT NULL,
  user_id INT NOT NULL,
  nosing VARCHAR(255),
  tasting VARCHAR(255),
  perfect_serve VARCHAR(255),
  rating BIT(3),
  FOREIGN KEY (gin_id) REFERENCES gins(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT unique_user_gin_tasting_notes UNIQUE (gin_id,user_id)
);

CREATE TABLE tags (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE gin_tags_lookup (
  gin_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (gin_id) REFERENCES gins(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id),
  CONSTRAINT id PRIMARY KEY (gin_id,tag_id)
);

CREATE TABLE proposed_gins (
  gin_id INT NOT NULL,
  tasting_notes_id INT NOT NULL,
  FOREIGN KEY (gin_id) REFERENCES gins(id),
  FOREIGN KEY (tasting_notes_id) REFERENCES tasting_notes(id),
  CONSTRAINT id PRIMARY KEY (gin_id, tasting_notes_id)
);

CREATE TABLE gin_tastings (
  id INT PRIMARY KEY NOT NULL,
  creator INT NOT NULL,
  event_state int NOT NULL,
  event_date_start DATE,
  event_date_end DATE,
  event_location VARCHAR(255),
  event_costs int, 	
  FOREIGN KEY (creator) REFERENCES users(id)
);

CREATE TABLE gin_tastings_participants (
  gin_tasting_id INT NOT NULL,
  participant INT NOT NULL,
  state INT NOT NULL,
  FOREIGN KEY (gin_tasting_id) REFERENCES gin_tastings(id),
  FOREIGN KEY (participant) REFERENCES users(id)
);

CREATE TABLE gin_tasting_gins (
  id INT PRIMARY KEY NOT NULL,
  gin_tasting_id INT NOT NULL,
  gin_id INT NOT NULL,
  FOREIGN KEY (gin_tasting_id) REFERENCES gin_tastings(id),
  FOREIGN KEY (gin_id) REFERENCES gins(id),
  CONSTRAINT unique_gin_tasting_gins UNIQUE (gin_tasting_id,gin_id)
);

CREATE TABLE gin_tasting_gin_votes (
  gin_tasting_gin_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (gin_tasting_gin_id) REFERENCES gin_tasting_gins(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT unique_gin_tasting_gin_user_votes UNIQUE (gin_tasting_gin_id,user_id)
);