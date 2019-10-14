const express = require('express');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const routesFact = require('./greet-routes');



// const {Client} = require('pg');
// const connectionString = 'postgresql://codex:codex123@localhost:5432/myusers';

// const client = new Client({
//     connectionString : connectionString
// })

// client.connect()
// .then(() => console.log("Connected successfully"))
// // .then(() => client.query( `insert into mynames (greetednames, greetlanguage, greetcount) values ($1,$2, $3) `))
// .then(() => client.query("select * from mynames"))
// // .then(results => console.log(results.rows))
// .catch(e => console.log(e))


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

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', greetRoute.indexRoute);
app.post('/settings', greetRoute.settingsRoute);

app.get('/greet', greetRoute.peopleGreeted)

const PORT = process.env.PORT || 9025;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})