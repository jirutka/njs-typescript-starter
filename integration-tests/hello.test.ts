import assert from 'assert/strict'
import { test } from 'mocha'
import './hooks'


test('/hello?name=njs', async function () {
  const resp = await this.client.get('hello?name=njs')

  assert.equal(resp.statusCode, 200)
  assert.match(resp.body, /Meow, njs!/)
})
