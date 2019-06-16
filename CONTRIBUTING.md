# Contributing Guide

## Getting Started

If you have never worked on a VSCode extension before, it is worth reading through [VSCode's docs](https://code.visualstudio.com/api) first

Fork the project in Github, then:

```bash
git clone git@github.com:<your-username>/vscode-margin-colours.git
yarn
```

## Working Locally

Open the project in VSCode and hit F5

This will compile and run the extension in a new Extension Development Host window

You can open any project here and test the extension behaves as expected

When you make changes to the code you have to restart the Extension Development Host to see them

If you get stuck on anything, check out the [VSCode Extension Docs](https://code.visualstudio.com/api)

## Writing Tests

All tests can be found in `./src/test/extension.spec.ts`

Any new feature/bug fix will require a test to be added

Tests are written using [Mocha](https://mochajs.org/), [Sinon](https://sinonjs.org/) and [Chai](https://www.chaijs.com/)

Tests can be run with either:

```bash
yarn test
yarn test:watch
```

## Creating Pull Request

Create a pull request through Github and it will be reviewed, and then merged if all is good

A Circle CI build will trigger automatically, which will lint & test the code and ensure it packages without errors

## Packaging & Publishing

You don't really need to worry about packaging/publishing as this will be handled for you when your pull request is merged in

But if you want to test packaging locally, you can run

```bash
yarn vsce package
```

which will package the extension and generate a .vsix file

You can inspect the packaged contents by changing the .vsix extension to .zip

Publish won't work at all without the correct permissions
