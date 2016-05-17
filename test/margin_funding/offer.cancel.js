  describe("/offer/cancel", function() {
    var payload = {
      "request": "/v1/offer/cancel",
      "nonce": nonce.generate(),
      "offer_id": 0
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
    var options = {
      url: "/offer/cancel",
      headers: {
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: payload
    };
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
      });
    })
    it("returns an object", function() {
      expect(JSON.parse(result)).to.be.an("object")
    })
  })