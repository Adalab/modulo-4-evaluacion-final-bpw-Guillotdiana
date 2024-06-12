CREATE DATABASE library;
USE library;

CREATE TABLE library (
id int auto_increment primary key,
name varchar(60) not null,
genre varchar(45) not null,
author varchar(45) not null

);

INSERT INTO library (name, genre, author)
VALUES ('La sombre del viento', 'Suspense', 'Carlos Ruiz Zafon'),
('El duque y yo', 'Romance', 'Julia Quinn');