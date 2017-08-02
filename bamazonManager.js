//require mysql npm
var mysql = require("mysql");
//reqire inquirer npm
var inquirer = require("inquirer");
//npm for create the table in console
var Table = require('cli-table2');
//color npm to style the table
var colors = require('colors/safe');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",

  // password
  password: "",
  //name of database
  database: "bamazondb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
 
  // run the choice function after the connection is made to prompt the user
managerChoice();

});


//function to display data on the table
function displayTable() {
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
  });
}
//function to add product into database table
  function createProduct() {
    inquirer
    .prompt([
     {
        name:"name",
        type:"input",
        message:"Add your product name here"
      },
      {
        name:"depname",
        type:"input",
        message:"Add your department name here"
      },
      {
        name:"price",
        type:"input",
        message:"Add your product price here"
      },
      {
        name:"quantity",
        type:"input",
        message:"Add your product quantity here"
      }
    ])
    .then(function(answer) {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: answer.name,
      department_name: answer.depname,
      price:answer.price,
      stock_quantity: answer.quantity
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      
    }
  );

  // logs the actual query being run
  console.log(query.sql);
});
}

function lowItems() {
  var query = connection.query("SELECT * FROM products where stock_quantity < 5", function(err, res) {
  
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
  });
}

function updateItem(){
  inquirer
    .prompt([
     {
        name:"add",
        type:"input",
        message:"To update the Invertory of product write the Id number here"
      },
      {
        name:"coadd",
        type:"input",
        message:"wirte the number of items do you want to add"
      }
    ])
    .then(function(answer) {
         var query = "select stock_quantity,product_name from  products  where id=?";
      connection.query(query, [answer.add], function(err, res) {
        
        if (err) throw err;
            
        for (var i = 0; i < res.length; i++) {
          
            var result=res[i].stock_quantity+parseInt(answer.coadd);
          
          console.log("You Have:"+result+"  "+res[i].product_name);
          connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        
        stock_quantity:result
      },
      {
        id: answer.add
      }
    ],
    function(err, res) {
      
    console.log(res.affectedRows + " products updated!\n");
    }
     
);
     }  

    });
 

});
    
}

function managerChoice(){
  inquirer
    .prompt([
     { 
      name: "ma",
      type: "list",
      message: "Choice what you want to do",
      choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
      },
      
    ])
    .then(function(answer) {
        if(answer.ma==="View Products for Sale"){
          displayTable();
        }
        else if(answer.ma==="View Low Inventory"){
          lowItems();
        }
        else if(answer.ma==="Add to Inventory"){
          updateItem();
        }
        else if(answer.ma==="Add New Product"){
        createProduct();
        }
});

}
      