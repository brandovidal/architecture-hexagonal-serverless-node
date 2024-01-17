const envNames = ['prod', 'qa', 'test', 'dev']

const parseEnvName = value => {
  const envName = envNames.find(validName => validName === value)
  if (!envName) {
    throw new Error(`Not a supported env: <${value}>.`)
  }
  return envName
}

const getEnvFileNameFromEnv = value => {
  const envName = parseEnvName(value)

  if (envName === 'production') {
    return '.env'
  }

  return `.env.${envName}`
}

module.exports = {
  parseEnvName,
  getEnvFileNameFromEnv
}
