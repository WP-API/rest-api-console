var $ = require('zepto-browserify').$;

function authHeaders() {

  if (rest_api_console.rest_nonce) {
    return { 'X-WP-Nonce' : rest_api_console.rest_nonce };
  } else {
    return {};
  }

}

function sendRequest(req, callback) {

  // TODO: format the request correctly before sending
  // check the version
  // clean up the path in case it's an absolute URI

  $.ajax({
    type: req.method,
    url: rest_api_console.rest_url + req.path + (req.query ? "?" + req.query : '' ),
    data: -1 === ['GET', 'DELETE', 'OPTIONS'].indexOf( req.method ) ? req.body : null,
    headers: $.extend({'accept':'application/json'}, authHeaders()),
    success: function(data, status, xhr) {
      callback(null, data, xhr);
    },
    error: function(xhr, errorType, error) {
      var body = xhr.response;

      try {
        body = JSON.parse(body);
      } catch (e) {
        // not valid json
      }
      callback({
        status: xhr.status,
        error: error,
        errorType: errorType,
        body: body,
      }, null, xhr);
    }
  });
}

function auth(panel) {
}

auth.prototype.request = sendRequest;

function buildAuth(panel) {
  return new auth(panel);
}

module.exports = function() {
  return buildAuth;
};