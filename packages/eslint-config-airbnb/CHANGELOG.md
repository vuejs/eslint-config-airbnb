# @vue/eslint-config-airbnb

## 7.0.1

### Patch Changes

- fix: remove `vue/no-setup-props-destructure` rule (#59)

  It's deprecated and removed from `eslint-plugin-vue`'s preset configs since v9.17. More discussions available at https://github.com/vuejs/eslint-plugin-vue/issues/2259

## 7.0.0

### Major Changes

- All the eslint plugins are listed as `dependencies`, rather than `peerDependencies`.
  So when using these configs with `@rushstack/eslint-patch`, you no longer have to install the plugins separately.

- This major version adds a lot style / accessibility rules for JSX / `<template>` syntaxes, adapted from the upstream [`eslint-plugin-airbnb`](https://github.com/airbnb/javascript/tree/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb).
  You might see many more errors if you are upgrading from older versions of this package. Luckily, most of them are auto-fixable.

- In this version, we've provided a `createAliasSetting` helper to help users configure the path aliases used in the project for ESLint.
  So this package is no longer only coupled with `@vue/cli`. Explicitly invoking the helper function is also more reliable than the previous auto-detection feature.
