//Dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = required('./config/db');

dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routing
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

//Error handler
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
});

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));