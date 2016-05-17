describe("/account_infos", function() {
  var payload = {
    "request": "/v1/account_infos",
    "nonce": nonce.generate()
  }
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  var options = {
    url: "/account_infos",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  }
  var result = null
  it("Returns status code 200", function(done) {
    baseRequest.post(options, function(error, response, body) {
      result = body
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it("Returns standard fee information", function() {
    expect(result).to.equal('[{"maker_fees":"0.1","taker_fees":"0.2","fees":[{"pairs":"BTC","maker_fees":"0.1","taker_fees":"0.2"},{"pairs":"LTC","maker_fees":"0.1","taker_fees":"0.2"},{"pairs":"ETH","maker_fees":"0.1","taker_fees":"0.2"}]}]')
  })
})