const fs = require('fs')
const execa = require("execa")
const path = require("path")

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
  try {
    const {stdout: repoUrl} = await execa.command('git config --get remote.origin.url')
    return path.basename(repoUrl).replace('.git', '')
  }  catch (e) {
    throw new Error('You must add a remote before installing this plugin. Adding a remote: https://help.github.com/en/github/using-git/adding-a-remote')
  }
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