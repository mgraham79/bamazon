DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JAVASCRIPT & JQUERY", "Books", 17.50, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Soundlink Micro Bluetooth Speaker", "Computers & Electronics", 109.00, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Men's Slides", "Clothing, Shoes & Jewelry", 29.99, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guardians of the Galaxy Blu-ray", "Movies, Music & Games", 19.99, 34);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coleman Sundome 4-Person Tent", "Sports & Outdoors", 65.43, 51);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vitamix 5300 Blender, Black", "Home & Kitchen", 367.75, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Western Digital 1TB External Hard Drive", "Computers & Electronics", 64.99, 67);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grand Theft Auto 5 - PS4", "Movies, Music, & Games", 30.00, 129);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Nutrition Gold Standard 100% Whey Protein Powder, Chocolate - 2 lbs.", "Beauty & Health", 28.48, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Armor All Ultra Shine Car Wash Wipes (12 count", "Automotive & Industrial", 6.88, 16);

SELECT * FROM products;
