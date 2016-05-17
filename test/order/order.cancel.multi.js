  describe("/order/cancel/multi", function() {
    // Add in the orders to be cancelled from the earlier order, once that works
    var payload = {
      "request": "/v1/order/cancel/multi",
      "nonce": nonce.generate(),
      "order_ids": [0, 1]
    }
    payload = new Buffer(JSON.stringify(payload)).toString('base64')
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
    var options = {
      url: "/order/cancel/multi",
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