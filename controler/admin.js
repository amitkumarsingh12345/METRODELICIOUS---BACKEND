// ------------------USER SIGNUP API-----------------------

const admin = require('../models/admin');

const createAdminAcount = async (req, res) => {
    const { name, password } = req.body;

    await new admin({ name, password }).save().
        then(() => res.status(200).send({ "Massage": "success" })).
        catch((err) => res.status(401).send(err))
};


// ------------------ADMIN LOGIN API-----------------------

const adminLogin = async (req, res) => {
    console.log('-------------',req.body)
    const data = await admin.findOne({ name: req.body.name,password: req.body.password });
    if (data) {
        res.status(201).send({ data });
    } else {
        res.send({ 'massage': 'fail' })
    }
}


module.exports = { createAdminAcount, adminLogin }