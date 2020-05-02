module.exports = function (api) {
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
  
  api.render('./templates')
}
