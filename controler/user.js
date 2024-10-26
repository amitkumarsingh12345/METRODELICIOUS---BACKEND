// ------------------USER SIGNUP API-----------------------

const user = require('../models/user');

const createUserAcount = async (req, res) => {
    console.log(req.body)
    const { name, phone, address } = req.body;

    await new user({ name, phone, address }).save().
        then(() => res.status(200).send({ "Massage": "success" })).
        catch((err) => res.status(404).send(err))
};

const getUser = async (req, res) => {
    await user.find().
        then((data) => res.status(200).send(data)).
        catch((err) => res.status(404).send(err))
};

module.exports = { createUserAcount, getUser }