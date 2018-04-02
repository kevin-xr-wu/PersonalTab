var axios = require('axios'); 

const getDownloadInfo = () => {
    const url = "http://localhost:3001/api/files/all"; 

    return axios.get(url); 
}

module.exports.getDownloadInfo = getDownloadInfo;