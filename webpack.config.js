const HtmlWebpackPlugin = require('html-webpack-plugin');
//const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
//const { GenerateSW } = require('workbox-webpack-plugin');


module.exports = {
    entry: {
        app: ['./src/main.js'],
		//'firebase-messaging-sw': "./firebase-messaging-sw.js",
		//'firebase-messaging_on_background': "./firebase-messaging_on_background.js"
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            '~': path.resolve(__dirname, 'src')
        },
		fullySpecified: false,
    },
    devtool: "eval",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
		publicPath: '/'
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
				  },
				  // other vue-loader options go here
				  compilerOptions: {
					//exclude google-pay-button from native components
					isCustomElement: (tag) => tag === 'google-pay-button'
				  }
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
        }),
		new webpack.DefinePlugin({
			//DOMAIN_URL: JSON.stringify('https://ufp-dev-api-gw.uniquekube.uniquepeople.cloud'),
			DOMAIN_URL: JSON.stringify('http://localhost:80'),
			//DOMAIN_URL: JSON.stringify('https://ufp-apigw.uniquepeople.cloud'),
			'__VUE_OPTIONS_API__': true,
      		'__VUE_PROD_DEVTOOLS__': true,

			// Define feature flags for vue-i18n
			'__VUE_I18N_FULL_INSTALL__': JSON.stringify(true),
			'__VUE_I18N_LEGACY_API__': JSON.stringify(true),
			'__INTLIFY_PROD_DEVTOOLS__': JSON.stringify(true),
		}),
        new webpack.HotModuleReplacementPlugin(),
		new Dotenv(),
		/* new GenerateSW({
			// These are some common options, and not all are required.
			// Consult the docs for more info.
			exclude: [/.../, '...'],
			navigateFallback: '...',
			runtimeCaching: [
			  {
				urlPattern: /^https:\/\/www\.gstatic\.com\/firebasejs\/8\.10\.1\//,
				handler: 'StaleWhileRevalidate',
				options: {
				  cacheName: 'firebase-js',
				  expiration: {
					maxEntries: 10,
					maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
				  },
				},
			  },
			  {
				urlPattern: /^http:\/\/localhost:5000\/firebase-messaging-sw\.js$/,
				handler: 'NetworkFirst',
				options: {
				  cacheName: 'firebase-messaging-sw',
				},
			  },
			],
		  }), */
    ],
};
