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
    console.log("connected as id " + connection.threadId +"\n");
});

var resLength;
var table;
function startBamazon(){
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        resLength=res.length;
        console.log(resLength);
        console.table(res)
        table=res
        buyProduct();
    });
}

function buyProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "items",
            message: "What is the Item ID of the product you would like to purchase? (Or enter Q to Exit)",
            validate: function(input1) {
                if (input1.length > 0 && input1 <= resLength) {
                    console.log(" Thank you for your purchase!");
                    return true;
                } else if (input1 == "Q") {
                    quit()
                } else {
                    console.log(" is not a valid answer");
                    return false;
                }
            }
        }]).then(function(answer) {
            var purchaseQty = parseInt(answer.items);
            console.table(table[purchaseQty-1]);
            inquirer.prompt([
                {
                    type: "input",
                    name: "units",
                    message: "How many units would you like to buy?",
                    validate: function(input2) {
                        if (input2 > table[purchaseQty-1].stock_quantity) {
                            console.log("");
                            console.log("Insufficient Quantity!");
                            return false;
                        } else {
                            return true;
                        }
                    }
            }]).then(function(answer1) {
                var amountToBuy= parseInt(answer1.units)
                connection.query('update products set ? where ?',
                [
                    {stock_quantity: (table[purchaseQty-1].stock_quantity)-amountToBuy},
                    {item_id: table[purchaseQty-1].item_id}
                ], 
                function(err,res) {
                    if (err) throw err;
                    console.log(res.affectedRows+ ' products updated');
                    console.log("Your total purchase cost is $" + (amountToBuy*table[purchaseQty-1].price)) 
                    setTimeout(function() {
                        startBamazon();
                    }, 3000)
            }
            )
            })
      })
      
    }

    function quit(){
        connection.end()
        process.kill(process.pid)
    }
  
startBamazon()