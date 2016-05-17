describe("/key_info", function() {
  var payload = {
    "request": "/v1/key_info",
    "nonce": nonce.generate()
  };
  payload = new Buffer(JSON.stringify(payload)).toString('base64');
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex');
  var options = {
    url: "/key_info",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    }
  };
  var result = null
  it("Returns status code 200", function(done) {
    baseRequest.get(options, function(error, response, body) {
      result = body
      if (error) {
        done(body)
      } else {
        expect(response.statusCode).to.equal(200)
        done()
      }
    })
  })
  it("Is an object", function(done) {
    expect(JSON.parse(result)).to.be.an("object");
    done()
  })
  it("matches expected values", function(done) {
    expect(result).to.equal('{"account":{"read":true,"write":false},"history":{"read":true,"write":false},"orders":{"read":true,"write":true},"positions":{"read":true,"write":true},"funding":{"read":true,"write":true},"wallets":{"read":true,"write":true},"withdraw":{"read":false,"write":true}}')
    done()
  })
})