const Greetings = require("./function/greetings");

module.exports = function GreetRoutes(pool) {
    const greet = Greetings(pool);

    function indexRoute(req, res) {

        res.render('index', {
            total: greet.count()
        })
    }

   async function settingsRoute(req, res) {
        console.log(req.body)
        if (req.body.reset === 'reset') {
           await greet.greetReset();
        } else {
           req.flash('message', '');
           await greet.add(req.body.name);
            const languageChoice = req.body.languageType;
            const message = greet.testLang(languageChoice);

            req.flash('message', message);
        }

        // await pool.query('insert into mynames (greeted_names, greet_count) values ($1, $2)' , [req.body.name, 1]);    

        // let results = await pool.query('select * from mynames'); 

        res.redirect('/');
    }

    function peopleGreeted(req, res) {
        res.render('actions', { actions: greet.showNames() })
    }

    return {
        indexRoute,
        settingsRoute,
        peopleGreeted

    }

}