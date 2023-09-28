CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
    movie_id UUID REFERENCES movies(id),
    genre_id UUID REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);