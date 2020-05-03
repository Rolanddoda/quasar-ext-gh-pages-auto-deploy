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
  return npmOrYarn === 'npm' ? 'npm ci' : 'yarn install --frozen-lockfile'
}

module.exports = {
  getUserCredentials,
  getRepoName,
  getCleanInstallCommand
}