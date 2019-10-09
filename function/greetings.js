module.exports = function GreetingsManager(refreshData) {
    var keep = refreshData || {};
    var counter = 0;
    var newName;
    var regex = /[0-9$@$!%*?&#^-_. +\[.*?\]]/;
    var alreadyExist = false;
    var end;
    let error = false;
    var tabelNames = []
    var langChoice;


    function updatesCounter() {
        var keys = Object.keys(keep);
        counter = keys.length;
        return counter;
    }


    function addNewName(name) {
        newName = undefined;
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
        // console.log(languageType);
        // console.log(newName);
        var english = "Hello, ";
        var afrikaans = "Hallo, ";
        var xhosa = "Molo, ";

        if (newName === undefined) {
            end = "PLEASE ENTER VALID NAME";
            return end;
        } else if (langChoice === "english") {
            end = english + newName;

        } else if (langChoice === "afrikaans") {
            end = afrikaans + newName;

        } else if (langChoice === "xhosa") {
            end = xhosa + newName;

        }
        for (var i = 0; i < tabelNames.lenght; i++) {
            if (tabelNames[i].name === newName) {
                end = "Name already entered"
            }
            else {
                tabelNames.push({
                    name: newName,
                    lang: langChoice
                });
            }
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

    function errorState() {
        return error
    }

    function showNames() {
        return tabelNames
    }

    return {
        add: addNewName,
        count: updatesCounter,
        records: displayRecords,
        greet: greetLanguage,
        testLang,
        testNames,
        errorState,
        showNames
    }
}