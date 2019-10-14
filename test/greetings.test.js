const assert = require("assert");
const GreetingsManager = require("../function/greetings.js");
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/myusers';

const pool = new Pool({
    connectionString
});

describe('Greetings Test', function () {
    beforeEach(async function(){
        let testInstance = GreetingsManager(pool);
        await testInstance.greetReset();
    })
    describe("Name tests", function () {
        it('This test takes in a name and returns  it with a greeting, depending on the language selected ', async function () {
            let testInstance = GreetingsManager(pool);
            await testInstance.add("Steve");
            assert.equal(testInstance.greet("english"), "Hello, Steve");
            assert.equal(testInstance.greet("afrikaans"), "Hallo, Steve");
            assert.equal(testInstance.greet("xhosa"), "Molo, Steve");
        });

        it('This test takes in an empty string and returns a greeting with no name', async function () {
            let testInstance = GreetingsManager(pool);
            await testInstance.add("");
            assert.equal(testInstance.greet("afrikaans"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("english"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("xhosa"), "PLEASE ENTER VALID NAME");
        });

        it('This test takes in numbers and returns the error message', async function () {
            let testInstance = GreetingsManager(pool);
            await testInstance.add("2313");
            assert.equal(testInstance.greet("english"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("afrikaans"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("xhosa"), "PLEASE ENTER VALID NAME");
        });
        it('This test takes in numbers and letters and returns the error message', async function () {
            let testInstance = GreetingsManager(pool);
            await testInstance.add("NUIIAEHUO82313");
            assert.equal(testInstance.greet("english"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("afrikaans"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("xhosa"), "PLEASE ENTER VALID NAME");
        });
        it('This test takes in a numbers, letters & special characters and returns the error message', async function () {
            let testInstance = GreetingsManager();
            await testInstance.add("MUC7927@#$%^&");
            assert.equal(testInstance.greet("english"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("afrikaans"), "PLEASE ENTER VALID NAME");
            assert.equal(testInstance.greet("xhosa"), "PLEASE ENTER VALID NAME");
        });
    })
    describe("Counter tests", function () {
        it('Should return 1 when a new name is entered ', async function () {
            let testCount = GreetingsManager(pool);
            await testCount.add("Steve");
            assert.equal(await testCount.count(), 1);
        });
        it('Should return 1 when a new name is entered and remain 1 if the same name is used ', async function () {
            let testCount = GreetingsManager(pool);
            await testCount.add("Steve");
            await testCount.add("Steve");
            assert.equal(await testCount.count(), 1);
        });
        it('Should return 3 when different names are entered ', async function () {
            let testCount = GreetingsManager(pool);
            await testCount.add("Steve");
            await testCount.add("Dave");
            await testCount.add("Mike");
            assert.equal(await testCount.count(), 3);
        });
    });
});