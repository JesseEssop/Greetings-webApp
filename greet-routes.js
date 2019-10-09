

module.exports = function GreetRoutes(greet) {

    function indexRoute(req, res) {

        res.render('index', {
            total: greet.count()
        })
    }

    function settingsRoute(req, res) {
        req.flash('message', '');
        greet.add(req.body.name);
        const languageChoice = req.body.languageType;
        const message = greet.testLang(languageChoice);
        req.flash('message', message);
        res.redirect('/');
    }

    function peopleGreeted (req, res){
        res.render('actions',{actions:greet.showNames()})
    }

    return {
        indexRoute,
        settingsRoute,
        peopleGreeted
       
    }

}