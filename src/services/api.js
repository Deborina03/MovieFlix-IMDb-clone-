import axios from 'axios';

const API_KEY = '9c31f56f';
const BASE_URL = 'https://www.omdbapi.com';

export const getRecentMovies = async () => {
  const recentMovies = [
    'Oppenheimer',
    'Barbie',
    'Mission Impossible Dead Reckoning',
    'The Flash',
    'Blue Beetle',
    'Gran Turismo',
    'Heart of Stone',
    'Guardians of the Galaxy Vol 3'
  ];

  try {
    const movies = await Promise.all(
      recentMovies.map(async (title) => {
        const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&t=${title}&type=movie`);
        return response.data;
      })
    );
    return movies.filter(movie => movie.Response === "True");
  } catch (error) {
    console.error('Error fetching recent movies:', error);
    return [];
  }
};

export const searchMovies = async (query, genre = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${query}&type=movie`);
    if (response.data.Response === "True") {
      // Fetch detailed info for each movie to get genres
      const movies = await Promise.all(
        response.data.Search.map(async (movie) => {
          const details = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}`);
          return details.data;
        })
      );
      
      if (genre) {
        return movies.filter(movie => movie.Genre.includes(genre));
      }
      return movies;
    }
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${movieId}`);
    if (response.data.Response === "True") {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=movie&type=movie&y=2023`);
    if (response.data.Response === "True") {
      return response.data.Search;
    }
    return [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};