import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer'; //file storage
import path from 'path'; 

import {connect} from "./database.js"; 
import AppRouter from './router.js'; 

//File storage config 
const storageDir = path.join(__dirname, '..', 'storage'); // gets the storage directory 

const storageConfig = multer.diskStorage({
    // config destination is storage directory 
    destination: (req, file, cb) => {
        cb(null, storageDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storageConfig}); 

const PORT = 3001;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));


app.set('root', __dirname);
app.set('storageDir', storageDir); 
app.set('upload', upload); 

// Connect to Mongodb
connect((err, db) => {

    if(err){
        console.log("An error has occured trying to connect to database"); 
        throw (err);
    }

    app.set('db', db); 

    // init routers 
    new AppRouter(app); 

	app.server.listen(process.env.PORT || PORT, () => {
	        console.log(`App is running on port ${app.server.address().port}`);
	});

});

export default app;