const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {

    context: path.resolve( __dirname ),

    entry: {
        bundle: './src/gh-pages'
    },

    resolve: {
        extensions: [
            '.jsx', '.js'
        ],
        modules: [
            path.resolve( `./src` ),
            'node_modules'
        ],
		alias: {
			'components': path.resolve( __dirname, 'src/components' ),
			'scss': path.resolve( __dirname, 'src/scss' ),
			'helpers': path.resolve( __dirname, 'src/helpers' ),
			'actions': path.resolve( __dirname, 'src/actions' ),
			'reducers': path.resolve( __dirname, 'src/reducers' ),
		}
    },
    output: {
        filename: '[name].js',
        // the output bundle

        path: path.resolve( __dirname, `./dist` ),

        publicPath: '/dist/'

    },

    devtool: 'cheap-module-eval-source-map',
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
			},
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
			{
				test: /\.scss$/,
				use: [ {
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				} ]
			}
        ]
    },

    plugins: [

        //new webpack.ProvidePlugin({ 'Promise': 'es6-promise', 'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch' }),

        new webpack.HotModuleReplacementPlugin( ),
        // enable HMR globally

        new webpack.NamedModulesPlugin( ),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin( ),
        // do not emit compiled assets that include errors

    ],

    devServer: {
        host: 'localhost',
		port: 3010,
		historyApiFallback: false,
		hot: true,
		publicPath: '/dist/'
    }
};
