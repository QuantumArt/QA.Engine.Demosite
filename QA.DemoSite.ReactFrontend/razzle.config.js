'use strict';

module.exports = {
  modify: (config, {target, dev}, webpack) => {
    config.plugins.push(new webpack.ProvidePlugin({
      'Holder': 'holderjs',
      'holder': 'holderjs',
      'window.Holder': 'holderjs'
    }));
    return config;
  },

  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        forkTsChecker: {
          tsconfig: './tsconfig.json',
          watch: './src',
          typeCheck: true,
          tslint: false,
        },
      },
    },
    {
      name: 'scss',
      options: {
        sassModules: {
          dev: {
            sourceMap: true,
          },
          prod: {
            sourceMap: false,
          },
        },
        sass: {
          dev: {
            sourceMap: true,
            // includePaths: [paths.appNodeModules],
          },
          prod: {
            sourceMap: false,
            // includePaths: [paths.appNodeModules],
          },
        },
        css: {
          dev: {
            sourceMap: true,
            importLoaders: 1,
            modules: false,
          },
          prod: {
            sourceMap: false,
            importLoaders: 1,
            modules: false,
            minimize: true,
          },
        },
      },
    },
  ],
};
