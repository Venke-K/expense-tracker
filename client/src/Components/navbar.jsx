import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();  // Track location changes

  useEffect(() => {
    setToken(localStorage.getItem('token')); // Update token when location changes
  }, [location]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
        Swal.fire('Logged out!', 'You have been successfully logged out.', 'success');
      }
    });
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate('/')}>💰 Expense Tracker</h2>
      <div className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={() => setIsMobile(false)}>
        <Link to="/" className="nav-item">Home</Link>
        {token ? (
          <button onClick={handleLogout} className="nav-button logout-btn">Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button signup-btn">Signup</Link>
          </>
        )}
      </div>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}

export default Navbar;






