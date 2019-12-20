module.exports = {
	parser: 'postcss-safe-parser',
	plugins: {
		autoprefixer: { overrideBrowserslist: ['last 2 versions', 'iOS >= 10'] }
	}
}
