const fs = require('fs')
const execa = require("execa")

async function getUserCredentials() {
  const {stdout: userName} = await execa.command('git config user.name')
  const {stdout: email} = await execa.command('git config user.email')
  return {
    username: userName.replace(' ', ''),
    email
  }
}

module.exports = async function (api) {
  api.compatibleWith('quasar', '>=1.0.0')
  api.compatibleWith('@quasar/app', '>=1.0.0')
  
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
  
  const {username, email} = await getUserCredentials()
  api.render('./templates', {username, email})
}
