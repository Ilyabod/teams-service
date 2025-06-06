
CREATE DATABASE IF NOT EXISTS sports;
USE sports;

CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS sports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sport_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country_id INT NOT NULL,
  sport_id INT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (sport_id) REFERENCES sports(id)
);

INSERT INTO countries (country_name) VALUES ('USA'), ('Germany'), ('Brazil');
INSERT INTO sports (sport_name) VALUES ('Football'), ('Basketball'), ('Baseball');
INSERT INTO teams (name, country_id, sport_id) VALUES
('LA Lakers', 1, 2),
('New York Yankees', 1, 3),
('Bayern Munich', 2, 1),
('Sao Paulo FC', 3, 1);