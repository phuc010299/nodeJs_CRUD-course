const $ = require('jquery');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const path = require('path');
const sortMiddleware = require('./app/middlewares/SortMiddleware');
// khai bao chạy ham
const app = express();
// khai bao cong
const port = 3000;

const router = require('./router');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, './public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// methodOverride để xử dụng method khác trong header
app.use(methodOverride('_method'));

app.use(sortMiddleware);

// http logger
app.use(morgan('combined'));
// template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-sharp fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <i class="${icon}"></i>
                </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
router(app);

// tạo ra route đến trang chủ

// 127.0.0.1 - localhost

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
