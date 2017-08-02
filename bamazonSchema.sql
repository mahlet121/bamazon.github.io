DROP DATABASE IF EXISTS bamazondb;
-- Creates the "animals_db" database --
CREATE DATABASE bamazondb;

-- Makes it so all of the following code will affect animals_db --
USE bamazondb;

-- Creates the table "people" within animals_db --
CREATE TABLE products (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  product_name VARCHAR(30) ,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  -- Makes a sting column called "pet_name" --
  department_name VARCHAR(30),
  -- Makes an numeric column called "pet_age" --
  price INTEGER(10),
  stock_quantity INTEGER(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);
insert into products (product_name,department_name,price,stock_quantity)
values("milk", "Food",5,5),("13-inch MacBook Pro","Labtop",1999,3),("J'ADORE","Fragrance",75,4),("dining table","Home",240,10),("Tide","Laundry Detergent",19,4),("Pampers","Baby Diaper",12,6),("Vitafusion","Gummy Vitamins",12,20),("The Princess Bride","Books",12,20),("amika Triple RX Shampoo","Hair Care",23,12),("2017 Audi Q7","Vehicles",55000,10);