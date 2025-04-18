import styled from '@emotion/styled';

const GenreContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const GenreButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#f5c518' : '#333'};
  color: ${props => props.active ? 'black' : 'white'};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#f5c518' : '#444'};
  }
`;

const genres = [
  { id: 'action', name: 'Action', searchTerm: 'action movies' },
  { id: 'comedy', name: 'Comedy', searchTerm: 'comedy movies' },
  { id: 'drama', name: 'Drama', searchTerm: 'drama movies' },
  { id: 'horror', name: 'Horror', searchTerm: 'horror movies' },
  { id: 'scifi', name: 'Sci-Fi', searchTerm: 'science fiction movies' }
];

const GenreFilter = ({ selectedGenre, onGenreSelect }) => {
  return (
    <GenreContainer>
      {genres.map(genre => (
        <GenreButton
          key={genre.id}
          active={selectedGenre === genre.id}
          onClick={() => onGenreSelect(genre)}
        >
          {genre.name}
        </GenreButton>
      ))}
    </GenreContainer>
  );
};

export default GenreFilter;