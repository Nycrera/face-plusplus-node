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

  

### Set the server (For now only options are 'us' or 'cn')(Optional)

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

return_attributes: 'gender,age,emotion'

};

facepp.post('/detect', parameters, function(err, res) {

console.log(res);

});

```

  

### Face Detection request (pass an image from the local file system using base64 encoding)

```js

var facepp = require('face-plusplus-node'),

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

/*  Output
{ image_id: '/bFHYuZRF3y4pjnqghSNWg==',

request_id: '1535365287,56de0473-9dfe-4c7d-8b1e-f0a818adc0b6',

time_used: 346,

faces:

[ { attributes: [Object],

face_rectangle: [Object],

face_token: 'cd3cb917009c3f8066d721b06255a256' } ] } */

```

  

### Face Comparison request (pass 2 images from the local file system using base64 encoding)

```js

var facepp = require('face-plusplus-node'),

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

/*  Output
{ faces1:
[ { face_rectangle: [Object],
face_token: '93819818f4cdc4762caafdf776a347c3' } ],
faces2:
[ { face_rectangle: [Object],
face_token: '9d42ccedd41d19439d866e33b88fab21' } ],
time_used: 445,
thresholds: { '1e-3': 62.327, '1e-5': 73.975, '1e-4': 69.101 },
confidence: 89.485,
image_id2: 'Y74JtlTEfR3Jb/pyoNzT1Q==',
image_id1: '/bFHYuZRF3y4pjnqghSNWg==',
request_id: '1535365156,7db9798d-2c80-4bd0-9773-6e40ef5088c2' } */

```

  
  

You can see all possible parameters and ways to pass image and also compare two faces you can see [Face++ Documentation](https://console.faceplusplus.com/documents/5679127)

  

## License

  

[MIT](LICENSE)