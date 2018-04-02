const {MongoClient} = require('mongodb'); 

const url = 'mongodb://localhost:27017/personalpage'; 

exports.connect = (cb) => {

    //Mongodb version 3 connection
    MongoClient.connect(url, (err, client) => {
       return cb(err, client);
    });
};
