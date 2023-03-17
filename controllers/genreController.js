const db = require("../db");
const movieGenreController = require("./movieGenreController");

class GenreController {
  async createGenre(req, res) {
    const { title } = req.body;
    const newGenre = await db.query(
      "INSERT into genre (title) values ($1) RETURNING *",
      [title]
    );

    res.send(newGenre.rows[0]);
  }

  async getGenres(req, res) {
    const genres = await db.query(`SELECT * FROM genre`);
    res.send(genres.rows);
  }

  async updateGenre(req, res) {
    const { id, title } = req.body;
    const genre = await db.query("SELECT * FROM genre WHERE genre_id = $1", [
      id,
    ]);
    const updatedGenre = await db.query(
      "UPDATE genre set title = $1 WHERE genre_id = $2 RETURNING *",
      [title, id]
    );

    res.send(updatedGenre.rows[0]);
  }

  async deleteGenre(req, res) {
    const { id } = req.body;
    await movieGenreController.deleteGenre(id);
    const genre = await db.query(
      `DELETE FROM genre WHERE genre_id = $1  RETURNING *`,
      [id]
    );
    res.send(genre.rows[0]);
  }
}

module.exports = new GenreController();
