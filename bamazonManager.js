var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "manage",
            message: "Please select what you would like to do",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (response) {
        var selection = response.menu;
        if (selection == "View Products for Sale") {
            viewProducts();
        } else if (selection == "View Low Inventory") {
            lowInventory();
        } else if (selection == "Add to Inventory") {
            addInventory();
        } else {
            addProduct();
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        menu();
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        result(res);

        for (i = 0; i < result.length; i++) {
            if (result[i].stock_quantity < 6) {
                connection.query("SELECT * FROM products WHERE ? ", [
                    { item_id: result[i].item_id }
                ], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    menu();
                })
            }
        }
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        resLength = res.length;
        table = res;
        inquirer.prompt9[
            {
                type: "input",
                name: "add",
                message: "What is the Item ID of the product you would like to add inventory to? (Or hit Q to Quit)",
                validate: function (answer) {
                    if (answer.length > 0 && input <= resLength) {
                        console.log("Product Selected");
                        return true;
                    } else if (answer == "Q") {
                        quit();
                    } else {
                        console.log(" is not a valid Item ID");
                        return false;
                    }
                }
            }].then(function (input) {
                var unitsToAdd = parseInt(input.update);
                console.table(table[unitsToAdd - 1]);
                inquirer.prompt([
                    {
                        type: "input",
                        name: "units",
                        message: "How many units would you like to add to this product?",
                        validate: function (response) {
                            if (response.length > 0 && response > 0) {
                                return true;
                            } else {
                                console.log(" is not a valid number");
                                return false;
                            }
                        }
                    }
                ]).then(function (input2) {
                    var units = parseInt(input2.units);
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: (table[unitsToAdd -1].stock_quantity) + units },
                        { item_id: table[unitsToAdd -1].item_id }
                    ])
                    setTimeout(function(){
                        menu()
                    }, 3000);
                })
            })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "What is the item you would like to add?"
        },
        {
            type: "input",
            name: "dept",
            message: "What department should this item be in?"
        },
        {
            type: "input",
            name: "qty",
            message: "How many units of this item do you want to add?",
            validate: function (input) {
                if (input.length > 0 && input > 0) {
                    return true;
                } else {
                    console.log(" is not a valid number");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "price",
            message: "What price do you want to set for this item?"
        }
    ]).then(function (input3) {
        connection.query("INSERT INTO products SET ?", [
            {
                product_name: answer3.itemName,
                department_name: answer3.dept,
                stock_quantity: answer3.qty,
                price: answer3.price
            }
        ], function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product has been added\n");
        })
        setTimeout(function() {
            menu()
        }, 3000);
    })
    
    function quit() {
        connection.end();
        process.kill(process.pid);
    }
}