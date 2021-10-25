// /////////////////////////////////////////
///////        DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const { DATABASE_URL, PORT } = process.env;
// IMPORT MIDDLEWARE
const cors = require('cors');
const morgan = require('morgan');



////////////////////////////////////////
//          DATABASE CONNECTIONS
const mongoose = require('mongoose');
mongoose.connect(DATABASE_URL);
// //////////CURRENT CONNECTION ////////////
const db = mongoose.connection
db.on ('open', () => console.log('You are connected to MongoDB'));
db.on ('close', ()=> console.log('You are disconnected from MongoDB'));
db.on ('error', (error)=> console.log(error));
/////////////////////////////////////////////
// //////////// MODELS //////////////
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
},     { timestamps: true });
const People = mongoose.model("People", PeopleSchema)
// //////////////// MIDDLEWARE ////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan('dev')); //logging
app.use(express.json()); // parse json bodies
//         TEST ROUTE
app.get('/', (req, res)=> {
    res.send("hello")
});
// PEOPLE INDEX ROUTE
app.get("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
// PEOPLE DELETE ROUTE
app.delete("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
// PEOPLE UPDATE ROUTE
app.put("/people/:id", async (req, res) => {
    try {
      // send all people
      res.json(
        await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  // PEOPLE CREATE ROUTE
  app.post("/people", async (req, res) => {
    try {
      // send all people
      res.json(await People.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
// ////////////////////////////////////
//               LISTENER
app.listen(PORT, ()=> {
    console.log(`Express is listening on port, ${PORT}`)
})