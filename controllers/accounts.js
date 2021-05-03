const {AccountTypes, Accounts, Clients} = require('../models')

const getAccounts = async (req, res) => {
    let accounts = await Accounts.findAll({include: [{model: AccountTypes}, {model: Clients}]  });
    //res.send(JSON.stringify(accounts));
    res.render('accounts', {accounts});
}

module.exports = {
    getAccounts
}