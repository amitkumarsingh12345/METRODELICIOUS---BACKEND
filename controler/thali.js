const thali = require('../models/thali');
const multer = require('multer');
const { unlink } = require('fs').promises;

const path = require('path');
const parentDir = path.join(__dirname, '../../', 'METRODELICIOUS-FRONTEND', 'public/');


// -----------------------------------DELETE FILE------------------------------------------

const deleteFile = async filePath => {
    await unlink(filePath);
}


// ---------------------------------PRODUCT POST API--------------------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, parentDir)
        console.log(req.body)
        console.log(req.file)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file?.originalname)
    }
})

let upload = multer({ storage: storage });

const addThali = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }
            const newProduct = new thali({
                name: req.body.name,
                price: req.body.price,
                qty: req.body.qty,
                discription: req.body.discription,
                image: req.file ? req.file.originalname : ''
            });
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ------------------PRODUCT GET API-----------------------

const getThali = async (req, res) => {
    await thali.find().
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT SEARCH API-----------------------

const thaliSearch = async (req, res) => {
    await thali.find({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT DELETE API-----------------------

const thaliDelete = async (req, res) => {
    await thali.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
        then((data) => deleteFile(`${parentDir}${data.image}`)).
        catch((error) => console.log(""));

    await thali.deleteOne({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT UPDATE API-----------------------

upload = multer({ storage: storage });
const thaliUpdate = async (req, res) => {
    console.log(req.body)
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }
            await thali.updateOne(
                { _id: req.params.id },
                {
                    $set: ({
                        name: req.body.name,
                        price: req.body.price,
                        qty: req.body.qty,
                        discription: req.body.discription,
                        image: req.file?.originalname
                    })
                }
            ).then((data) => res.status(200).send(data)).
                catch((error) => res.status(400).send(error));
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addThali, getThali, thaliSearch, thaliDelete, thaliUpdate }