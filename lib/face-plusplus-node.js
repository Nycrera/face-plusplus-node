/* Dependencies */
var request = require('request');

/* API Parameters */
var apiKey = null,
    apiSecret = null,
    apiUrl = ['https://api-', '.faceplusplus.com/facepp/v3'],
    apiServer = 'us';

function Api(url, data, callback) {
    if (typeof callback === 'undefined') {
        callback = data;
        data = {};
    }

    this.url = this.prepareUrl(url);
    this.callback = callback;
    this.data = data;

    this.options = {};
    this.options.encoding = this.options.encoding || 'utf-8'; // For future updates. For now it means nothing.
    this.options.uri = url;

    this.post();

    return this;
}

// Prepare url input.
Api.prototype.prepareUrl = function(url) {
    url = url.trim();

    if (url.substr(0, 4) !== 'http') {
        // just in case
        if (url.charAt(0) !== '/') url = '/' + url;
        url = apiUrl[0] + apiServer + apiUrl[1] + url;
    }

    return url;
};

//This will be called when request ends with success.
Api.prototype.final = function(body) {
    var err;
    if (typeof body === 'string' || body instanceof String) {
        var json = body;
        try {
            json = JSON.parse(body);
        } catch (e) {
            err = {
                message: 'Error while parsing JSON',
                exception: e
            };
        }
    }
    this.callback(err, json, this.data);
};

Api.prototype.post = function() {
    var self = this;
    var data = this.data;
    data.api_key = apiKey;
    data.api_secret = apiSecret;
    var url = this.url;
    request.post({
        url: url,
        formData: data
    }, function(err, httpResponse, body) {
        if (err) {
            this.callback({
                message: 'Error while processing HTTP request',
                exception: err
            }, null);

            return;
        }

        self.final(body);
    });

};
// Gets and Sets

/**
 * Sets Api Key for future use.
 * @param {string} token
 */
exports.setApiKey = function(token) {
    apiKey = token;
    return this;
};

/**
 * Gets Api Key.
 * @returns {string} Api Key
 */
exports.getApiKey = function() {
    return apiKey;
};

/**
 * Sets Face++ Server.For now only options are 'us' or 'cn'
 * @param {string} server
 */
exports.setServer = function(server) {
    apiServer = server;
    return this;
};

/**
 * Gets current server.
 * @returns {string} Api Server either 'us' or 'cn'
 */
exports.getServer = function() {
    return apiServer;
};

/**
 * Sets Api Secret for future use.
 * @param {string} token
 */
exports.setApiSecret = function(token) {
    apiSecret = token;
    return this;
};

/**
 * Gets Api Secret. Why would you use this?
 * @returns {string} Api Secret key
 */
exports.getApiSecret = function() {
    return apiSecret;
};

/**
 * Creates new request to servers.
 * @param {string} url
 * @param {object} data
 * @param {function} callback
 * @returns {Object: Api}
 */
exports.post = function(url, data, callback) {
    if (typeof url !== 'string') {
        return callback({
            message: 'API url must be a string'
        }, null);
    }

    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    return new Api(url, data, callback);
}