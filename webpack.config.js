var path = require('path');

const capitalizeString = s => s.charAt(0).toUpperCase() + s.slice(1);

module.exports = env => {
  const NODE_ENV = process.env.NODE_ENV;
  const mode = NODE_ENV || 'development';
  const packageName = process.env.npm_package_name;
  const packageNameCapital = packageName.split('-').map(capitalizeString).join('');
  const packageVersion = JSON.stringify(process.env.npm_package_version).replace(/"/g, '');
  const filename = `${packageName}-${packageVersion}${mode === 'production' ? '.min' : ''}.js`;

  return {
    mode,
    devtool: 'none',
    resolve: {
      extensions: ['.js', '.ts'],
    },
    entry: ['./src/index.ts'],
    output: {
      path: path.join(__dirname, 'build/dist'),
      filename,
      library: {
        root: packageNameCapital,
        amd: packageName,
        commonjs: packageName,
      },
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(tsx?)|(js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
