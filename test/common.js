"use strict"

const expect = require("chai").expect;
const request = require("request")
const crypto = require("crypto")

//Base Request shared among all requests
const baseRequest = request.defaults({
  headers: {
    'X-BFX-APIKEY': api_key,
  },
  baseUrl: "https://api.bitfinex.com/v1"
})

global.baseRequest = baseRequest
global.expect = expect
global.crypto = crypto
global.request = request
global.api_key = "EWf3KhJX8r7AkpVkVOjkvykgp8aw9i8J2ck0pUtu6oB"
global.api_secret = "asGScJj5zHNb6UvlRxBPCe7sFbohf5nrBBuPpi5ic9R"