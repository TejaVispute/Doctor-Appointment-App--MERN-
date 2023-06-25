const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


// dotenv configuration
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();
app.use(cors());
// middlewares
app.use(express.json());
app.use(moragan('dev'));

// routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// port
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`sever is listening on ${process.env.NODE_MODE} and port is ${port}`.bgCyan.white)
});