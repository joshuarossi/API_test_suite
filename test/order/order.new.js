  describe("/order/new", function() {
    var payload = {
      "request": "/v1/order/new",
      "nonce": nonce.generate(),
      "symbol": "BTCUSD",
      "amount": "0.01",
      "price": "0.01",
      "exchange": "bitfinex",
      "side": "buy",
      "type": "exchange limit"
    }
    payload = new Buffer(JSON.stringify(payload)).toString('base64')
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
    var options = {
        url: "/order/new",
        headers: {
          'X-BFX-PAYLOAD': payload,
          'X-BFX-SIGNATURE': signature
        },
        body: payload
      }
      //TODO add this order ID to the global object for a future cancel test
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