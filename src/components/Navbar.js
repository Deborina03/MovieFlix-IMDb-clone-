import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const Nav = styled(motion.nav)`
  background: #1a1a1a;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  width: 300px;
  background: #333;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: #444;
    width: 350px;
    box-shadow: 0 0 10px rgba(245, 197, 24, 0.3);
  }
`;

const Navbar = ({ onSearch }) => {
  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <motion.h1 
          style={{ color: '#e50914', margin: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          MovieFlix
        </motion.h1>
        <motion.input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch(e.target.value)}
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '25px',
            border: 'none',
            width: '300px',
            background: '#333',
            color: 'white',
            fontSize: '1rem'
          }}
          whileFocus={{ scale: 1.05, background: '#444' }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Nav>
  );
};

export default Navbar;