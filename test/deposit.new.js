  describe("/deposit/new", function() {
    this.timeout(120000);
    ["bitcoin", "litecoin", "ethereum", "mastercoin"].forEach(function(currency) {
      ["exchange", "trading", "deposit"].forEach(function(wallet) {
        var payload = {
          "request": "/v1/deposit/new",
          "nonce": nonce.generate(),
          "method": currency,
          "wallet_name": wallet,
          "renew": 0
        };
        payload = new Buffer(JSON.stringify(payload)).toString('base64');
        var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
        var options = {
          url: "/deposit/new",
          headers: {
            'X-BFX-PAYLOAD': payload,
            'X-BFX-SIGNATURE': signature
          },
          body: payload
        };
        // validate each address (correct format/starting number)
        it(currency + " " + wallet + " returns status code 200", function(done) {
          baseRequest.post(options, function(error, response, body) {
            expect(response.statusCode).to.equal(200)
            done()
          });
        })
      })
    })
  })