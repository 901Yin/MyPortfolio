import React from 'react';

function Projects() {
  return (
    <div>
      <h1>Highlighted Projects</h1>

      {/* // Project 1: Website Maintenance for TIHK */}
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
