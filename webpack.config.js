const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { config } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV: ', isDev);
console.log('IS PROD: ', isProd);

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	};

	if (isProd) {
		config.minimizer = [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin()
		];
	}
	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = add => {
	let loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		'css-loader'
	];

	if (add) {
		loaders.push(add);
	}
	return loaders;
};

const jsLoaders = () => {
	const loaders = [];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, './src/assets/img/favicon.ico'),
				to: path.resolve(__dirname, './dist/assets/img')
			},
			{
				from: path.resolve(__dirname, './src/assets/sound/horn.mp3'),
				to: path.resolve(__dirname, './dist/assets/sound')
			},
				//{
				//from: path.resolve(__dirname, './src/fonts/roboto'),
				//to: path.resolve(__dirname, './dist/fonts/roboto')
				//}
			],
		}),
		new MiniCssExtractPlugin({
			//filename: '[name].[contenthash].css'
			filename: filename('css')
		})

	];

	if (isProd) {
		base.push(new BundleAnalyzerPlugin());
	}

	return base;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index.js'
	},
	output: {
		//filename: "[name].[contenthash].js",
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.svg', '.mp3', '.jpeg', '.jpg', '.css', '.scss', '.ttf', '.ico'],
		alias: {
			'@fonts': path.resolve(__dirname, './src/fonts'),
			'@': path.resolve(__dirname, './src'),
			'@audio': path.resolve(__dirname, './src/assets/sound'),
			'@images': path.resolve(__dirname, './src/assets/img'),
		}
	},
	optimization: optimization(),
	devServer: {
		port: 4000,
		hot: true
	},
	devtool: isDev ? 'source-map' : false, 
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.mp3$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		]
	}
}