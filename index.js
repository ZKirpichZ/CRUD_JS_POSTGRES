const PORT = process.env.PORT || 5000;
const Application = require('./framework/Application');
const parseJson = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');

const MovieRouter = require('./routers/MovieRouter');
const genreRouter = require('./routers/genreRouter');

const app = new Application()

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(MovieRouter);
app.addRouter(genreRouter);



app.listen(PORT, () => console.log(`Сервер по порту ${PORT}`));