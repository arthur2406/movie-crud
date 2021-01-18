CREATE TABLE Movie (
    id Serial PRIMARY KEY ,
    title VARCHAR (150) NOT NULL,
    releaseYear NUMERIC (4) NOT NULL,
    format VARCHAR (20) NOT NULL
);

CREATE TABLE Star (
    id Serial PRIMARY KEY,
    fullName VARCHAR (80) NOT NULL
);


CREATE TABLE StarMovie (
    movieId INTEGER NOT NULL,
    starId INTEGER NOT NULL,
    PRIMARY KEY (movieId, starId),
    FOREIGN KEY (movieId) REFERENCES Movie(id) ON DELETE CASCADE, 
    FOREIGN KEY (starId) REFERENCES Star(id) 
);


ALTER TABLE Star
ADD UNIQUE (fullName);