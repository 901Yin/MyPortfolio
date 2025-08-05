import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';      
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import EducationQualification from './pages/EducationQualification';
import ProjectForm from './pages/ProjectForm';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route 
                path="/education-qualification" 
                element={
                  <ProtectedRoute>
                    <EducationQualification />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/project" 
                element={
                  <ProtectedRoute>
                    <ProjectForm />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
