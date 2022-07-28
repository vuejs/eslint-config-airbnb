// The JSX part is mostly copied from https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb/rules/react-a11y.js

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'jsx-a11y',
  ],
  rules: {
    // ensure emoji are accessible
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/accessible-emoji.md
    // disabled; rule is deprecated
    'jsx-a11y/accessible-emoji': 'off',

    // Enforce that all elements that require alternative text have meaningful information
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
    'jsx-a11y/alt-text': ['error', {
      elements: ['img', 'object', 'area', 'input[type="image"]'],
      img: [],
      object: [],
      area: [],
      'input[type="image"]': [],
    }],

    // Enforce that anchors have content
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md
    'jsx-a11y/anchor-has-content': ['error', { components: [] }],

    // ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],

    // elements with aria-activedescendant must be tabbable
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',

    // Enforce all aria-* props are valid.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md
    'jsx-a11y/aria-props': 'error',

    // Enforce ARIA state and property values are valid.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md
    'jsx-a11y/aria-proptypes': 'error',

    // Require ARIA roles to be valid and non-abstract
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],

    // Enforce that elements that do not support ARIA roles, states, and
    // properties do not have those attributes.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Ensure the autocomplete attribute is correct and suitable for the form field it is used with
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/29c68596b15c4ff0a40daae6d4a2670e36e37d35/docs/rules/autocomplete-valid.md
    'jsx-a11y/autocomplete-valid': ['off', {
      inputComponents: [],
    }],

    // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
    'jsx-a11y/click-events-have-key-events': 'error',

    // Enforce that a control (an interactive element) has a text label.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md
    'jsx-a11y/control-has-associated-label': ['error', {
      labelAttributes: ['label'],
      controlComponents: [],
      ignoreElements: [
        'audio',
        'canvas',
        'embed',
        'input',
        'textarea',
        'tr',
        'video',
      ],
      ignoreRoles: [
        'grid',
        'listbox',
        'menu',
        'menubar',
        'radiogroup',
        'row',
        'tablist',
        'toolbar',
        'tree',
        'treegrid',
      ],
      depth: 5,
    }],

    // ensure <hX> tags have content and are not aria-hidden
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md
    'jsx-a11y/heading-has-content': ['error', { components: [''] }],

    // Skipped `html-has-lang` rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md
    // Doesn't make sense for Vue.js - I doubt if anyone uses `<html>` element in Vue.js at all

    // ensure iframe elements have a unique title
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md
    'jsx-a11y/iframe-has-title': 'error',

    // Skipped `img-redundant-alt` rule
    // Because:
    // 1. I personally, and many others, think it's not useful https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/417
    // 2. Bugs related to optional chaining syntax: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/755
    // 3. `vuejs-accessibility` doesn't have the corresponding rule

    // Elements with an interactive role and interaction handlers must be focusable
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md
    'jsx-a11y/interactive-supports-focus': 'error',

    // Enforce that a label tag has a text label and an associated control.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
    // As Vue JSX uses `for` instead of `htmlFor`, we have to disable it for now
    // TODO: open a feature request
    'jsx-a11y/label-has-associated-control': 'off',
    // 'jsx-a11y/label-has-associated-control': ['error', {
    //   labelComponents: [],
    //   labelAttributes: [],
    //   controlComponents: [],
    //   assert: 'both',
    //   depth: 25,
    // }],

    // Skipped `lang` rule
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/lang.md
    // Same reason as above (`html-has-lang`)

    // media elements must have captions
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md
    'jsx-a11y/media-has-caption': ['error', {
      audio: [],
      video: [],
      track: [],
    }],

    // require that mouseover/out come with focus/blur, for keyboard-only users
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md
    'jsx-a11y/mouse-events-have-key-events': 'error',

    // Prevent use of `accessKey`
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md
    'jsx-a11y/no-access-key': 'error',

    // prohibit autoFocus prop
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
    'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],

    // prevent distracting elements, like <marquee> and <blink>
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md
    'jsx-a11y/no-distracting-elements': ['error', {
      elements: ['marquee', 'blink'],
    }],

    // WAI-ARIA roles should not be used to convert an interactive element to non-interactive
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
    'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
      tr: ['none', 'presentation'],
    }],

    // A non-interactive element does not support event handlers (mouse and key handlers)
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
    'jsx-a11y/no-noninteractive-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp',
      ],
    }],

    // WAI-ARIA roles should not be used to convert a non-interactive element to interactive
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
    'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
      ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
      li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
      table: ['grid'],
      td: ['gridcell'],
    }],

    // Tab key navigation should be limited to elements on the page that can be interacted with.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md
    'jsx-a11y/no-noninteractive-tabindex': ['error', {
      tags: [],
      roles: ['tabpanel'],
    }],

    // require onBlur instead of onChange
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-onchange.md
    'jsx-a11y/no-onchange': 'off',

    // ensure HTML elements do not specify redundant ARIA roles
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
    'jsx-a11y/no-redundant-roles': 'error',

    // Enforce that DOM elements without semantic behavior not have interaction handlers
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp',
      ],
    }],

    // Enforce that elements with ARIA roles must have all required attributes
    // for that role.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md
    'jsx-a11y/role-has-required-aria-props': 'error',

    // Enforce that elements with explicit or implicit roles defined contain
    // only aria-* properties supported by that role.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md
    'jsx-a11y/role-supports-aria-props': 'error',

    // only allow <th> to have the "scope" attr
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md
    'jsx-a11y/scope': 'error',

    // Enforce tabIndex value is not greater than zero.
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md
    'jsx-a11y/tabindex-no-positive': 'error',
  },
};
