const HtmlWebpackPlugin = require('html-webpack-plugin');
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: ['./src/main.js'],
       	//mazer: ['./src/mazer.js'],
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            '~': path.resolve(__dirname, 'src')
          }
    },
    devtool: "eval",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: 'babel-loader' 
            },
            {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
				  loaders: {
					// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
					// the "scss" and "sass" values for the lang attribute to the right configs here.
					// other preprocessors should work out of the box, no loader config like this necessary.
					'scss': [
					  'vue-style-loader',
					  'css-loader',
					  'sass-loader'
					]
				  }
				  // other vue-loader options go here
				}
			  },
            { 
                test: /\.css$/, 
                use: ['vue-style-loader', 'css-loader']
            },
			{
				test: /\.scss$/,
				use: [
				  'vue-style-loader',
				  'css-loader',
				  'sass-loader'
				]
			},
			{
				test: /\.(jpg|png)$/,
				use: {
					loader: 'url-loader',
				},
			},
        ]
    },
    devServer: {
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js'  webpack 1용 입니다
    //     }
    // },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
			inject: 'body',
            template: './src/index.html',
			/* chunks: ['app', 'mazer'],
			chunksSortMode: 'manual', */
        }),
		new webpack.DefinePlugin({
			DOMAIN_URL: JSON.stringify('http://localhost:80'),
		}),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
