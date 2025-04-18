import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MovieCard from './MovieCard';

const WatchLaterContainer = styled.div`
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 10px;
  margin-top: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

const WatchLater = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('watchLater') || '[]');
    setWatchList(savedMovies);
  }, []);

  return (
    <WatchLaterContainer>
      <h2 style={{ color: 'white', marginBottom: '1rem' }}>Watch Later</h2>
      <Grid>
        {watchList.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} isWatchLater />
        ))}
      </Grid>
    </WatchLaterContainer>
  );
};

export default WatchLater;