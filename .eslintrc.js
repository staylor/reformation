const path = require('path');

module.exports = {
  "extends": ["eslint-config-kyt"],

  "rules": {
    "import/no-restricted-paths": "off",
    "jsx-a11y/label-has-for": [ 2, { "allowChildren": true }],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
    "no-underscore-dangle": ["error", { "allow": ["_id", "__typename", "__APOLLO_STATE__"] }],
    "react/destructuring-assignment": "off"
  },

  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.resolve(__dirname, "./webpack.aliases.config.js")
      }
    }
  }
}
