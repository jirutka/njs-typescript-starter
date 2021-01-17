'use strict'

module.exports = {
  checkLeaks: true,
  extension: ['ts'],
  require: [
    'babel-register-ts',
    'source-map-support/register',
    'integration-tests/hooks.ts',
  ],
  spec: [
    'integration-tests/**/*.test.ts',
  ],
}
