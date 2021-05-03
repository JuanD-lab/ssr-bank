//Dos formas para poder utilizar dotenv
require('dotenv').config();

// const dotenv = require('dotenv');
// dotenv.config();

const express = require('express');

const app = express();
app.set('view engine', 'ejs');



//Controllers
const {getAccountTypes, createAccountType} = require('./controllers/accountTypes')
const {getAccounts} = require('./controllers/accounts')
const {getClients, createClients, deleteClient, updateClient} = require('./controllers/clients')


//CRUD -> Create, Read, Update y Delete

//Para poder leer los datos que envía el cliente con el formato URL Encoded
app.use(express.urlencoded({extended: false}))

//Home Page
app.get("/", (req, res) => {
    res.render('home');
});

app.get("/client_update/:id", (req, res) => {
    res.render('client_update',{id: req.params.id})
});

//Read
app.get("/account_types", getAccountTypes);

app.get('/accounts', getAccounts);

app.get("/clients", getClients);


//Create
app.post("/account_types", createAccountType);

app.post("/clients", createClients);


//Delete
app.get("/clients/delete/:id", deleteClient)


//Updata
app.post("/clients/update/:id", updateClient)



const PORT = process.env.PORT || 8080;

//Create server
app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT);
});




/* app.get("/account_types", async (req, res) => {
    let accountTypes = await AccountTypes.findAll({include: [{model: Accounts}]});
    //res.send(JSON.stringify(accountTypes.map( account => account.get({plain: true}))));
     res.render('account_types', {accountTypes});
}); */


/* async (req, res) => {
    //sacar los datos que me está enviando el cliente
    const {first_name, last_name, email, telephone} = req.body; //desestructuración
    try{
        //Creamos un registro en la tabla account_types
        let results = await Clients.create({first_name, last_name, email, telephone});
        //Enviamos un respuesta satisfactoria
        res.send("Se ha agregado un cliente nuevo");
    }catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el cliente");
    }
} */