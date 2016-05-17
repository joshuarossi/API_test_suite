  describe("/position/claim", function() {
    var payload = {
      "request": "/v1/position/claim",
      "nonce": nonce.generate(),
      "position_id": 0
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
    var options = {
      url: "/position/claim",
      headers: {
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: payload
    };
    var result = null
    it("Returns status code 200", function(done) {
      // returns a null message
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
  })