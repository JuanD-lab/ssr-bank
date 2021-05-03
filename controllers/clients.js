const {Accounts, Clients} = require('../models')

const getClients = async (req, res) => {
    let clients = await Clients.findAll({include: [{model: Accounts}]});
    /* console.log(JSON.stringify(clients.map( client => client.get({plain: true})))); */
    res.render('clients', {clients});
}

const createClients = async (req, res) => {
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
}

const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        const deletes = await Clients.destroy({
            where: {
                id
            }
        });
        
        res.redirect("/clients")
    } catch (e) {
        console.log(e);
        res.status(400).send("No se ha podido agregar el cliente");
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const obj = JSON.parse(JSON.stringify(req.body));;

    try {


        const clientUpdate = await Clients.update(obj, {
            where: {
                id:id
            }
        });
        res.send("se ha actulizado");

    } catch (e) {
        console.log(e);
        res.status(400).send("No se ha podido agregar el cliente");
    }
}

module.exports = {
    getClients,
    createClients,
    deleteClient,
    updateClient
}