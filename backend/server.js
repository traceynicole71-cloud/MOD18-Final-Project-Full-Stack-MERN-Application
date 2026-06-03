//Dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Basic health route for browser hits at /
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Pro-Tasker API is running',
        docs: {
            users: '/api/users',
            projects: '/api/projects'
        }
    });
});

//Suppress favicon 404 noise when opening API URL in a browser
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

//Core routing
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

//Error handler
app.use(notFound);
app.use(errorHandler);

//Runtime server execution listener
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[SYSTEM ONLINE]: Pro-Tasker API listening on port ${PORT}`);
    console.log(`[ENVIRONMENT MODE]: Running in ${process.env.NODE_ENV || 'development'} stage`);
});