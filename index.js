const express = require('express')
const bodyParser = require('body-parser')
const { getAllMovies, saveNewMovie, getMoviesByParamater } = require('./controllers/movies')

const app = express()

app.get('/', getAllMovies)

app.get('/movies/:matchingPattern', getMoviesByParamater)

app.post('/', bodyParser.json(), saveNewMovie)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1990, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1990...')
})
