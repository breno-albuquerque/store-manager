# Store Manager

It's a simple product and sales manager !

## Links:

- Deploy:
- Demo: https://www.youtube.com/watch?v=UI9-NEQ-0os

## Features:

##### Register a product:
  * Set the product's name
  * Set the quantity available in the inventory
  * The product will be properly registered in the table

##### Edit a product:
  * Choose the product you want to edit
  * Set the new name and the new quantity
  * The product's changes will be properly registered in the table

##### Register a sale:
  * Set the quantity of each product that were sold
  * Include them in the sale and register it
  * The sale will be properly registered in the table
  * The product(s) quantity will be properly updated in the table

##### Delete a sale:
  * In the table, click the delete symbol
  * The whole sale will be deleted
  * The product(s) quantity will be properly updated in the table

## Main tech stack:

- Node.js
- React.js
- Express
- MySQL
- Mocha / Chai / Sinon

## Running it localy:

#### Requirements:

- NodeJS (>16)
- MySQL

##### Clone Repository

```
git clone git@github.com:breno-albuquerque/store-manager.git
cd store-manager
```

##### Set the Back-end environment variables

- Change the .env.example file name to .env
- Type your own data base credentials

##### Install and Run the Node.js API

```
cd server
npm install
npm start
```

##### Install and Run the React Front-end

```
cd client
npm install
npm start
```