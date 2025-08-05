import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { addProject, error: authError, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: { pathname: '/project' } } });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Project title must be at least 3 characters';
    }

    // First name validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    } else if (formData.firstname.trim().length < 2) {
      newErrors.firstname = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    } else if (formData.lastname.trim().length < 2) {
      newErrors.lastname = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Completion date validation
    if (!formData.completion) {
      newErrors.completion = 'Completion date is required';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const projectData = {
      title: formData.title.trim(),
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
      completion: formData.completion,
      description: formData.description.trim()
    };

    try {
      const result = await addProject(projectData);
      
      if (result.success) {
        setSuccessMessage('Project added successfully!');
        setFormData({
          title: '',
          firstname: '',
          lastname: '',
          email: '',
          completion: '',
          description: ''
        });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Add project error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      completion: '',
      description: ''
    });
    setErrors({});
    setSuccessMessage('');
    if (authError) {
      clearError();
    }
  };

  const handleViewProjects = () => {
    navigate('/projects');
  };

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="auth-container">
      <form className="auth-form project-form" onSubmit={handleSubmit}>
        <h2>Add New Project</h2>
        
        {authError && (
          <div className="error-message">
            {authError}
          </div>
        )}
        
        {successMessage && (
          <div className="success-container">
            <div className="success-message">
              {successMessage}
            </div>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleViewProjects}
            >
              View All Projects
            </button>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? 'error' : ''}`}
            placeholder="Enter project title"
            disabled={isSubmitting}
          />
          {errors.title && <div className="field-error">{errors.title}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={`form-control ${errors.firstname ? 'error' : ''}`}
              placeholder="Enter your first name"
              disabled={isSubmitting}
            />
            {errors.firstname && <div className="field-error">{errors.firstname}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={`form-control ${errors.lastname ? 'error' : ''}`}
              placeholder="Enter your last name"
              disabled={isSubmitting}
            />
            {errors.lastname && <div className="field-error">{errors.lastname}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="completion">Completion Date</label>
          <input
            type="date"
            id="completion"
            name="completion"
            value={formData.completion}
            onChange={handleChange}
            className={`form-control date-input ${errors.completion ? 'error' : ''}`}
            disabled={isSubmitting}
          />
          {errors.completion && <div className="field-error">{errors.completion}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-control ${errors.description ? 'error' : ''}`}
            placeholder="Describe your project, technologies used, your role, achievements..."
            rows="6"
            disabled={isSubmitting}
          ></textarea>
          {errors.description && <div className="field-error">{errors.description}</div>}
        </div>

        <div className="form-row">
          <button 
            type="submit" 
            className="btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Adding Project...
              </>
            ) : (
              'Add Project'
            )}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
