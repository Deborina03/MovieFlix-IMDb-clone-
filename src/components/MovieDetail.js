import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getMovieDetails } from '../services/api';

const DetailContainer = styled.div`
  color: white;
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
`;

const MovieHeader = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2rem;
  background: #111;
`;

const PosterSection = styled.div`
  flex: 0 0 300px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Rating = styled.div`
  background: #f5c518;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const CastSection = styled.div`
  padding: 2rem;
  background: #222;
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ReviewSection = styled.div`
  padding: 2rem;
  background: #1a1a1a;
`;

const MovieDetail = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    };
    fetchMovie();
  }, [movieId]);

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, { ...review, date: new Date().toLocaleDateString() }]);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <DetailContainer>
      <MovieHeader>
        <PosterSection>
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            style={{ width: '100%', borderRadius: '5px' }}
          />
          <Rating>⭐ {movie.imdbRating}/10</Rating>
          <div style={{ marginTop: '1rem', color: '#aaa' }}>
            {movie.imdbVotes} votes
          </div>
        </PosterSection>

        <InfoSection>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{movie.Title}</h1>
          <div style={{ color: '#aaa', marginBottom: '1rem' }}>
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <strong>Genre:</strong> {movie.Genre}
          </div>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{movie.Plot}</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Awards</h3>
            <p>{movie.Awards}</p>
          </div>
        </InfoSection>
      </MovieHeader>

      <CastSection>
        <h2>Cast & Crew</h2>
        <CastGrid>
          {movie.Actors.split(', ').map((actor, index) => (
            <div 
              key={index}
              style={{ 
                background: '#333',
                padding: '1rem',
                borderRadius: '5px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{actor}</div>
              <div style={{ color: '#aaa' }}>Actor</div>
            </div>
          ))}
        </CastGrid>

        <div style={{ marginTop: '2rem' }}>
          <h3>Director</h3>
          <p>{movie.Director}</p>
          <h3>Writers</h3>
          <p>{movie.Writer}</p>
        </div>
      </CastSection>

      <ReviewSection>
        <h2>User Reviews</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleReviewSubmit({
            rating: userRating,
            comment: e.target.comment.value,
            username: e.target.username.value
          });
          e.target.reset();
        }}>
          <input 
            name="username"
            placeholder="Your name"
            style={{
              padding: '0.5rem',
              marginRight: '1rem',
              background: '#333',
              border: 'none',
              borderRadius: '4px',
              color: 'white'
            }}
          />
          <select
            value={userRating}
            onChange={(e) => setUserRating(Number(e.target.value))}
            style={{
              padding: '0.5rem',
              marginRight: '1rem',
              background: '#333',
              border: 'none',
              borderRadius: '4px',
              color: 'white'
            }}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              background: '#f5c518',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Review
          </button>
          <textarea
            name="comment"
            placeholder="Write your review..."
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '1rem',
              background: '#333',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              minHeight: '100px'
            }}
          />
        </form>

        {reviews.map((review, index) => (
          <div 
            key={index}
            style={{
              background: '#222',
              padding: '1.5rem',
              borderRadius: '8px',
              marginTop: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{review.username}</strong>
              <span>⭐ {review.rating}/10</span>
            </div>
            <div style={{ color: '#aaa', fontSize: '0.9rem', margin: '0.5rem 0' }}>
              {review.date}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </ReviewSection>
    </DetailContainer>
  );
};

export default MovieDetail;