/* Dependencies */
var request = require('request');

/* API Parameters */
var apiKey = null,
    apiSecret = null,
    apiUrl = ['https://api-', '.faceplusplus.com/facepp/v3'],
    apiServer = 'us';

class Api {
    constructor(url, data, callback) {
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
    prepareUrl(url) {
        url = url.trim();
        if (url.substr(0, 4) !== 'http') {
            // just in case
            if (url.charAt(0) !== '/')
                url = '/' + url;
            url = apiUrl[0] + apiServer + apiUrl[1] + url;
        }
        return url;
    }

    //This will be called when request ends with success.
    final(body) {
        var err;
        if (typeof body === 'string' || body instanceof String) {
            var result;
            try {
                result = JSON.parse(body);
            } catch (e) {
                err = {
                    message: 'Error while parsing JSON',
                    exception: e
                };
            }
        }
        this.callback(err, result, this.data);
    }

    post() {
        var self = this;
        var data = this.data;
        data.api_key = apiKey;
        data.api_secret = apiSecret;
        var url = this.url;

        request.post({
            url: url,
            formData: data
        }, function (err, httpResponse, body) {
            if (err) {
                this.callback({
                    message: 'Error while sending HTTP request',
                    exception: err
                }, null);
                return;
            }
            self.final(body);
        });
    }
}



// Sets

/**
 * Sets Api Key for future use.
 * @param {string} Key
 */
exports.setApiKey = function (Key) {
    apiKey = Key;
};


/**
 * Sets Face++ Server.For now only options are 'us' or 'cn'
 * @param {string} server
 */
exports.setServer = function (server) {
    apiServer = server;
};


/**
 * Sets Api Secret for future use.
 * @param {string} Secret
 */
exports.setApiSecret = function (Secret) {
    apiSecret = Secret;
};

/**
 * Creates new request to servers.
 * @param {string} service
 * @param {object} data
 * @param {function} callback
 * @returns {Object: Api}
 */
exports.post = function (service, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = {};
    }
    return new Api(service, data, callback);
}