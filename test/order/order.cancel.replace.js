  describe("/order/cancel/replace", function() {
    // Add in the order to be cancelled from the earlier order, once that works
    var payload = {
      "order_id": 448411153,
      "request": "/v1/order/cancel/replace",
      "nonce": nonce.generate(),
      "symbol": "BTCUSD",
      "amount": "0.02",
      "price": "0.02",
      "exchange": "bitfinex",
      "side": "buy",
      "type": "exchange limit",
      "use_remaining": false
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
    var options = {
      url: "/order/cancel/replace",
      headers: {
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: payload
    };
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