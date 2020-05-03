const plugin = require('./tools/plugin')

module.exports = async function (api) {
  api.compatibleWith('quasar', '>=1.0.0')
  api.compatibleWith('@quasar/app', '>=1.0.0')

  plugin.extendPackageJSON(api)
  await plugin.addPublicPathToConfig(api)
  await plugin.addTemplateFiles(api)
}
