const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getMoviesByParamater = (request, response) => {
  const { matchingPattern } = request.params

  const lowerPattern = matchingPattern.toLowerCase()

  const matchingMovies = movies.filter(movie => {
    if (movie.title.toLowerCase().includes(lowerPattern)) {
      return true
    }

    if (movie.directors.length === 1) {
      return movie.directors[0].toLowerCase().includes(lowerPattern)
    }

    return movie.directors.reduce((hasMatch, director) => (
      hasMatch || director.toLowerCase().includes(lowerPattern)
    ), false)
  })

  return response.send(matchingMovies)
}

const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response.status(400).send('Required items: title, director, releaseDate, rating, runTime, genres')
  }
  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, saveNewMovie, getMoviesByParamater }
