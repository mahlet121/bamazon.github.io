  //npm for mysql
var mysql = require("mysql");
   //npm for inquirer
var inquirer = require("inquirer");
 //npm for create table
var Table = require('cli-table2');
//npm to add color in the table
var colors = require('colors/safe');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  //username
  user: "root",

  // password 
  password: "",
  //name of database
  database: "bamazondb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
 
  // run the displayTable function after the connection is display the table for users
displayTable();


});

 //function to display data on the table
function displayTable() {
  //geting connection to the table
  var query = connection.query("SELECT * FROM products", function(err, res) {
        
    var table = new Table([

         head=['id','product_name','department_name','price','stock_quantity']
              ,
          colWidths=[6,21,25,17]
             
        ]);
        table.push(['id','product name','department name','price','stock quantity']);
    for (var i = 0; i < res.length; i++) {
      
        table.push(
      
         [res[i].id ,res[i].product_name,res[i].department_name,res[i].price ,res[i].stock_quantity]
        
        );
             
  }
    console.log(colors.bgWhite(colors.red((table.toString()))));
 
    start();
  });
}
  

//function to promt the question
function start(){
  inquirer
    .prompt([
     { 
      name: "id",
      type: "input",
      message: "Please insert the product ID you would like to buy"
      },
      {
        name: "count",
        type: "input",
        message: "Please insert the quantity "
      }
    ])
    .then(function(answer) {
      var query = "select stock_quantity, price from  products  where id=?";
      connection.query(query, [answer.id, answer.count], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          if (answer.count<=res[i].stock_quantity){
            var result=res[i].stock_quantity-answer.count;
          console.log("Your total price is:"+answer.count*res[i].price );
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: result
              },
              {
                id: answer.id
              }
            ],
            function(error) {
              if (error) throw err;
              
            }
          );
        }
        else{
          console.log("Insufficient quantity!");
        }
        }
      
      });
    });
  
}

  