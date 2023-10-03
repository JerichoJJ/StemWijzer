DROP DATABASE IF EXISTS stemwijzer;

CREATE DATABASE stemwijzer;

USE stemwijzer;

CREATE TABLE partijen (
    partij_id INT PRIMARY KEY,
    partij_naam VARCHAR(255),
    partij_leider VARCHAR(255)
);

INSERT INTO partijen (partij_id, partij_naam, partij_leider)
VALUES
    (1, 'Partij A', 'Leider A'),
    (2, 'Partij B', 'Leider B'),
    (3, 'Partij C', 'Leider C');

CREATE TABLE stellingen (
    stelling_id INT PRIMARY KEY,
    stelling_text VARCHAR(255)
);

INSERT INTO stellingen (stelling_id, stelling_text)
VALUES
    (1, 'Stelling 1'),
    (2, 'Stelling 2'),
    (3, 'Stelling 3');

ALTER TABLE stellingen
ADD COLUMN eens INT,
ADD COLUMN oneens INT,
ADD COLUMN geen_mening INT,
ADD FOREIGN KEY (eens) REFERENCES partijen(partij_id),
ADD FOREIGN KEY (oneens) REFERENCES partijen(partij_id),
ADD FOREIGN KEY (geen_mening) REFERENCES partijen(partij_id);
