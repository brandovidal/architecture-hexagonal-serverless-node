const normalizeDatabaseNameFromContext = context => {
  return `${context.toLocaleLowerCase().trim()}-db`
}

module.exports = {
  normalizeDatabaseNameFromContext
}
