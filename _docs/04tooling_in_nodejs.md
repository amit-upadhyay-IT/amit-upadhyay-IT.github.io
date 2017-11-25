---
title: Node.js tooling
permalink: /docs/04tooling_in_nodejs/
---

## Tooling in nodejs

<div class="note info">
  <h5>Ever thought of using NPM as build tool?</h5>
  <p></p>
</div>

We can use npm as a build tool, which I highly discourage doing unless and until we have a very small and isolated app. If you are going to use package.json or npm as a build tool, then number of options you are going to have is limited.
I would rather recommend using modules like `Grunt`, `Gulp` or `Broccoli`.

If you use NPM as build tool, you can make use of "npm start", "npm test", "npm stop", note that start, test, stop are part of script in package.json file. If you want to use NPM as build tool then strengthen yourself [here](https://medium.com/javascript-training/introduction-to-using-npm-as-a-build-tool-b41076f488b0)


<div class="note info">
  <h5>Yeoman</h5>
  <p>The web scaffolding tool for mordern webapps.</p>
</div>

For nodejs we don't have an official IDE which creates the projects and file for you. Since you see the versatility of nodejs. So they have come up with a module **YEOMAN**. It is **THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS**. `Yo` is the scaffolding tool engine which leverages `bower` and `grunt` to build the whole process. We can use the Yeoman generater for creating a node module. Yeoman setup is one time installation. For running Yeoman we would require three modules.

#### Use this command to install:

```sh
# this command installs yeoman, bower and grunt-cli:
$ npm install -g yo bower grunt-cli
```
Since it has `-g` flag, so it can run from anywhere in the terminal. Remember, for `bower` to work you should have `git` installed on your machine. To know more about `bower`, visit [here](http://npmjs.com/package/bower). `Bower` and `npmjs` are both package managers. Bower offers a generic, unopinionated solution to the problem of front-end package management. We can also search for bower packages (like we do for npm). The difference between npm and bower is that `npm is hierarchical dependency manager`. You can create your own module and publish it on bower. Remember `bower is mainly for front development`.

We want to create a nodejs module using Yeoman. For that just search 'node' at [Discovering generators](http://yeoman.io/generators/). The official generators are marked moustache. We have this project named [generator-node](https://github.com/yeoman/generator-node). Let's say we want to create a new node module and push it to the npm repository, for that reason we don't want to manually generate everything every single time. Here we are going to install generator-node. `generator-node` takes care of scaffolding the project for you on the fly.

#### Install generator-node:

```sh
$ npm install --global generator-node
```

#### To use:

```sh
$ yo node
```

Here we are done. Now bunch of question about the project would be asked. It creates the whole project structure for you. It generates `README.md`, `package.json`, `index.js` (all our business logic is going to be written here), etc.

## What is grunt?
Grunt is like `Ant script`, `Maven` or `Gradle` in java, i.e. build tool. In one word Grunt is basically automation. We will be writing a bunch of things in the grunt ecosystem to do automated process. Grunt is basically a configuration based tool where we specify what needs to be done. 
