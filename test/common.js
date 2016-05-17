"use strict"

const expect = require("chai").expect;
const request = require("request")
const crypto = require("crypto")
const api_key = "xUM2FYfvWLetwpV00XbPiieVLb959YiziRMWElxFZuf"
const api_secret = "yvFXPtvllYxHgaxZ1L7TxMDMGGXothQexaDVup0C0QF"

//Base Request shared among all requests
const baseRequest = request.defaults({
  headers: {
    'X-BFX-APIKEY': api_key,
  },
  baseUrl: "https://api.bitfinex.com/v1"
})

var nonce = new(function() {

  this.generate = function() {

    var now = Date.now();

    this.counter = (now === this.last ? this.counter + 1 : 0);
    this.last = now;

    // add padding to nonce
    var padding =
      this.counter < 10 ? '000' :
      this.counter < 100 ? '00' :
      this.counter < 1000 ? '0' : '';

    return (now + padding + this.counter).toString();
  };
})();

global.nonce = nonce
global.baseRequest = baseRequest
global.expect = expect
global.crypto = crypto
global.request = request
global.api_key = api_key
global.api_secret = api_secret