# MyPortfolio - MERN Stack Portfolio Website

A full-stack portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring role-based access control and modern green-themed design.

## 🚀 Features

### Core Functionality
- **Full-Stack Application**: Complete MERN stack implementation
- **Role-Based Access Control**: Admin and User roles with different permissions
- **JWT Authentication**: Secure token-based authentication system
- **Responsive Design**: Mobile-friendly and modern UI
- **Green Theme**: Consistent green color scheme (#1F2625, #28332F, #A0C49D)

### User Features
- **Portfolio Display**: View projects, about information, and services
- **Contact Form**: Get in touch functionality
- **User Registration/Login**: Account creation and authentication
- **Profile Management**: Basic user profile features

### Admin Features
- **Project Management**: Add, edit, and delete portfolio projects
- **Education Management**: Manage education and qualification records
- **Content Administration**: Full CRUD operations on portfolio content
- **User Management**: View and manage registered users

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0**: Modern React with hooks and context API
- **React Router DOM 7.7.0**: Client-side routing
- **Vite 7.0.5**: Fast development server and build tool
- **CSS3**: Custom styling with green theme

### Backend
- **Node.js**: JavaScript runtime environment
- **Express 5.1.0**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and encryption

### Development Tools
- **Concurrently**: Run client and server simultaneously
- **Nodemon**: Auto-restart server during development
- **CORS**: Cross-origin resource sharing middleware

## 📂 Project Structure

```
MyPortfolio/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   │   ├── logo.png
│   │   ├── my_pic.jpg
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   ├── project3.jpg
│   │   └── Resume.pdf
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── AdminOnly.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/           # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── About.jsx
│   │   │   ├── Auth.css
│   │   │   ├── Contact.jsx
│   │   │   ├── EducationQualification.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── config/
│   └── config.js              # Database configuration
├── server/
│   ├── controllers/           # Business logic
│   │   ├── auth.controller.js
│   │   ├── contact.controller.js
│   │   ├── educationsorqualifications.controller.js
│   │   ├── error.controller.js
│   │   ├── project.controller.js
│   │   └── user.controller.js
│   ├── middleware/            # Custom middleware
│   │   └── roleAuth.js
│   ├── models/               # Database schemas
│   │   ├── contact.model.js
│   │   ├── educationsorqualifications.model.js
│   │   ├── project.model.js
│   │   └── user.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── educationsorqualifications.routes.js
│   │   ├── project.routes.js
│   │   └── user.routes.js
│   ├── helpers/
│   │   └── dbErrorHandler.js
│   ├── assets-router.js
│   └── express.js
├── server.js                 # Main server file
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/901Yin/MyPortfolio.git
cd MyPortfolio
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myportfolio
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Database Setup
- **Local MongoDB**: Make sure MongoDB is running on your system
- **MongoDB Atlas**: Replace the MONGODB_URI with your Atlas connection string

### 5. Run the Application
```bash
# Development mode (runs both client and server)
npm run dev

# Production mode
npm start
```

The application will be available at:
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3000 (Express server)

## 🔐 Role-Based Access Control

### User Roles
- **Admin**: Full access to create, read, update, and delete content
- **User**: Read-only access to view portfolio content

### Protected Routes
- **Admin Only**:
  - `/api/projects/admin` (POST, DELETE)
  - `/api/educationsorqualifications/admin` (POST, DELETE)
  - `/api/users/admin` (GET, DELETE)
  - Project and education update/delete operations

- **Authenticated Users**:
  - Profile management
  - Viewing detailed content

### Default Admin Account
To create an admin account, you'll need to manually set the role in the database:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🎨 UI/UX Features

### Design Theme
- **Primary Colors**: 
  - Dark Green: `#1F2625`
  - Medium Green: `#28332F`
  - Light Green: `#A0C49D`
  - Light Text: `#E0E0E0`

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Responsive navigation
- Optimized for all screen sizes

### User Experience
- Intuitive navigation
- Clear role indicators
- Smooth transitions
- Loading states
- Error handling with user-friendly messages

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### User Endpoints
- `POST /api/users` - Register new user
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile
- `GET /api/users/admin` - Get all users (admin only)

### Project Endpoints
- `GET /api/projects` - Get all projects (public)
- `POST /api/projects/admin` - Create project (admin only)
- `PUT /api/projects/:projectId` - Update project (admin only)
- `DELETE /api/projects/:projectId` - Delete project (admin only)

### Education Endpoints
- `GET /api/educationsorqualifications` - Get all qualifications (public)
- `POST /api/educationsorqualifications/admin` - Create qualification (admin only)
- `PUT /api/educationsorqualifications/:qualificationId` - Update qualification (admin only)
- `DELETE /api/educationsorqualifications/:qualificationId` - Delete qualification (admin only)

## 🧪 Testing

### Manual Testing
1. **User Registration**: Create new accounts with different roles
2. **Authentication**: Test login/logout functionality
3. **Role Permissions**: Verify admin vs user access levels
4. **CRUD Operations**: Test all create, read, update, delete operations
5. **UI Responsiveness**: Test on different screen sizes

### Security Testing
- JWT token validation
- Role-based route protection
- Input validation and sanitization
- Password encryption verification

## 🚀 Deployment

### Production Build
```bash
# Build the client
cd client
npm run build

# Start production server
cd ..
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
```

### Deployment Platforms
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 Author

**Ching Hau Yin**
- Solution Consultant
- Strong skills in project management and system implementation
- Portfolio: [Your Portfolio URL]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the flexible database solution
- Express.js community for the robust web framework
- All contributors and open-source libraries used in this project

---

*This portfolio website showcases modern web development practices with a focus on security, user experience, and maintainable code architecture.*
