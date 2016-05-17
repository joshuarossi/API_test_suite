describe("/history", function() {
  // Add in the order to be cancelled from the earlier order, once that works
  var payload = {
    "request": "/v1/history",
    "nonce": nonce.generate(),
    "currency": "USD",
    "limit": 10
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64')
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
  var options = {
    url: "/history",
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
      if (error) {
        done(body)
      } else {
        expect(response.statusCode).to.equal(200)
        done()
      }
    })
  })
  it("Is an array", function(done) {
    expect(JSON.parse(result)).to.be.an("array");
    done()
  })
})