const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware');


const index = require('./routes/index');
// const updateRoute = require('./routes/update');

const app = express();

// view engine setup
app.engine('.hbs', handlebars({
    helpers: {
        ifCond: function (conditional, options) {
            if (options.hash.value === conditional) {
                return options.fn(this)
            } else {
                return options.inverse(this);
            }
        }
    },
    extname: 'hbs',
    partialsDir: [path.join(__dirname, '/views/partials')]
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(sassMiddleware({
    src: path.join(__dirname, 'static'),
    dest: path.join(__dirname, 'static'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    prefix: "/static",
    outputStyle: 'compressed'
}));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/', index);
// app.use('/update', updateRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
