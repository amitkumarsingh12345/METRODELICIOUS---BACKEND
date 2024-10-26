const hotal = require('../models/hotal');
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
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file?.originalname)
    }
})

let upload = multer({ storage: storage });

const addHotal = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }
            const newProduct = new hotal({
                name: req.body.name,
                location: req.body.location,
                discription: req.body.discription,
                image: req.file ? req.file.originalname : ''
            });
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        });
        console.log(req.body)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ------------------PRODUCT GET API-----------------------

const getHotal = async (req, res) => {
    await hotal.find().
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT SEARCH API-----------------------

const hotalSearch = async (req, res) => {
    await hotal.find({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT DELETE API-----------------------

const hotalDelete = async (req, res) => {
    await hotal.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
        then((data) => deleteFile(`${parentDir}${data.image}`)).
        catch((error) => console.log(""));

    await hotal.deleteOne({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
};

// ------------------PRODUCT UPDATE API-----------------------

upload = multer({ storage: storage });
const hotalUpdate = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }
            await hotal.updateOne(
                { _id: req.params.id },
                {
                    $set: ({
                        name: req.body.name,
                        location: req.body.location,
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

module.exports = { addHotal, getHotal, hotalSearch, hotalDelete, hotalUpdate }