const path = require('path');
	module.exports = {
	    // 入口文件
	    entry: {
          app: './src/action.js',
	    },
	    // 输出到dist文件夹, 文件名字为bundle.js
	    output: {
	        filename: 'bundle.js',
	        path: path.resolve(__dirname,'./dist')
	    },
	    devServer: {
	        port: 3000,
	        contentBase: './dist'
	    }
	}