import { resolve } from 'node:path';
import { Configuration } from 'webpack';

const distPath: string = resolve(process.cwd(), 'dist');
const srcPath: string = resolve(process.cwd(), 'src');

const config: Configuration = {
  entry: resolve(srcPath, 'index.ts'),
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(process.cwd(), 'tsconfig.build.json'),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: false,
  },
  output: {
    filename: 'avm-web-provider.min.js',
    path: distPath,
  },
  resolve: {
    alias: {
      ['@app/constants']: resolve(srcPath, 'constants'),
      ['@app/controllers']: resolve(srcPath, 'controllers'),
      ['@app/enums']: resolve(srcPath, 'enums'),
      ['@app/errors']: resolve(srcPath, 'errors'),
      ['@app/messages']: resolve(srcPath, 'messages'),
      ['@app/types']: resolve(srcPath, 'types'),
      ['@app/utils']: resolve(srcPath, 'utils'),
    },
    extensions: ['.js', '.ts'],
  },
};

export default config;
