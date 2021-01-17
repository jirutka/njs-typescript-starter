import { Context, RootHookObject } from 'mocha'
import { startNginx, NginxServer } from 'nginx-testing'


const nginxVersion = process.env.NGINX_VERSION || '1.19.x'

declare module 'mocha' {
  export interface Context {
    nginx: NginxServer
  }
}

export const mochaHooks: RootHookObject = {
  async beforeAll (this: Context) {
    this.timeout(30_000)

    this.nginx = await startNginx({ version: nginxVersion, configPath: `${__dirname}/nginx.conf` })

    const errors = (await this.nginx.readErrorLog())
      .split('\n')
      .filter(line => line.includes('[error]'))
    if (errors) {
      console.error(errors.join('\n'))
    }
  },

  async afterAll (this: Context) {
    if (this.nginx) {
      await this.nginx.stop()
    }
  },

  async afterEach (this: Context) {
    const { currentTest, nginx } = this

    // If the test passed, still read the logs to consume (discard) them before
    // running next test.
    const errorLog = await nginx.readErrorLog()
    const accessLog = await nginx.readAccessLog()

    if (currentTest?.state === 'failed' && currentTest.err) {
      const logs = [
        errorLog && '----- Error Log -----\n' + errorLog,
        accessLog && '----- Access Log -----\n' + accessLog,
      ].filter(Boolean)

      if (logs.length > 0) {
        currentTest.err.stack += '\n\n' + logs.join('\n\n').replace(/^/gm, '    ')
      }
    }
  }
}
