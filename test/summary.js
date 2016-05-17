  describe("/summary", function() {
    var payload = {
      "request": "/v1/summary",
      "nonce": nonce.generate(),
    };
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
    var options = {
      url: "/summary",
      headers: {
        'X-BFX-PAYLOAD': payload,
        'X-BFX-SIGNATURE': signature
      },
      body: payload
    }
    var result = null
    it("Returns status code 200", function(done) {
      baseRequest.post(options, function(error, response, body) {
        expect(response.statusCode).to.equal(200)
        result = body
        done()
      });
    })
    it("Has correct info for summary", function() {
      expect(result).to.equal('{"trade_vol_30d":[{"curr":"BTC","vol":0.0},{"curr":"LTC","vol":0.0},{"curr":"ETH","vol":0.0},{"curr":"Total (USD)","vol":0.0}],"funding_profit_30d":[{"curr":"USD","amount":0.0},{"curr":"BTC","amount":0.0},{"curr":"LTC","amount":0.0},{"curr":"ETH","amount":0.0}],"maker_fee":0.001,"taker_fee":0.002}')
    })
  })