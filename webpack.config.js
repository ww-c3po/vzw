const path 				= require('path');
const webpack 			= require('webpack');
const TerserPlugin 		= require('terser-webpack-plugin');
const MiniCssExtracter 	= require('mini-css-extract-plugin');
const OptimizeCSSer 	= require('optimize-css-assets-webpack-plugin');

const config = {
	mode: 'production',
	// mode: 'development',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'js/app.min.js'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {},
				extractComments: true
			}),
		],
	}
};

const entry = [
	path.resolve( __dirname, 'src/app.js' ),
	path.resolve( __dirname, 'src/scss/bootstrap.scss' )
];
config.entry = entry;

const modules = {
	rules: [{
		test: /\.scss$/,
		use: [{
			loader: 'file-loader',
			options: {
				name: 'css/app.min.css'
			}
		}, {
			loader: 'extract-loader'
		}, {
			loader: 'css-loader?-url'
		}, {
			loader: 'postcss-loader'
		}, {
			loader: 'sass-loader'
		}]
	}]
};
config.module = modules;

const plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	}),
    new MiniCssExtracter({
		filename: 'css/app.min.css'
	}),
	new OptimizeCSSer({
		cssProcessorPluginOptions: {
			preset: [
			'default', {
				discardComments: {
					removeAll: true
				}
			}],
		}
	})
].filter( (val) => !!val );
config.plugins = plugins;

module.exports = config;
