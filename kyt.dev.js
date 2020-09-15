const { clientSrcPath } = require('kyt-utils/paths')();
const aliasesConfig = require('./webpack.aliases.config.js');

module.exports = {
  modifyWebpackConfig: baseConfig => {
    const config = { ...baseConfig };
    if (config.target === 'web') {
      const entries = [...config.entry.main];
      entries.pop();
      config.entry.admin = entries.concat(`${clientSrcPath}/admin.js`);
      config.entry.login = entries.concat(`${clientSrcPath}/login.js`);
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // Aliases
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...aliasesConfig.resolve.alias,
    };

    return config;
  },
};
