import styled from '@emotion/styled';
import RatingDisplay from './RatingDisplay';
import WatchlistButton from './WatchlistButton';

const Card = styled.div`
  background: #1a1a1a;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const WatchLaterButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f5c518;
    color: black;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const MovieCard = ({ movie, isWatchLater }) => {
  const handleWatchLater = (e) => {
    e.stopPropagation();
    const savedMovies = JSON.parse(localStorage.getItem('watchLater') || '[]');
    const exists = savedMovies.some(m => m.imdbID === movie.imdbID);
    
    if (exists) {
      const filtered = savedMovies.filter(m => m.imdbID !== movie.imdbID);
      localStorage.setItem('watchLater', JSON.stringify(filtered));
    } else {
      localStorage.setItem('watchLater', JSON.stringify([...savedMovies, movie]));
    }
  };

  return (
    <Card>
      <WatchLaterButton onClick={handleWatchLater}>
        {isWatchLater ? '✖' : '✚'}
      </WatchLaterButton>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'} 
        alt={movie.Title}
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ color: 'white', margin: 0 }}>{movie.Title}</h3>
        <p style={{ color: '#aaa', marginTop: '0.5rem' }}>{movie.Year}</p>
      </div>
    </Card>
  );
};

export default MovieCard;