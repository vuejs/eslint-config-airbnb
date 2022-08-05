const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const allVueRules = require('eslint-plugin-vue').rules;

const vueStyleRules = {};
// eslint-disable-next-line no-restricted-syntax
for (const [name, config] of Object.entries(baseStyleRules)) {
  if (name in allVueRules) {
    vueStyleRules[`vue/${name}`] = config;
  }
}

module.exports = {
  plugins: ['vue'],

  rules: {
    // Apply the style rules in airbnb to expressions in `<template>` too.
    ...vueStyleRules,

    // TODO: follow similar styles in <template> as airbnb requires in JSX
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js

    // https://eslint.vuejs.org/rules/html-indent.html
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
    }],

    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': ['error', {
      multiline: { max: 1 },
      // Note: this differs from the official style guide a little bit
      // https://vuejs.org/style-guide/rules-strongly-recommended.html#multi-attribute-elements
      // Because Airbnb's JSX style doesn't care about maximum singleline attributes
      singleline: { max: 9999 },
    }],

    // https://eslint.vuejs.org/rules/no-duplicate-attributes.html
    // Already in `plugin:vue/essential` and `plugin:vue/vue3-essential` ruleset.
    // Adding it again here to keep consistency with the JSX rules
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass: true,
      allowCoexistStyle: true,
    }],

    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    // TODO: enable it later?
    // At this point the community seems to have a majority preference for `kebab-case`.
    // Turning this on may cause too many inconvenience.

    // https://eslint.vuejs.org/rules/html-self-closing.html
    // Prevents extra closing tags for components without children.
    // Note this rule's default value is different from the JSX rule:
    // - For normal HTML elements and custom components,
    //   no extra closing tag means self-closing, e.g. `<div />`, `<MyComponent />`;
    // - For HTML void elements, no extra closing tag means no closing tags,
    //   e.g. `<br>`, `<img>`, `<input>`
    // Considering it's already common in the community to use `<img src="..." />`,
    // I decided to relax it a little bit for now.
    // TODO: discuss and decide on the future behavior.
    'vue/html-self-closing': ['error', {
      html: {
        void: 'any',
      },
    }],

    // https://eslint.vuejs.org/rules/first-attribute-linebreak.html
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],

    // https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',

    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': ['error', {
      // TODO: default to true once Vue 2 reaches EOL (so that IE support is dropped)
      allowReferrer: false,

      enforceDynamicLinks: 'always',
    }],

    // https://eslint.vuejs.org/rules/no-child-content.html
    // Already in `plugin:vue/essential` and `plugin:vue/vue3-essential` ruleset.
    // Adding it again here to keep consistency with the JSX rules
    'vue/no-child-content': 'error',

    // https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always',
    }],

    // https://eslint.vuejs.org/rules/html-button-has-type.html
    'vue/html-button-has-type': ['error', {
      button: true,
      submit: true,
      reset: false,
    }],

    // https://eslint.vuejs.org/rules/no-multi-spaces.html
    'vue/no-multi-spaces': 'error',
  },
};
