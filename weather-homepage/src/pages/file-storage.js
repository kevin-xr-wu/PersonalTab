var React = require('react'); 
var _ = require('lodash'); 
var Uploader = require('../helpers/upload.js'); 
var Downloader = require('../helpers/download.js'); 

class FileStorage extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            form: {
                files: [],
            },

            errors: {
                to: null, 
                from: null,
            },

            content: [],
        }

        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onFileAdded = this._onFileAdded.bind(this);  
        this._onFileRemove = this._onFileRemove.bind(this);
    }

    componentDidMount() {
        Downloader.getDownloadInfo().then((response) => {
            let files = [];
            console.log(response);
            _.each(_.get(response,'data'), (file) => {
                console.log("file", file); 
                files.push(file); 
            }); 
            this.setState({
                content: files
            })
        });
    }

    _onFileRemove(key) {
        let {files} = this.state.form; 
        files.splice(key, 1); 

        this.setState({
            form: {
                ...this.state.form, 
                files: files
            }
        })
    }

    _onFileAdded(event) {
        let files = this.state.form.files; // to always make sure that its an array

        _.each(_.get(event, 'target.files', []), (file) => {
            files.push(file); 
        }); 

        //Object.assign(this.state.form, {files: files}) // before ES6

        // same with syntatic sugar

        this.setState({
            form: {
                ...this.state.form, 
                files: files,
            }
        });
    }

    _onFormSubmit(event) {
        event.preventDefault(); //prevents it so that it doesnt have the ending /?message in address bar

        // we want to upload the files here
        Uploader.upload(this.state.form, (event) => {
            if(this.props.onUploadEvent) {
                this.props.onUploadEvent(event);
                console.log("Upload Success", event); 
            }
        });

        let files = [];
        this.setState({
            form: {
                ...this.state.form, 
                files: files
            }
        });
    }

    render() {
        const {form} = this.state; 
        const {files} = form;
        const {content} = this.state; 
        
        return (
            <div>
            <div className="file-storage-title">
                Your Storage 
            </div>
            <div className="form">
                <form onSubmit={this._onFormSubmit}> 
                    <div className={'app-file-select-zone'}>                      
                        <label htmlFor={'input-file'}>
                            <input onChange={this._onFileAdded} id={'input-file'} type="file" multiple={true}/>
                            {
                                <span className={'app-upload-icon'}> 
                                {
                                files.length ? 
                                <div>
                                    {
                                        files.length ? <div>
                                            {
                                                files.map((file, index) => {
                                                    return (
                                                        <div key={index} className="item-to-upload">
                                                            <div className="item-name"> <i className={"icon-file"} /> {file.name}</div>
                                                            <button onClick={() => this._onFileRemove(index)} className="remove-action">x</button>
                                                        </div> 
                                                    )
                                                })
                                            } </div>  : null 
                                    }
                                </div> : <span className="app-upload-placeholder"> Add files and upload </span>
                                }
                                </span>
                            }                       
                        </label>
                    </div>

                    <div className="app-form-actions">
                        <button type="submit" className="app-button"> Upload! </button> 
                    </div> 
                </form>  
            </div>

                <div className="uploaded-content"> 
                    <div className="download-title"> 
                        Ready to Download
                    </div>
                    <div className={'app-uploaded-zone'}>                      
                        {
                            <span className={'app-upload-icon'}> {
                                content.length ? <div>
                                {
                                    content.map((file, index) => {
                                        console.log(file);
                                        return (
                                            <div key={index} className="uploaded-item">
                                                <a href={"http://localhost:3001/api/download/" + file._id} className="uploaded-item-name"> 
                                                    <i className={"icon-file"} /> 
                                                    {file.originalName}
                                                </a>
                                            </div> 
                                        )
                                    })
                                } </div>  : null 
                            }
                            </span>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = FileStorage; 