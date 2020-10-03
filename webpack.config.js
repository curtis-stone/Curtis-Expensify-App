// entry -> output
//entry = our app start point. Where does everything kick off?
//output = where to put our final bundle file
// provide these in module.exports 


const path = require('path'); // node function
// console.log(path.join(__dirname, 'public')); //dirname is the function directory to the folder on your computer
// public is the folder we want to put the bundle into
// this console call returns the path tp the destination we want in public
module.exports = {
    entry: './src/app.js', // tells webpack where to start
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{ // rules is an array t define how we want to use our loader
            loader: 'babel-loader', // what loader to use
            test: /\.js$/,  // REGULAR EXPRESSION to only target files that End in .js
            //test = what files we want the rule to run on
            exclude: /node_modules/ // exclude 'babel-loader' from running in node_modules folder
        }, {
            test: /\.s?css$/, // ends in .scss. "?" in middle makes scss optional and search for both css and scss!
            use: ['style-loader', 
                    'css-loader',
                     'sass-loader',
                    ] // use defines an array pf loaders instead of just 1
            // get css-loader from npmjs.com
            // get style-loader from npmjs.com to get styles to show up in browser
            // yarn add style-loader@0.18.2 css-loader@0.28.4
            //yarn add sass-loader@6.0.6 node-sass@4.5.3
            // node converts scss to readable css
        }
        ]
    },
        // THEN set up a configuration file for this loader
    devtool: 'cheap-module-eval-source-map', // source map to find errors in our code. See webpack.com devtools
                                // source-maps also makes debugging much easier ^
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true // handles routing through client side and tells dev-server to always serve index.html file for all unknown routes/ 404's
    } // absolute path to where server can find our content
};
// module.exports is a node thing that exposes something (in this case a node object) 
//to another file
// webpack grabs it, runs it, and gets access to whatever is in this object 

// to use babel to convert JSX into JS, we must use a Loader
// more complex thing in webpack, customizes the behavior of webpack when it sees a certain file
// install babel-core & babel-loader -> yarn add babel-core babel-loader


