const fs = require('fs')

module.exports = function (api) {
  const ghActionPath = api.resolve.app('.github/workflows/gh-pages-deploy.yml')
  const ghPagesScriptPath = api.resolve.app('scripts/gh-pages-deploy.js')
  
  if (fs.existsSync(ghActionPath)) api.removePath(ghActionPath)
  if (fs.existsSync(ghPagesScriptPath)) api.removePath(ghPagesScriptPath)
  
  api.onExitLog(`Thanks for using this extension.`)
}
