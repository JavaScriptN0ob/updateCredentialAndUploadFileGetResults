const request = require('request');
const fs = require('file-system');
const { getCredentials } = require('./credential');

function uploadFileAndGetResults(fileName) {
  return getCredentials().then(res => {
    const credential = res.data.access_token;
    
    let options = {
      url:'https://api.sypht.com/fileupload',
      formData : {
        fileToUpload: fs.createReadStream(`${fileName}`),
        products: JSON.stringify(['invoices', 'document']),
      },
      headers: {
        'Authorization': `Bearer ${credential}`,
      },
      json: true,
    };
    
    request.post(options, (error, response, body) => {
      let optionsForResult = {
        url: `https://api.sypht.com/result/final/${body.fileId}`,
        headers: {
          'Authorization': `Bearer ${credential}`,
        },
        json: true,
      };

      request.get(optionsForResult, (error, response, body) => {
        console.log(body.results.fields);
      })
    })
  })
};

uploadFileAndGetResults('sample.pdf');

// document.querySelector('#submit').addEventListener('click', () => uploadFileAndGetResults())
