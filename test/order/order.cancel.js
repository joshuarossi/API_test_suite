  describe("/order/cancel", function() {
    // Add in the order to be cancelled from the earlier order, once that works
    var payload = {
      "request": "/v1/order/cancel",
      "nonce": nonce.generate(),
      "order_id": 0
    }
    payload = new Buffer(JSON.stringify(payload)).toString('base64')
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
    var options = {
      url: "/order/cancel",
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