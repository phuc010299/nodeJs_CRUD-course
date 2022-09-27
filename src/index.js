const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
// khai bao chạy ham
const app = express();
// khai bao cong
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// http logger
app.use(morgan('combined'));
// template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

// tạo ra route đến trang chủ

// 127.0.0.1 - localhost

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
