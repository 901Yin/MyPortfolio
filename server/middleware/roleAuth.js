// Role-based authorization middleware
const requireAdmin = (req, res, next) => {
  if (!req.auth) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // The user object should be attached by the requireSignin middleware
  if (!req.profile || req.profile.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Access denied. Admin privileges required.' 
    });
  }
  
  next();
};

const requireUser = (req, res, next) => {
  if (!req.auth) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // Allow both admin and user roles for read operations
  if (!req.profile || !['admin', 'user'].includes(req.profile.role)) {
    return res.status(403).json({ 
      error: 'Access denied. Valid user role required.' 
    });
  }
  
  next();
};

const checkUserRole = (req, res, next) => {
  // This middleware will be used to attach user data to req.profile
  // It will be used with requireSignin to get the user from the token
  if (req.auth && req.auth._id) {
    // The user ID from JWT token is available in req.auth._id
    next();
  } else {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};

export { requireAdmin, requireUser, checkUserRole };
