// here is our first schema 
// every schema needs the mongoose dependency 
const mongoose = require('mongoose');

// set up the properties of our schema depending on the theme of the app
// in this case the theme is coffee
const coffeeSchema = new mongoose.Schema(
    {
        // every scheme requires an ID
        _id: mongoose.Schema.Types.ObjectId,
        // the above lines generates a new unique ID for us 
        name: String,
        price: Number,
        image_url: String
    },
    {
        // version keys can help us with updated schemas for larger projects
        versionKey: false
    }
);

// set up an export telling this .js file to be sent to our main js file

module.exports = mongoose.model('Coffee', coffeeSchema)
// first argument is the name of the schema, this word is up to us but should reflect data theme and be
// a singular word to do with the theme
// second argument is the scheme variables we declared above 

// npm run go is how you install nodemon in the terminal, the word go can be changed with whatever 
// word you have under the "script" tag in the package json file 