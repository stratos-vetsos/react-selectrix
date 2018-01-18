const path = require( 'path' );
const webpack = require( 'webpack' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

module.exports = {

	context: path.resolve( __dirname ),

	entry: {
		'bundle-production': './src/index'
	},

	devtool: 'cheap-module-source-map',

	resolve: {
		alias: {
			'components': path.resolve( __dirname, 'src/components' ),
			'scss': path.resolve( __dirname, 'src/scss' ),
			'helpers': path.resolve( __dirname, 'src/helpers' ),
			'actions': path.resolve( __dirname, 'src/actions' ),
			'reducers': path.resolve( __dirname, 'src/reducers' )
		},
		extensions: [
			'.jsx', '.js'
		],
		modules: [ path.resolve( `./src` ), 'node_modules' ]
	},
	output: {
		filename: '[name].js',
		// the output bundle

		path: path.resolve( __dirname, `./dist` ),

		publicPath: '/dist/',

		libraryTarget: 'umd'

	},

	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'prop-types': {
			root: 'PropTypes',
			commonjs2: 'prop-types',
			commonjs: 'prop-types',
			amd: 'prop-types'
		},
		'react-dom': 'umd react-dom'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				enforce: "pre",
				exclude: /node_modules/,
				options: {
					emitWarning: true
				}
			}, {
				test: /\.jsx?$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}, {
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					}, {
						loader: "css-loader" // translates CSS into CommonJS
					}, {
						loader: "sass-loader" // compiles Sass to CSS
					}
				]
			}
		]
	},

	plugins: [

		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( 'production' )
			}
		} ),

		//	new BundleAnalyzerPlugin(),

		new webpack.ProvidePlugin( { 'Promise': 'es6-promise', 'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch' } ),

		new webpack.optimize.UglifyJsPlugin( {
			mangle: true,
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
				screw_ie8: true
			},
			output: {
				comments: false
			},
			exclude: [ /\.min\.js$/gi ],
			sourceMap: false
		} ),
		new webpack.optimize.AggressiveMergingPlugin()

	]
};
