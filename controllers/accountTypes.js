const {AccountTypes, Accounts} = require('../models')

const getAccountTypes = async (req, res) => {
    let accountTypes = await AccountTypes.findAll({include: [{model: Accounts}]});
    //res.send(JSON.stringify(accountTypes.map( account => account.get({plain: true}))));
     res.render('account_types', {accountTypes});
}

const createAccountType = async (req, res) => {
    //sacar los datos que me está enviando el cliente
    const {name, description} = req.body; //desestructuración
    try{
        //Creamos un registro en la tabla account_types
        let results = await AccountTypes.create({name, description});
        //Enviamos un respuesta satisfactoria
        res.send("Se ha agregado un tipo cuenta");
    }catch(error){
        console.log(error);
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
}

module.exports = {
    getAccountTypes,
    createAccountType
}