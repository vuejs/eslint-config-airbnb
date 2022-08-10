# `@vue/eslint-config-airbnb-with-typescript`

> eslint-config-airbnb-with-typescript for Vue

This config is specifically designed to be used by `@vue/cli` & `create-vue` setups
and is not meant for outside use (it can be used but some adaptations
on the user side might be needed - for details see the config file).

A part of its design is that this config may implicitly depend on
other parts of `@vue/cli`/`create-vue` setups, such as `eslint-plugin-vue` being
extended in the same resulting config.

## Installation

In order to work around [a known limitation in ESLint](https://github.com/eslint/eslint/issues/3458), we recommend you to use this package alongside `@rushstack/eslint-patch`, so that you don't have to install too many dependencies:

```sh
npm add --dev @vue/eslint-config-airbnb-with-typescript @rushstack/eslint-patch
```

## Usage

An example `.eslintrc.cjs`:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
  ]
}
```

## JS Support in `.vue` Files

By default this ruleset only allows using `<script lang="ts">` (and `<script setup lang="ts">`) in `.vue` files.

If you need to use plain `<script>` in `.vue` files:

1. First, set `compilerOptions.allowJs` to `true` in your TSConfig.
2. Then, append the `allow-js-in-vue` ruleset to your `.eslintrc.cjs`:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue'
  ]
}
```

If you encounter any `no-undef` errors when using global variables/functions, please configure [the `env` option for ESLint](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments).

## TSX/JSX Support in `.vue` Files

There's a limitation in `@typescript-eslint/parser` that it cannot parse JSX syntaxes in `.vue` files *when `parserOptions.project` is set*.

So, by default, we disallow `<script lang="tsx">` and `<script lang="jsx">` in `.vue` files.
You can use JSX syntax in standalone `.tsx` and `.jsx` files instead.

If you do need to use `<script lang="tsx">` or `<script lang="jsx">` in your `.vue` files, you can apply the `allow-tsx-in-vue`/`allow-jsx-in-vue` config to all `.vue` files to disable those rules that require type informations (e.g., `no-floating-promises`):

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue'
  ]
}
```

Turning on `allow-jsx-in-vue` would allow both `<script lang="tsx">` and `<script lang="jsx">`, and requiring a carefully configured `env` field as aforementioned in the JS support section:

```js
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-jsx-in-vue'
  ]
}
```

Note that doing so would catch fewer errors.

## Non-Conventional TSConfig Locations

By default, this ruleset searches for TSConfig files matching `**/tsconfig.json` and `**/tsconfig.*.json` from the current working directory.
This should cover most use cases.

However, if your TSConfig file is located somewhere else (e.g., in an ancestor directory), or doesn't follow the conventional naming (e.g., named as `my-custom-tsconfig.json`), you need to specify the location in your `.eslintrc.cjs` manually:

```js
require("@rushstack/eslint-patch/modern-module-resolution")
const createAliasSetting = require('@vue/eslint-config-airbnb-with-typescript/createAliasSetting')

module.exports = {
  root: true,
  extens: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript'
  ],
  parserOptions: {
    project: ['/path/to/my-custom-tsconfig.json']
  },
  settings: {
    ...createAliasSetting(['/path/to/my-custom-tsconfig.json'])
  }
}
```

## Further Improvements

It seems possible to lift the TSX/JSX restriction in `.vue` files without disabling the type-aware linting rules.
[`@typescript-eslint/parser` allows passing `program` instance](https://github.com/typescript-eslint/typescript-eslint/tree/v5.30.7/packages/parser#parseroptionsprograms) to override any programs that would have been computed from `parserOptions.project`.
If we provide a `program` created by [Volar](https://github.com/johnsoncodehk/volar), maybe it can have better support for `.vue` files?
I haven't yet got the time to try it out.
