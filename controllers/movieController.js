const db = require("../db");
const movieGenreController = require("./movieGenreController");

class movieController {
  async createMovie(req, res) {
    const id = req.params.id;
    const { title, release_year, genre_id } = req.body;
    let Movie;
    const Mov = await db.query("SELECT * FROM movie ");
    const Elem = Mov.rows.filter((elem) => (elem.title == title));
    if (!Elem.length) {
      Movie = await db.query(
        "INSERT into movie (title, release_year) values ($1, $2) RETURNING *",
        [title, release_year]
      );
      } else {
        Movie = await db.query(`SELECT * FROM movie where movie_id = ${Elem[0].movie_id}`)
     }

    const mov_id = Movie.rows[0].movie_id;
    if (genre_id > 0) {
      await movieGenreController.add(mov_id, genre_id);
    }

    res.send(Movie.rows[0]);
  }

  async getMovie(req, res) {
    const movie = await db.query(`SELECT movie.title as title, movie.release_year, 
            array_agg(genre.title) as genres 
            FROM movie
            LEFT JOIN genreMovie  ON genreMovie.movie_id = movie.movie_id
            LEFT JOIN genre ON genreMovie.genre_id = genre.genre_id GROUP BY movie.title, movie.release_year`);
    res.send(movie.rows);
  }

  async updateMovie(req, res) {
    const { id, title, release_year} = req.body;
    let Movie;
    const movieB = await db.query("SELECT * FROM movie WHERE movie_id = $1", [
      id,
    ]);

    if (title && release_year) {
      Movie = await db.query(
        "UPDATE movie set title = $1, release_year = $2 WHERE movie_id = $3 RETURNING *",
        [title, release_year, id]
      );
    } else if (title) {
      Movie = await db.query(
        "UPDATE movie set title = $1 WHERE movie_id = $2 RETURNING *",
        [title, id]
      );
    } else if (release_year) {
      Movie = await db.query(
        "UPDATE movie set release_year = $1 WHERE movie_id = $2 RETURNING *",
        [release_year, id]
      );
    }

    if (Movie) {
      res.send(Movie.rows[0]);
    } else {
      res.send(movieB.rows[0]);
    }
  }

  async deleteMovie(req, res) {
    const { id } = req.body;
    await movieGenreController.deleteMovie(id);
    const movieB = await db.query(
      `DELETE FROM movie WHERE movie_id = $1  RETURNING *`,
      [id]
    );
    res.send(movieB.rows[0]);
  }
}

module.exports = new movieController();
