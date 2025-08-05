import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { register, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    const userData = {
      name: formData.email.split('@')[0], // Use email prefix as name
      email: formData.email.trim(),
      password: formData.password
    };

    try {
      const result = await register(userData);
      
      if (result.success) {
        setSuccessMessage('Account created successfully! You can now sign in.');
        setFormData({
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirect to sign in after 2 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        {authError && (
          <div className="error-message">
            {authError}
          </div>
        )}
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            disabled={isSubmitting}
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
            disabled={isSubmitting}
          />
          {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
        </div>

        <button 
          type="submit" 
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="auth-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;