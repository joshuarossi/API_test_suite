  describe("/order/status", function() {
    var payload = {
      "order_id": 0,
      "request": "/v1/order/status",
      "nonce": nonce.generate()
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
    var options = {
      url: "/order/status",
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
      });
    })
  })