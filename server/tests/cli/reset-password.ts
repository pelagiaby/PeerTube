import 'mocha'
import { cleanupTests, CLICommand, flushAndRunServer, ServerInfo, setAccessTokensToServers } from '../../../shared/extra-utils'

describe('Test reset password scripts', function () {
  let server: ServerInfo

  before(async function () {
    this.timeout(30000)
    server = await flushAndRunServer(1)
    await setAccessTokensToServers([ server ])

    await server.users.create({ username: 'user_1', password: 'super password' })
  })

  it('Should change the user password from CLI', async function () {
    this.timeout(60000)

    const env = server.cli.getEnv()
    await CLICommand.exec(`echo coucou | ${env} npm run reset-password -- -u user_1`)

    await server.login.login({ user: { username: 'user_1', password: 'coucou' } })
  })

  after(async function () {
    await cleanupTests([ server ])
  })
})
