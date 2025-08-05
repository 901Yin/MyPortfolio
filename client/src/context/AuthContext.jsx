import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  projects: [],
  qualifications: []
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  SET_QUALIFICATIONS: 'SET_QUALIFICATIONS',
  ADD_QUALIFICATION: 'ADD_QUALIFICATION'
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case ActionTypes.LOGIN_SUCCESS:
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        loading: false, 
        error: null 
      };
    case ActionTypes.LOGOUT:
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      };
    case ActionTypes.SET_PROJECTS:
      return { ...state, projects: action.payload };
    case ActionTypes.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] };
    case ActionTypes.SET_QUALIFICATIONS:
      return { ...state, qualifications: action.payload };
    case ActionTypes.ADD_QUALIFICATION:
      return { ...state, qualifications: [...state.qualifications, action.payload] };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: JSON.parse(user)
      });
    }
  }, []);

  // Auth actions
  const login = async (credentials) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.CLEAR_ERROR });

    try {
      const response = await fetch('/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: data.user });
        return { success: true };
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: data.error || 'Login failed' });
        return { success: false, error: data.error };
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Network error' });
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (userData) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.CLEAR_ERROR });

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        return { success: true, data };
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: data.error || 'Registration failed' });
        return { success: false, error: data.error };
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Network error' });
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/auth/signout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      dispatch({ type: ActionTypes.LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Project actions
  const addProject = async (projectData) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.CLEAR_ERROR });

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/projects/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ActionTypes.ADD_PROJECT, payload: data });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        return { success: true, data };
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: data.error || 'Failed to add project' });
        return { success: false, error: data.error };
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Network error' });
      return { success: false, error: 'Network error' };
    }
  };

  // Qualification actions
  const addQualification = async (qualificationData) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.CLEAR_ERROR });

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/educationsorqualifications/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(qualificationData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: ActionTypes.ADD_QUALIFICATION, payload: data });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        return { success: true, data };
      } else {
        dispatch({ type: ActionTypes.SET_ERROR, payload: data.error || 'Failed to add qualification' });
        return { success: false, error: data.error };
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: 'Network error' });
      return { success: false, error: 'Network error' };
    }
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Helper functions for role checking
  const isAdmin = () => {
    return state.user && state.user.role === 'admin';
  };

  const isUser = () => {
    return state.user && state.user.role === 'user';
  };

  const hasRole = (role) => {
    return state.user && state.user.role === role;
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    addProject,
    addQualification,
    clearError,
    isAdmin,
    isUser,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;