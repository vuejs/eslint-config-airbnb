# `@vue/eslint-config-airbnb`

> eslint-config-airbnb for Vue

This config is specifically designed to be used by `@vue/cli` & `create-vue` setups
and is not meant for outside use (it can be used but some adaptations
on the user side might be needed - for details see the config file).

A part of its design is that this config may implicitly depend on
other parts of `@vue/cli`/`create-vue` setups, such as `eslint-plugin-vue` being
extended in the same resulting config.

## Installation

In order to work around [a known limitation in ESLint](https://github.com/eslint/eslint/issues/3458), we recommend you to use this package alongside `@rushstack/eslint-patch`, so that you don't have to install too many dependencies:

```sh
npm add --dev @vue/eslint-config-airbnb @rushstack/eslint-patch
```

## Usage

An example `.eslintrc.cjs`:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb'
  ]
}
```

## Aliases

The base airbnb config includes rules that need to actually resolve the imported module on the filesystem, such as [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/v2.26.0/docs/rules/no-unresolved.md).

If you use aliases in your project, you need to configure ESLint to resolve the aliases, and we've provided a helper function for the task.

For example, it is a widely accepted convention to use `@` as an alias to the `src` folder in the Vue ecosystem. To enable this, you can use the following config:

```js
require('@rushstack/eslint-patch/modern-module-resolution')

const path = require('node:path')
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb'
  ],
  rules: {
    'import/no-unresolved': 'error'
  },
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`
    })
  }
}
```

`createAliasSetting` accepts a map of aliases and their corresponding paths, and returns a settings object to be spread in to the `settings` field of the ESLint config.

## IE 11 support

IE 11 reached End-of-Life on June 15, 2022, so this configuration doesn't include any rules that are specific to IE 11.

If your project still has to support IE 11, we recommend you to add the following 2 rules to your config:

```js
module.exports = {
   // ...

   rules: {
    // Enforce `rel="noopener noreferrer"` on external links in `<template>`
    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': 'error',
    // Enforce `rel="noopener noreferrer"` on external links in JSX
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
    'react/jsx-no-target-blank': 'error',
   }
}
```

