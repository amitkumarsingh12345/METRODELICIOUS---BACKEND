// ----------------ALL ROUTERS---------------------

const express = require('express');
const app = express();
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 10101;
const user = require('./router/user');
const admin = require('./router/admin');
const cors = require('cors');
const thali = require('./router/thali');
const hotal = require('./router/hotal');
const path = require('path');
const dotenv = require('dotenv');
app.use(cors());
dotenv.config();

// ----------------DATABASE CONNECTION---------------------
mongo.connect(`${process.env.DB}`).
  then(() => console.log("DB Connected!!")).
  catch((err) => console.log({ "Error": err }));

app.use(bodyParser.json());

app.use('/api/v1', user);
app.use('/api/v2', admin);
app.use('/api/v3', thali);
app.use('/api/v4', hotal);

app.use(express.static(path.join(__dirname, '../', 'METRODELICIOUS-FRONTEND/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'METRODELICIOUS-FRONTEND/public/index.html'));
});

// ----------------SERVER CONNECTION---------------------

app.listen(process.env.PORT || port, () => console.log("Server Created !!"));