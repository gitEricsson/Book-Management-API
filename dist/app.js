const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
// const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const app = express();
// Global MiddleWares
// Security HTTP Headers
app.use(helmet({ contentSecurityPolicy: false }));
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Data sanitization against XSS
app.use(xss());
// compress responses
// app.use(compression());
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
});
// Routes
app.use('/api/books', bookRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
