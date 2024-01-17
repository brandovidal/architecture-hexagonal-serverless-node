const sharedCustomConfig = require('../shared-custom-config')

module.exports = async ({ options }) => {
  const stage = options.stage ?? 'dev'
  let customParams = { stage }

  for (const param in sharedCustomConfig) {
    if (param === 'stage') {
      continue
    }
    customParams[param] = sharedCustomConfig[param][stage]
  }

  // Resolver may return any JSON value (null, boolean, string, number, array or plain object)
  return customParams
}
