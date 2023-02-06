const path = require('path')
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import json from 'rollup-plugin-json'

// 环境变量
const NODE_ENV = process.env.NODE_ENV
// 入口文件
const inputDir = path.resolve(__dirname, './src/index.ts')
// 输出路径
const outputDir = { development: './dist/dev/', production: './dist/build/' }[
  NODE_ENV
]

const extensions = ['.ts', '.js', '.tsx']
// rollup插件
const plugins = [
  resolve(),
  commonjs(),
  typescript({
    objectHashIgnoreUnknownHack: true,
  }),
  babel({
    exclude: 'node_modules/**',
    extensions,
    // plugins: ['@babel/plugin-transform-runtime'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
  json(),
  alias({
    entries: [{ find: '@', replacement: __dirname + '/src' }],
  }),
]
// 外部库
const externals = []
// 全局变量
const globals = {}

const config = {
  development: {
    input: inputDir,
    output: ['es', 'umd', 'cjs', 'iife'].map((format) => ({
      dir: path.resolve(__dirname, outputDir + format),
      format,
      globals: { ...globals },
      name: require('./package.json').name,
      extend: true,
    })),
    plugins: [...plugins],
    external: [...externals],
  },
  production: {
    input: inputDir,
    output: ['es', 'umd', 'cjs', 'iife'].map((format) => ({
      dir: path.resolve(__dirname, outputDir + format),
      format,
      globals: { ...globals },
      name: require('./package.json').name,
    })),
    plugins: [...plugins, terser(), cleanup(), filesize()],
    external: [...externals],
  },
}[NODE_ENV]

export default config
