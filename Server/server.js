const express = require('express');
const bodyParer = require ('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://badrbenfraj:BaDr@1996@cluster0-sykgf.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
const app = express();
const port = process.env.PORT || 3001 ;

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
})