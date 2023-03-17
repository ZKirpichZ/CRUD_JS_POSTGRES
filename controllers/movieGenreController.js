const db = require("../db");

class MovieGenreController {
  async add(movie_id, genres_id) {
    let queryGenre =
      "INSERT INTO genremovie (movie_id, genre_id) values ";
      queryGenre += `(${movie_id}, ${genres_id})`;
    db.query(queryGenre);
  }

  async deleteMovie(movie_id) {
    let query = `DELETE FROM genreMovie WHERE movie_id = ${movie_id}`;
    await db.query(query);
  }

  async deleteGenre(movie_id) {
    let query = `DELETE FROM genreMovie WHERE genre_id = ${movie_id}`;
    await db.query(query);
  }
}

module.exports = new MovieGenreController();
