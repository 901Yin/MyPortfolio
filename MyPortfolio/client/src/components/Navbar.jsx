import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
    <img src="/logo.png" alt="Logo" className="logo" />
      <ul>
        {/* // Using Link from react-router-dom for navigation */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
