const Router = require('../framework/Router');
const movieController = require('../controllers/movieController');

const router = new Router();


router.get('/api/movie', movieController.getMovie);
router.post('/api/movie', movieController.createMovie);
router.put('/api/movie', movieController.updateMovie);
router.delete('/api/movie', movieController.deleteMovie);


module.exports = router;