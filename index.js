const express = require('express');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require("./function/greetings");
const app = express();
const session = require('express-session');
const greet = Greetings();
const routesFact = require('./greet-routes');
const greetRoute = routesFact(greet);

const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/myusers';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

// function cb(err, result) {
//     console.log(result.rows);
// }

// const sql = `insert into mynames 
// (greetednames, greetlanguage, greetcount)
// values ($1,$2, $3) `;

// pool.query(sql, ["Odwa", "xhosa", 1], function (err, results) {
//     console.log(err);
// });


// async function doSelect() {
//     return await pool.query("select * from mynames");
// }

// async function doCall() {
//     const result = await doSelect();
//     console.log(result.rows);
// }

// doCall('done');


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(session({
    secret: "this is My String",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', greetRoute.indexRoute);
app.post('/settings', greetRoute.settingsRoute);

app.get('/greet', greetRoute.peopleGreeted)

const PORT = process.env.PORT || 3006;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})