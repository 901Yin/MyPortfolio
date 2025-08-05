import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";

// Import all route files
import contactRoutes from "./server/routes/contact.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import qualificationRoutes from "./server/routes/educationsorqualifications.routes.js";
import userRoutes from "./server/routes/user.routes.js";

// Database connection setup
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log("Successfully connected to MongoDB database!");
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// API Routes
app.use("/", contactRoutes);
app.use("/", projectRoutes);
app.use("/", qualificationRoutes);
app.use("/", userRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to My Portfolio API",
    endpoints: {
      contacts: "/api/contacts",
      projects: "/api/projects",
      qualifications: "/api/qualifications",
      users: "/api/users"
    }
  });
});

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(config.port, (err) => {
  if (err) {
    console.error("Server startup error:", err);
    return;
  }
  console.log(`Server running on port ${config.port}`);
  console.log(`MongoDB connected: ${config.mongoUri}`);
});