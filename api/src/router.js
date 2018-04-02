import {version} from '../package.json';
import path from 'path'; 
import _ from 'lodash'; 
import {ObjectID} from 'mongodb'; 
import File from './models/file.js'; 

class AppRouter {
    constructor(app) {
        this.app = app;
        this.setupRouters(); 
    }

    setupRouters() {
        
        const app = this.app; 
        const db = app.get('db'); 
        const uploadDir = app.get('storageDir'); 
        const upload = app.get('upload');

        // root routing
        app.get('/', (req, res, next) => {
            return res.status(200).json({
                version: version 
            });
        });

        // Uploading file routing
        app.post('/api/upload', upload.array('files'), (req,res,next) => {
            
            const files = _.get(req, 'files', []); 
            let fileModels = []; 

            _.each(files, (fileObject) => {
                const newFile = new File(app).initWithObject(fileObject).toJson();
                fileModels.push(newFile); 
            });

            if(fileModels.length) {
                db.collection('files').insertMany(fileModels, (err, result) => {
                    if(err) {
                        return res.status(503).json({
                            error: {
                                message: "unable to save your files", 
                            }
                        });
                    }

                    return res.json({
                        files: fileModels
                    }); 
                });
            }else {
                return res.status(503).json({
                    error: {message: "Files upload is required"}
                });
            }
        })

        // Downloading file routing
        app.get('/api/download/:id', (req, res, next) => {
            const fileId = req.params.id; 
            db.collection('files').find({_id: ObjectID(fileId)}).toArray((err, result) => {
                const fileName = _.get(result, '[0].name'); 

                if(err || !fileName) {
                    return res.status(404).json({
                        error: {
                            message: "File not found"
                        }
                    })
                }

                const filePath = path.join(uploadDir, fileName); 
                
                return res.download(filePath, _.get(result,'[0].originalName'), (err) => {
                    if (err) {
                        return res.status(404).json({
                            error: {
                                message: "File not found"
                            }
                        });
                    }
                    else {
                        console.log("File is downloaded"); 
                    }
                });
            });

        });

        // Getting all files in the database
        app.get('/api/files/all', (req, res, next) => {
            db.collection('files').find({}).toArray((err, results) => {
                return res.json(results);
            })
        })

        console.log("The app routing is initialized"); 
    }
}

export default AppRouter; 