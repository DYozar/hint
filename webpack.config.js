const path = require('path');

module.exports = {
  entry: './src/app/page.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};