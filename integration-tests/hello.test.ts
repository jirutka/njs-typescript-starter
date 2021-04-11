import { strict as assert } from 'assert'
import { test } from 'mocha'
import './hooks'


test('/hello?name=njs', async function () {
  const resp = await this.client.get('hello?name=njs')

  assert(resp.statusCode === 200)
  assert(resp.body.includes('Meow, njs!'))
})
