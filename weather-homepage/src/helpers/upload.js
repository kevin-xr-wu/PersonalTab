var axios = require("axios"); 
var _ = require("lodash"); 

const upload = (form, callback = () => {}) => {

    const url = "http://localhost:3001/api/upload";
    let files = _.get(form, 'files', []); 

    let data = new FormData(); 

    _.each(files, (file) => {
        data.append('files', file); 
    });

    data.append('to', _.get(form, 'to')); 
    data.append('from', _.get(form, 'from')); 
    data.append('message', _.get(form, 'message')); 

    axios.post(url,data).then((response) => {
        // upload success
        // this also doesnt get called btw, part 3 near the end 
        return callback({
            type: "success",
            payload: response.data,
        })
    }).catch((err) => {
        return callback({
            type: "error",
            payload: err,
        })
    }); 
}

module.exports.upload = upload; 