const execa = require("execa");
const emoji = require("node-emoji");
const chalk = require("chalk");

const firstLog = emoji.get("fast_forward") + " " + chalk.yellow("Building...");
const secondLog = emoji.get("fast_forward") + " " + chalk.yellow("Pushing...");
const thirdLog =
  emoji.get("rocket") +
  " " +
  chalk.green("Your app successfully deployed") +
  " " +
  emoji.get("rocket");

(async () => {
  try {
    await execa.command('git checkout --orphan gh-pages')
    console.log(firstLog);
    await execa.command('quasar build')
    await execa.command('git --work-tree dist/spa add --all')
    await execa.command('git --work-tree dist/spa commit -m "gh-pages"')
    console.log(secondLog);
    await execa.command('git push origin HEAD:gh-pages --force')
    await execa.command('rm -r dist/spa')
    await execa.command('git checkout -f master')
    await execa.command('git branch -D gh-pages')
    console.log(thirdLog);
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
