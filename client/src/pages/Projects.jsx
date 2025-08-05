import React from 'react';
import AdminOnly from '../components/AdminOnly';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Projects() {
  const { isAdmin } = useAuth();

  return (
    <div>
      <h1>Highlighted Projects</h1>

      <AdminOnly
        fallback={
          <div style={{ padding: '10px', backgroundColor: '#A0C49D', color: '#1F2625', marginBottom: '20px', borderRadius: '5px' }}>
            <p><strong>Admin Access Required:</strong> Only administrators can add new projects.</p>
          </div>
        }
      >
        <div style={{ padding: '10px', backgroundColor: '#28332F', color: '#A0C49D', marginBottom: '20px', borderRadius: '5px' }}>
          <p><strong>Admin Panel:</strong> You have administrator privileges. You can add new projects here.</p>
          <Link 
            to="/project-form" 
            style={{ 
              color: '#A0C49D', 
              textDecoration: 'underline',
              fontWeight: 'bold'
            }}
          >
            Add New Project →
          </Link>
        </div>
      </AdminOnly>

      {/* Project 1: Website Maintenance for TIHK */}
      <div className="project">
        <img src="/project1.jpg" alt="Project 1" className="project-image" style={{ height: '90px' }} />
        <h2>Website Maintenance for TIHK</h2>
        <p>Role: Solution Consultant. Maintained and upgraded the TIHK website ensuring smooth operation and enhanced user experience.</p>
      </div>

      {/* Project 2: CRM and Leasing System Implementation */}
      <div className="project">
        <img src="/project2.jpg" alt="Project 2" className="project-image" style={{ height: '90px' }} />
        <h2>CRM and Leasing System Implementation</h2>
        <p>Worked closely with clients and programmers to develop custom solutions that streamline leasing and customer relationship processes.</p>
      </div>

      {/* Project 3: POS and ERP System Upgrades */}
      <div className="project">
        <img src="/project3.jpg" alt="Project 3" className="project-image" style={{ height: '90px' }} />
        <h2>POS and ERP System Upgrades</h2>
        <p>Led system upgrade projects, including user training and UAT, to improve operational efficiency.</p>
      </div>
    </div>
  );
}

export default Projects;
