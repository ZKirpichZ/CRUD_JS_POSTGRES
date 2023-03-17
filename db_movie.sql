CREATE TABLE movie(
    movie_id SERIAL PRIMARY KEY,
    title varchar(64),
    release_year int
);

CREATE TABLE genre(
    genre_id SERIAL PRIMARY KEY,
    title varchar(32)
);

CREATE TABLE genreMovie(
    movie_id int REFERENCES movie(movie_id),
    genre_id int REFERENCES genre(genre_id),

    CONSTRAINT film_genre_pk PRIMARY KEY (movie_id, genre_id)
);