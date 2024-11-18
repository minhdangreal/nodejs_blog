const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const toastify = require('toastify-js');

const app = express();
const port = 3000;

const router = require('./routers');
const db = require('./config/db');

// Cấu hình handlebars
const hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
});

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(
    session({
        secret: 'your secret key',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }),
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error'),
    };
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng cấu hình handlebars đã tạo
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

router(app);

// Kết nối DB
db.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Cannot connect to database:', error);
        process.exit(1);
    });
