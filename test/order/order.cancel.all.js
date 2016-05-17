  describe("/order/cancel/all", function() {
    // Add in the order to be cancelled from the earlier order, once that works
    var payload = {
      "request": "/v1/order/cancel/all",
      "nonce": nonce.generate()
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64')
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
    var options = {
      url: "/order/cancel/all",
      headers: {
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: payload
    }
    it("Returns status code 200", function(done) {
      baseRequest.post(options, function(error, response, body) {
        if (error) {
          done(body)
        } else {
          expect(response.statusCode).to.equal(200)
          done()
        }
      })
    })
  })