import styled from '@emotion/styled';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const RatingBadge = styled.div`
  background: #f5c518;
  color: black;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

const RatingDisplay = ({ rating, votes }) => {
  return (
    <RatingContainer>
      <RatingBadge>⭐ {rating}/10</RatingBadge>
      <span style={{ color: '#aaa' }}>{votes} votes</span>
    </RatingContainer>
  );
};

export default RatingDisplay;