const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: false,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: false,
        },
      });
    }
    return loaders;
};

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
    module: {
      rules: [
		{
			test: cssRegex,
			exclude: cssModuleRegex,
			use: getStyleLoaders({
			  importLoaders: 1,
			  sourceMap: false,
			}),
			// Don't consider CSS imports dead code even if the
			// containing package claims to have no side effects.
			// Remove this when webpack adds a warning or an error for this.
			// See https://github.com/webpack/webpack/issues/6571
			sideEffects: true,
		},
		{
			test: cssModuleRegex,
			use: getStyleLoaders({
				importLoaders: 1,
				sourceMap: false,
				modules: true,
				getLocalIdent: getCSSModuleLocalIdent,
			}),
		},
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader?limit=25000',
          query: {
            limit: 10000,
            name: 'static/media/images/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    }
  }