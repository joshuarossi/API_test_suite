describe("/transfer", function() {
  var payload = {
    "request": "/v1/transfer",
    "nonce": nonce.generate(),
    "amount": "1.0",
    "currency": "USD",
    "walletfrom": "exchange",
    "walletto": "deposit"
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64')
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
  var options = {
    url: "/transfer",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  }
  var result = null
  it("Returns status code 200", function(done) {
    // TODO Returns 200 even though it is an error
    baseRequest.post(options, function(error, response, body) {
      result = body
      if (error) {
        done(body)
      } else {
        expect(response.statusCode).to.equal(200)
        done()
      }
    })
  })
})