const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/users');
const reservationRouter = require('./routes/reservation');
const catwaysRouter = require('./routes/catways');
const indexRouter = require('./routes/index');

const mongodb = require('./db/mongo');
mongodb.initClientDbConnection();

const app = express();

const authRoutes = require('./routes/auth');
app.use('/', authRoutes); 



app.use(cors({
    exposedHeaders: ['authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/reservation', reservationRouter);
app.use('/catways', catwaysRouter);


app.use('/', indexRouter);


app.use(function(req, res, next) {
    res.status(404).json({
        name: 'API',
        version: '1.0',
        status: 404,
        message: 'not_found'
    });
});

module.exports = app;
