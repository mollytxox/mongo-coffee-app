// Setting up our dependencies 
const express = require('express');
const app = express();
const port = 3005;
const cors = require('cors');
// passes info from the frontend to the backend
const bodyParser = require('body-parser');
// this is our middlewear for talking to mongodb 
const mongoose = require('mongoose');
// grab our config.json file that stores our username and password for MongoDB
const config = require('./config.json');

// Schemas (every schema needs a captial letter)
// whatever goes in module.export (in the coffee.js file) for the first argument is the const name below
const Coffee = require('./models:schemas/coffee.js');

// start our dependencies 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// start our server 
app.listen(port, () => {
    console.log(Coffee)
    console.log("Server is running");
})
// app.listen listens to the port number you declare 

// connect to mongodb cloud
// cluster name = Cluster0
// username = mollytxox
mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@cluster0.uc2us0c.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("You've connected to MongoDB!")
}).catch((err) => {
    console.log(`The error is ${err.message}`)
})

// .then is if the connection works and .catch is if the connection fails (errors)

// set up a route/endpoint which the front end will access 

// app.post will send data to the DB
app.post('/addCoffee', (req, res) => {
    // create a new instance of the coffee schema 
    const newCoffee = new Coffee({
        // give our new coffee the details we sent from the front end 
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        image_url: req.body.image_url
    });
    // to save the new coffee to the database 
    // use the variable declared above
    newCoffee.save().then((result) => {
        console.log(`Added a new coffee successfully`);
        // return back to the front end what just happened 
        res.send(result)
    }).catch((err) => {
        console.log(`Error: ${err.message}`)
    });
});

// get the coffee from MongoDB

app.get('/allCoffee', (req, res) => {
    // .find will search for all the coffees
    // grab schema name, in this case its called Coffee
    Coffee.find()
        // .then is a method in which we can chain functions on
        // chanining means that once something has run, we can run another thing
        .then(result => {
            // send back the result of the search to whoever asks for it
            // send the results to the frontend
            res.send(result)
        })
});

// http://localhost:3005/allCoffee to test if it is retreiving data without
// having to make an AJAX request