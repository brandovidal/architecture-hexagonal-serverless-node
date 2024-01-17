const { getEnvFileNameFromEnv } = require('../../secrets/utils')

module.exports = async ({ options }) => {
  const stage = options.stage ?? 'dev'

  const stageEnvs = {
    prod: 'prod',
    dev: 'dev',
    test: 'test',
    qa: 'qa'
  }

  return getEnvFileNameFromEnv(stageEnvs[stage])
}
