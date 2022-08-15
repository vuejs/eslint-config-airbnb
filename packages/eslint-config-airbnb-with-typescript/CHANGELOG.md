# @vue/eslint-config-airbnb-with-typescript

## 7.0.0

### Major Changes

- When using the Airbnb Style in a TypeScript project, you no longer need to install both `@vue/eslint-config-airbnb` and `@vue/eslint-config-typescript`.
  You can just use the `@vue/eslint-config-airbnb-with-typescript` package.

  It also provides stricter rules for TypeScript.

  For example, by default, only `<script lang="ts">` is allowed in `.vue` files.
  You can opt-in the `@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue` config to allow plain JavaScript `<script>`s.
  It is strongly discouraged to use JSX and TSX syntaxes in `.vue` files, but we still provide corresponding configs to allow you opt-in them.

