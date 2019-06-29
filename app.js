var mySQL = require("mysql");
var inquirer = require("inquirer");
const {
    table
} = require('table');
var mysql = require("mysql");

var keys = require("./keys.js");
var mySQLPassword = keys.mySQLkey;
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: mySQLPassword,
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}



/**** Display User Options ****/

inquirer.prompt([{
        type: 'input',
        name: 'item_id',
        message: 'Please enter the Item ID which you would like to purchase.',
        validate: validateInput,
        filter: Number
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: validateInput,
        filter: Number
    }
]).then(function (input) {
    console.log('Customer has selected: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.quantity);

    var item = input.item_id;
    var quantity = input.quantity;

    var queryStr = 'SELECT * FROM products WHERE ?';

    connection.query(queryStr, {item_id: item}, function(err, data) {
        if (err) throw err;

        // If the user has selected an invalid item ID, data attay will be empty
        // console.log('data = ' + JSON.stringify(data));

        if (data.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
            displayInventory();

        }

        /*** */
    })
    


    /**** */
});


function displayInventory() {

    // Grabs query data from mysql
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var proData,
            output;

        proData = [];

        for (var i = 0; i < data.length; i++) {
            var arr = [data[i].item_id,
                data[i].product_name,
                data[i].department_name,
                data[i].price
            ];

            proData.push(arr);

        }
        output = table(proData);

        console.log(output);

    })
}

/*
function runBamazon() {


	// Display the available inventory
	displayInventory();
}


runBamazon();

*/