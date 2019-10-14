const Greetings = require("./function/greetings");

module.exports = function GreetRoutes(pool) {
    const greet = Greetings(pool);

   async function indexRoute(req, res) {
    //    await greet.add(req.body.name);

        res.render('index', {
            total: await greet.count()
        })
    }

   async function settingsRoute(req, res) {
        // console.log(req.body)
        if (req.body.reset === 'reset') {
           await greet.greetReset();
        } else {
           req.flash('message', '');
           await greet.add(req.body.name);
            const languageChoice = req.body.languageType;
            const message = greet.testLang(languageChoice);
            req.flash('message', message);
        }
        res.redirect('/');
    }

  async function peopleGreeted(req, res) {
   res.render('actions', { actions: await greet.showDB() })
    }

    return {
        indexRoute,
        settingsRoute,
        peopleGreeted

    }

}