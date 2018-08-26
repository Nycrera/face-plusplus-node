# face-plusplus-node
  [![npm version](https://badge.fury.io/js/face-plusplus-node.svg)](https://badge.fury.io/js/face-plusplus-node)

Face++ /v3 [faceplusplus.com](http://faceplusplus.com) API wrapper for Node.js 

### Installation with npm
    $ npm install face-plusplus-node

## Configuration
```js
    var facepp = require('face-plusplus-node');
```

### Set your API Key / Get your API key and secret at [faceplusplus.com](http://faceplusplus.com) (Required)
```js
    facepp.setApiKey('API_KEY');
```

### Set your API Secret(Required) 
```js
    facepp.setApiSecret('API_SECRET');
```

###  Set the server (For now only options are 'us' or 'cn')(Optional)
```js
    facepp.setServer('cn');
```

## Examples

### Face Detection request (pass an image at a URL)
```js
    var facepp = require('face-plusplus-node');

    facepp.setApiKey('API_KEY');
    facepp.setApiSecret('API_SECRET');

    var parameters = {
        image_url: 'http://example.com/image.jpg',
        reutn_attributes: 'gender,age,emotion'
    };
    facepp.post('/detect', parameters, function(err, res) {
        console.log(res);
    });
```

### Face Detection request (pass an image from the local file system using base64 encoding)
```js
    var facepp = require('face-plus-plus'),
        fs = require('fs');

    facepp.setApiKey('API_KEY');
    facepp.setApiSecret('API_SECRET');

    var parameters = {
        return_attributes: 'ethnicity,beauty,eyegaze',
        image_base64: fs.readFileSync('./image.jpg').toString('base64')
        };
    facepp.post('/detect', parameters, function(err, res) {
        console.log(res);
    });
```

### Face Comparison request (pass 2 images from the local file system using base64 encoding)
```js
    var facepp = require('face-plus-plus'),
        fs = require('fs');

    facepp.setApiKey('API_KEY');
    facepp.setApiSecret('API_SECRET');

    var parameters = {
        image_base64_1: fs.readFileSync('./image1.jpg').toString('base64'),
        image_base64_2: fs.readFileSync('./image2.jpg').toString('base64'),
        };
    facepp.post('/compare', parameters, function(err, res) {
        console.log(res);
    });
```


You can see all possible parameters and ways to pass image and also compare two faces you can see [Face++ Documentation](https://console.faceplusplus.com/documents/5679127)

## License

  [MIT](LICENSE)
