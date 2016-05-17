describe("/withdraw", function() {
  var payload = {
    "request": "/v1/withdraw",
    "nonce": Date.now().toString(),
    "amount": "0.01",
    "withdraw_type": "bitcoin",
    "walletselected": "exchange",
    "address": "1DKwqRhDmVyHJDL4FUYpDmQMYA3Rsxtvur"
  }
  payload = new Buffer(JSON.stringify(payload)).toString('base64')
  var signature = crypto.createHmac("sha384", api_secret).update(payload).digest('hex')
  var options = {
    url: "/withdraw",
    headers: {
      'X-BFX-PAYLOAD': payload,
      'X-BFX-SIGNATURE': signature
    },
    body: payload
  }
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
    })
  })
})