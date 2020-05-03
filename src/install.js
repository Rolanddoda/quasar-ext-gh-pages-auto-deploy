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

function getPackageManager(api) {
  if (fs.existsSync(api.resolve.app('package-lock.json'))) {
    return 'npm'
  } else if (fs.existsSync(api.resolve.app('yarn.lock'))) {
    return 'yarn'
  }
}

async function getRepoName() {
  const {stdout: repoUrl} = await execa.command('git config --get remote.origin.url')
  const {stdout: repoName} = await execa.command(`basename -s .git ${repoUrl}`)
  return repoName
}

function getCleanInstallCommand(api) {
  const npmOrYarn = getPackageManager(api)
  if (npmOrYarn === 'npm') return 'npm ci'
  else return 'yarn install --frozen-lockfile'
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
  const configPath = api.resolve.app('./quasar.conf.js')
  const config = require(configPath)
  if (!config.publicPath) {
    const repoName = await getRepoName()
    const {EOL} = require('os')
    const fileLines = fs.readFileSync(configPath, 'utf-8').split(/\r?\n/g)
    const newLine = `publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/",`
    fileLines.splice(1, 0, newLine)
    fs.writeFileSync(configPath, fileLines.join(EOL), {encoding: 'utf-8'})
  }

  const cleanInstallCommand = getCleanInstallCommand(api)
  const {username, email} = await getUserCredentials()
  api.render('./templates', {username, email, cleanInstallCommand})
}
