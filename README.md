# gh-pages-auto-deploy

### What does it do?
Automates [Github Pages](https://help.github.com/en/github/working-with-github-pages/about-github-pages)
deployment by using [Github Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions).

### How is it beneficial?
Deploying an app to github pages takes some steps that you have to do every time.
This extension makes deployment to github pages really easy.
After you have added it in your project, everything is ready for you without doing anything else.
Every time you push on `master` branch a deployment begins using github actions.

### Why would someone want to use it?
Often, I create small applications and when I finish them, I want to deploy them to github pages.
I had to copy paste a lot of stuff from older projects I already had set up the github pages deployment.
Even the copy/paste process was taking some time, so I thought that creating an extension to automate
everything would be a great idea. 

## Install
```bash
quasar ext add quasar-app-extension-gh-pages-auto-deploy
```
Quasar CLI will retrieve it from NPM and install the extension.

## Uninstall
```bash
quasar ext remove quasar-app-extension-gh-pages-auto-deploy
```

### The story - me and Quasar
I am using quasar in my work for one and a half year and I really love it.
I always wanted to contribute somehow to this awesome community, but I never found the time to do it.
When I saw the \#Hack-a-May contest I though that I it was a great opportunity to give something small
to the community who helped me so much all these months and I fall in love with it.  

### The story - challenge
Everything started back in 2018 where it was kinda hard for me to find the right steps to deploy
a vue-cli app on github pages. So after I successfully deployed my app to github pages, I thought 
that would be a good idea to write an article about the steps I took to successfully deploy my app.

[That article](https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd) got a huge
impact, and it seemed that many other people were struggling to deploy their app on GP (github pages) too.

This year, I created 2 small projects, and I went to my article to read how to deploy it on GP.
Even though everything worked, it took some time to follow all these steps every time I want to deploy. 
It was obvious I should do something to automate the deployment.

After researches, I found out a way and wrote another [article](https://dev.to/rolanddoda/deploy-to-github-pages-like-a-pro-with-github-actions-4hdg)
which again got a huge impact since you had to set up deployment only once and every time you push
on master the app will be automatically deployed.

Even though the latest article was a piece of art for me since I could automate deployment, still
I always have to copy paste the code. So lately, I thought about writing a vue-cli plugin which you only
had to install once to your project and everything is ready to go.

I published the [vue-cli-plugin](https://github.com/Rolanddoda/vue-cli-plugin-gh-pages-auto-deploy) which works fine
for my personal vue-cli projects. However, I am mentoring 2 junior developers, and we mostly use quasar for UI so that
would be a great idea to not only build projects with Quasar but also add them on github and deploy them to GP.

I came across to [this article](https://dev.to/quasar/hack-a-may-quasar-framework-s-community-programming-contest-3k4i)
and I knew that this was a sign I should build that extension to give something small back to the awesome
quasar community.
