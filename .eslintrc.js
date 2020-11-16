const path = require('path');

module.exports = {
  extends: ['eslint-config-kyt'],

  plugins: ['kyt', 'pretty-lights'],

  rules: {
    'import/no-cycle': 'warn',
    'import/no-restricted-paths': 'off',
    'jsx-a11y/label-has-for': [2, { allowChildren: true }],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'kyt/default-props': 'error',
    'kyt/css-in-js-namespace': 'error',
    'kyt/no-direct-moment-import': 'error',
    'kyt/validate-double-underscore-dirs': 'error',
    'no-underscore-dangle': ['error', { allow: ['_id', '__typename', '__APOLLO_STATE__'] }],
    'pretty-lights/disambiguate-vars': 'warn',
    'pretty-lights/favor-css-over-styled': 'warn',
    'pretty-lights/lowercase-css-name': 'error',
    'pretty-lights/move-rules-to-file': 'error',
    'pretty-lights/no-css-prop': 'error',
    'pretty-lights/no-emotion': 'error',
    'react/jsx-props-no-spreading': 'warn',
    'react/no-danger': 'off',
    'react/no-multi-comp': 'error',
    'react/state-in-constructor': ['error', 'never'],
    'react/static-property-placement': 'off',
  },

  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './webpack.aliases.config.js'),
      },
    },
  },

  overrides: [
    {
      files: ['jest.setup.js'],
      rules: {
        'jest/no-standalone-expect': 'off',
      },
    },
    {
      files: ['*.test.js', '**/__tests__/**/*.js'],
      rules: {
        'global-require': 'off',
        'no-console': 'off',
        'react/no-multi-comp': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
