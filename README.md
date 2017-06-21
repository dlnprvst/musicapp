This is the source of a small ionic2 music app

## How to use this source works

*This source does not work on its own*.

To use this source, create a new ionic project using the ionic node.js utility.

### With the Ionic CLI:

First install ionic, cordova, with npm, and the use `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start appName
```

You will now need to download the repo source `src`, where the app source code is. It will replace the current `src` folder contained in your app folder.
Last step, is adding a plugin, as you can run the app on iOS and Android, the plugin helps keeping a feature working for non-desktop devices:
```bash
$ ionic cordova plugin add cordova-plugin-inappbrowser
$ npm install --save @ionic-native/in-app-browser
```

Then, to run it, cd into `appName` and run:

```bash
$ ionic serve
```
