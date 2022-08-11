const { rules: baseStyleRules } = require('eslint-config-airbnb-base/rules/style');

// Most extension rules in `eslint-plugin-vue` are only wrapped core ESLint rules
// Except for `max-len` and `no-irregular-whitespace`, which are replacements.
const styleRulesToExtend = [
  'array-bracket-newline',
  'array-bracket-spacing',
  'arrow-spacing',
  'block-spacing',
  'brace-style',
  'camelcase',
  'comma-dangle',
  'comma-spacing',
  'comma-style',
  'dot-location',
  'dot-notation',
  'eqeqeq',
  'func-call-spacing',
  'key-spacing',
  'keyword-spacing',
  'no-constant-condition',
  'no-empty-pattern',
  'no-extra-parens',
  'no-loss-of-precision',
  'no-restricted-syntax',
  'no-sparse-arrays',
  'no-useless-concat',
  'object-curly-newline',
  'object-curly-spacing',
  'object-property-newline',
  'object-shorthand',
  'operator-linebreak',
  'prefer-template',
  'quote-props',
  'space-in-parens',
  'space-infix-ops',
  'space-unary-ops',
  'template-curly-spacing',
];

const styleRulesToReplace = [
  'max-len',
  'no-irregular-whitespace',
];

const vueStyleRules = {};
styleRulesToExtend.forEach((name) => {
  if (baseStyleRules[name]) {
    vueStyleRules[`vue/${name}`] = baseStyleRules[name];
  }
});
styleRulesToReplace.forEach((name) => {
  if (baseStyleRules[name]) {
    vueStyleRules[name] = 'off'; // disable the original rule
    vueStyleRules[`vue/${name}`] = baseStyleRules[name];
  }
});

module.exports = {
  plugins: ['vue'],

  rules: {
    // Apply the style rules in airbnb to expressions in `<template>` too.
    ...vueStyleRules,

    // `vue/max-len` needs special configuration for better usability
    'vue/max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,

      // 1. it's like `ignoreStrings`
      // 2. SVG `path`s should be ignored
      ignoreHTMLAttributeValues: true,
      // Because spaces in HTML are insignificant,
      // it shouldn't be hard to start a new line for text content
      ignoreHTMLTextContents: false,
    }],

    // Follow similar styles in <template> as airbnb requires in JSX
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
    // TODO: (semver-major) enable it later?
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
    // TODO: (semver-major) discuss and decide on the future behavior.
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
      // Unllike in the `airbnb-base` ruleset, this is set to `true`,
      // Because neither Vue CLI & Vite targets IE 11 by default.
      allowReferrer: true,

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
