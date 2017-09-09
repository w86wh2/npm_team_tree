/**
 * Created by Administrator on 2017/9/9 0009.
 */
var webpack = require('webpack');
var path = require('path');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'',
        filename:'vue-team-tree.js',
        libraryTarget: "umd",
        library: 'VueTeamTree'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                include:path.join(__dirname,'src'),
                exclude:/node_modules/,
                query:{
                    presets:['env']
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                include:path.join(__dirname,'src'),
                exclude:/node_modules/,
                options:{
                    loaders:{
                        scss:'style-loader!css-loader!postcss-loader!sass-loader'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]
}