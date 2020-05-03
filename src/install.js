const plugin = require('./tools/plugin')

module.exports = async function (api) {
  api.compatibleWith('quasar', '>=1.0.0')
  api.compatibleWith('@quasar/app', '>=1.0.0')

  plugin.extendPackageJSON(api)
  await plugin.addPublicPathToConfig(api)
  await plugin.addTemplateFiles(api)
  api.onExitLog(`
      🧾🧾 Now you only have to commit and push 🧾🧾
      🔥🔥 Enjoy automatic deployment 🔥🔥
      🌟🌟 Please don't forget to star the project on Github if you like this extension. 🌟🌟
      Project URL: https://github.com/Rolanddoda/quasar-ext-gh-pages-auto-deploy
    `)
}
