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
    displayInventory()
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