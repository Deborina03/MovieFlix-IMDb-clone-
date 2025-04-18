import { useState } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background: ${props => props.inWatchlist ? '#e50914' : '#f5c518'};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const WatchlistButton = ({ movie }) => {
  const [inWatchlist, setInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    setInWatchlist(!inWatchlist);
    // Add local storage functionality here
  };

  return (
    <Button inWatchlist={inWatchlist} onClick={toggleWatchlist}>
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};

export default WatchlistButton;