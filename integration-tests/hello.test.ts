import { strict as assert } from 'assert'
import got, { Got } from 'got'
import { before, test } from 'mocha'
import './hooks'


let client: Got

before(function () {
  client = got.extend({
    throwHttpErrors: false,
    prefixUrl: `http://127.0.0.1:${this.nginx.port}`,
  })
})

test('/hello?name=njs', async () => {
  const resp = await client.get('hello?name=njs')

  assert.equal(resp.statusCode, 200, 'Expected to return status 200.')
  assert(resp.body.includes('Meow, njs!'), 'Expected body to include "Meow, njs!"')
})
