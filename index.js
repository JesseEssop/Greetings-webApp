const express = require('express');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require("./function/greetings");
const app = express();
const session = require('express-session');
const greet = Greetings();



// const greet = Greetings(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
    
    res.render('index', {
        total: greet.count(),
        wave: greet.testLang()
    })
});

app.post('/settings', function (req, res) {

    greet.add(req.body.name);
    const languageChoice = req.body.languageType;
    console.log(greet.testLang(languageChoice));
    res.redirect('/');
});

app.get('/actions', function (req, res) {

});


const PORT = process.env.PORT || 1985;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})