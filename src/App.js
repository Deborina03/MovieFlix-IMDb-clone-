import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import GenreFilter from './components/GenreFilter';
import { searchMovies, getRecentMovies } from './services/api';
import WatchLater from './components/WatchLater';

const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      const recentMovies = await getRecentMovies();
      setMovies(recentMovies);
      setLoading(false);
    };
    loadInitialMovies();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length < 2) return;
    setLoading(true);
    const results = await searchMovies(term);
    setMovies(results);
    setSelectedGenre(null);
    setLoading(false);
  };

  const handleGenreSelect = async (genre) => {
    setLoading(true);
    setSelectedGenre(genre.id === selectedGenre ? null : genre.id);
    const results = await searchMovies(genre.searchTerm);
    setMovies(results);
    setLoading(false);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Container>
        {!selectedMovie && <GenreFilter selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />}
        
        {loading ? (
          <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>
        ) : selectedMovie ? (
          <>
            <button onClick={() => setSelectedMovie(null)}>Back to Results</button>
            <MovieDetail movieId={selectedMovie} onClose={() => setSelectedMovie(null)} />
          </>
        ) : movies && movies.length > 0 ? (
          <>
            <Grid>
              {movies.map((movie) => (
                <div key={movie.imdbID} onClick={() => setSelectedMovie(movie.imdbID)}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </Grid>
            <WatchLater />
          </>
        ) : (
          <h2 style={{ color: 'white', textAlign: 'center' }}>
            {searchTerm ? 'No movies found' : 'Start searching for movies...'}
          </h2>
        )}
      </Container>
    </div>
  );
}

export default App;
