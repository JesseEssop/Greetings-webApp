const express = require('express');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const routesFact = require('./greet-routes');

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
const greetRoute = routesFact(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.use(session({
    secret: "this is My String",
    resave: false,
    saveUninitialized: true
}));


app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', greetRoute.indexRoute);
app.post('/settings', greetRoute.settingsRoute);

app.get('/greet', greetRoute.peopleGreeted);

app.post('/return', function (req, res){
    res.redirect('/');
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})