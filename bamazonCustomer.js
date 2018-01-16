//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"
  })

  function start(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;
    
      console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
      console.log('----------------------------------------------------------------------------------------------------')
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }
      
      console.log(' ');
      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          }
        },
        {
          type: "input",
          name: "qty",
          message: "How much would you like to purchase?",
          validate: function(value){
            if(isNaN(value)){
              return false;
            } else{
              return true;
            }
          }
        }
        ]).then(function(ans){
          var whatToBuy = (ans.id)-1;
          var howMuchToBuy = parseInt(ans.qty);
          var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));