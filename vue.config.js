const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const pages = {}
const chromeName = ['newtab', 'routers']

chromeName.forEach(name => {
	pages[name] = {
		entry: `src/${name}/main.ts`,
		template: `src/${name}/index.html`,
		filename: `${name}.html`,
	}
})

module.exports = {
	pages,
	productionSourceMap: false,
	configureWebpack: {
		entry: {
			background: './src/background/main.ts',
		},
		output: {
			filename: 'js/[name].js',
		},
		plugins:[
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('src/plugins/manifest.json'),
						to: `${path.resolve('dist')}/manifest.json`,
					},
					{
						from: path.resolve('src/assets'),
						to: path.resolve('dist/assets'),
					},
				],
			}),
		],
	},
	// 配置 content.css
	css: {
		extract: {
			filename: 'css/[name].css',
		},
	},
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.output.filename('js/[name].js').end()
			config.output.chunkFilename('js/[name].js').end()
		}
	},
}
