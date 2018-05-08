const path = require( 'path' );
const webpack = require( 'webpack' );
// const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = {

	context: path.resolve( __dirname ),

	entry: {
		'index': './src/index'
	},

	mode: 'production',

	resolve: {
		alias: {
			'components': path.resolve( __dirname, 'src/components' ),
			'scss': path.resolve( __dirname, 'src/scss' ),
			'helpers': path.resolve( __dirname, 'src/helpers' ),
			'actions': path.resolve( __dirname, 'src/actions' ),
			'reducers': path.resolve( __dirname, 'src/reducers' ),
			'react': path.resolve( __dirname, './node_modules/react' ),
			'react-dom': path.resolve( __dirname, './node_modules/react-dom' )
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
		libraryTarget: 'umd',
		umdNamedDefine: true

	},

	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'React',
			root: 'React'
		},
		"react-dom": {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'ReactDOM',
			root: 'ReactDOM'
		},
		"prop-types": {
			root: 'PropTypes',
			commonjs2: 'prop-types',
			commonjs: 'prop-types',
			amd: 'prop-types'
		}
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
			'process.env.NODE_ENV': JSON.stringify( 'production' )
		} ),

		new UglifyJSPlugin(),

		// new BundleAnalyzerPlugin(),

		new webpack.optimize.AggressiveMergingPlugin()

	]
};
