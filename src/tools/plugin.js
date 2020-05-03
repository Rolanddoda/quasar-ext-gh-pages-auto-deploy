const fs = require('fs')
const helpers = require('./helpers')

function extendPackageJSON(api) {
  api.extendPackageJson({
    scripts: {
      "gh-pages-deploy": "node scripts/gh-pages-deploy.js"
    },
    "devDependencies": {
      "chalk": "^4.0.0",
      "execa": "^4.0.0",
      "node-emoji": "^1.10.0"
    }
  })
}

async function addPublicPathToConfig(api) {
  const configPath = api.resolve.app('./quasar.conf.js')
  const config = require(configPath)
  if (!config.publicPath) {
    const repoName = await helpers.getRepoName()
    const {EOL} = require('os')
    const fileLines = fs.readFileSync(configPath, 'utf-8').split(/\r?\n/g)
    const returnTextIndex = fileLines.findIndex(line => line.includes('return'))
    const newLine = `publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/",`
    fileLines.splice(returnTextIndex + 1, 0, newLine)
    fs.writeFileSync(configPath, fileLines.join(EOL), {encoding: 'utf-8'})
  }
}

async function addTemplateFiles (api) {
  const cleanInstallCommand = helpers.getCleanInstallCommand(api)
  const {username, email} = await helpers.getUserCredentials()
  api.render('../templates', {username, email, cleanInstallCommand})
}

module.exports = {
  extendPackageJSON,
  addPublicPathToConfig,
  addTemplateFiles
}