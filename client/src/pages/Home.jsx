import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to My Personal Portfolio</h1>
      <p>
        I am Ching Hau Yin, a solution consultant with strong skills in project management and system implementation.
        Explore my site to learn more about me, my projects, and services I offer.
      </p>
      <p><strong>Mission Statement:</strong> To deliver customer-focused solutions that enhance business efficiency and user experience.</p>
      <Link to="/about">
        <button>About Me</button>
      </Link>
    </div>
  );
}

export default Home;
