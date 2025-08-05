import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminOnly from './AdminOnly';

function Navbar() {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="Logo" className="logo" />
      <ul>
        {/* Main navigation */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>
        
        {/* Authenticated user navigation */}
        {isAuthenticated ? (
          <>
            {/* Admin-only navigation */}
            <AdminOnly>
              <li><Link to="/project">Add Project</Link></li>
              <li><Link to="/education-qualification">Add Education</Link></li>
            </AdminOnly>
            
            <li>
              <span className="user-greeting">
                Hello, {user?.name || user?.email} 
                {isAdmin() && <span style={{ color: '#A0C49D', fontSize: '12px' }}> (Admin)</span>}
              </span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
