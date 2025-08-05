
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://chinghauyin:6cHAC2ofQw7gz2Wq@portfolio.9pzyib1.mongodb.net/Portfolio?retryWrites=true&w=majority"
}

export default config;

