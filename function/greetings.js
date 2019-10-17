module.exports = function GreetingsManager(pool) {

    var keep = {};
    // var counter = 0;

    var newName;
    var regex = /[0-9$@$!%*?&#^-_. +\[.*?\]]/;
    var alreadyExist = false;
    var end;
    let error = false;
    var langChoice;
    var cheese;
    var macaroni;

    async function updatesCounter() {
        macaroni = await pool.query('select * from mynames');
        return macaroni.rows.length
    }


    async function addNewName(name) {

        alreadyExist = false;

        if (testNames(name)) {

            cheese = await pool.query('SELECT * FROM mynames WHERE greeted_names = $1', [newName]);


            if (name === '') {
                return end = "Please enter valid name"
            }
            else {
                if (cheese.rowCount === 1) {
                    await pool.query('UPDATE mynames SET greet_count = greet_count + 1 WHERE greeted_names = $1', [newName])
                } else {
                    await pool.query('insert into mynames (greeted_names, greet_count) values ($1, $2)', [newName, 1]);
                }
            }
        }
    }


    function greetLanguage(languageType) {
        langChoice = languageType
        var display;
        if (alreadyExist === true) {
            display = "Name already greeted";
            return display;
        }
        display = testLang(langChoice);
        return display;
    }


    function testLang(languageType) {
        langChoice = languageType
        
        var english = "Hello, ";
        var afrikaans = "Hallo, ";
        var xhosa = "Molo, ";

        if (newName === '' || newName === undefined) {
            end = "PLEASE ENTER VALID NAME"
        }
        if(langChoice === '' || langChoice === undefined){
            end = "PLEASE SELECT LANGAUGE"
        }
        else {

            if (langChoice === "english") {
                end = english + newName;


            } if (langChoice === "afrikaans") {
                end = afrikaans + newName;

            } if (langChoice === "xhosa") {
                end = xhosa + newName;

            } 
        }
        return end;
    }


    function testNames(input) {
        var wack = regex.test(input);
        if (wack !== true) {
            newName = input.trim().toLowerCase();
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            return newName;
        }
        return newName
    }


    function displayRecords() {
        return keep;

    }

    function errorState() {
        return error
    }

    function showNames() {
        return macaroni.length
    }

    async function greetReset() {
        await pool.query('delete from mynames');
    }

    async function showDB() {

        macaroni = await pool.query('select * from mynames');
        return macaroni.rows
    }
    return {
        add: addNewName,
        count: updatesCounter,
        records: displayRecords,
        greet: greetLanguage,
        testLang,
        testNames,
        errorState,
        showNames,
        greetReset,
        showDB
    }
}
