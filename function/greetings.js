module.exports = function GreetingsManager(pool) {
    // console.log(pool)
    var keep = pool || {};
    var counter = 0;
    var newName;
    var regex = /[0-9$@$!%*?&#^-_. +\[.*?\]]/;
    var alreadyExist = false;
    var end;

    function updatesCounter() {
        var keys = Object.keys(keep);
        counter = keys.length;
        return counter;
    }

    function addNewName(name) {
        // var names = await pool.query('SELECT names FROM greetings')
        alreadyExist = false;
        
        
        if (name) {
            if (testNames(name)) {
                var testData = [];
                testData = Object.keys(keep);

                for (var x = 0; x < testData.length; x++) {
                    if (testData[x] === newName) {
                        alreadyExist = true;
                    }
                }
                if (alreadyExist === false) {
                    if (keep[newName] === undefined) {

                        keep[newName] = 0;
                        updatesCounter();
                    }
                }
            }
        }
    }


    function greetLanguage(languageType) {
        var display;
        if (alreadyExist === true) {
            display = "Name already greeted";
            return display;
        }
        display = testLang(languageType);
        return display;
    }


    function testLang(languageType) {
        var english = "Hello, ";
        var afrikaans = "Hallo, ";
        var xhosa = "Molo, ";

        if (languageType === "english") {
            end = english + newName;

        }
        if (languageType === "afrikaans") {
            end = afrikaans + newName;

        }
        if (languageType === "xhosa") {
            end = xhosa + newName;

        }
        else if (newName === undefined) {
            end = "PLEASE ENTER VALID NAME";
        }
        return end;
    }


    function testNames(input) {
        var wack = regex.test(input);
        if (wack !== true) {
            newName = input.trim().toLowerCase();
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            return true;
        }
    }


    function displayRecords() {
        return keep;
    }


    return {
        add: addNewName,
        count: updatesCounter,
        records: displayRecords,
        greet: greetLanguage,
        testLang,
        testNames
    }
}