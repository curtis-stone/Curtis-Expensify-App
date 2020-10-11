// entry -> output
//entry = our app start point. Where does everything kick off?
//output = where to put our final bundle file
// provide these in module.exports

const path = require("path"); // node function
// console.log(path.join(__dirname, 'public')); //dirname is the function directory to the folder on your computer
// public is the folder we want to put the bundle into
// this console call returns the path tp the destination we want in public
// must use require since node is not being used and I don't have access to import

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const loader = require("sass-loader");
const webpack = require("webpack");

// process.env.NODE_ENV: environment variable that stores environment we're in. auto done in Heroku and set to "Produciton"
// we will set this to change with our environent (test script to set up env variable in package.json)
// will use npm module: (cross-env) and (dotenv)
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // either test environment (package.json) or string prod in heroku, ELSE it is 'development environment
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css"); // makes new file w/ the new instance called styles.css

  console.log("env:", env); // logs env to console to say if we are in development or productions
  return {
    entry: ["babel-polyfill", "./src/app.js"], // tells webpack where to start // pollyfill to have jsx run on older browsers
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          // rules is an array t define how we want to use our loader
          loader: "babel-loader", // what loader to use
          test: /\.js$/, // REGULAR EXPRESSION to only target files that End in .js
          //test = what files we want the rule to run on
          exclude: /node_modules/, // exclude 'babel-loader' from running in node_modules folder
        },
        {
          test: /\.s?css$/, // ends in .scss. "?" in middle makes scss optional and search for both css and scss!
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
            // use defines an array pf loaders instead of just 1
            // get css-loader from npmjs.com
            // get style-loader from npmjs.com to get styles to show up in browser (only for inline styling w/o new file being created w/ extract)
            // yarn add style-loader@0.18.2 css-loader@0.28.4
            //yarn add sass-loader@6.0.6 node-sass@4.5.3
            // node converts scss to readable css
          }),
        },
      ],
    },
    // THEN set up a configuration file for this loader
    plugins: [
      CSSExtract, // extracts css files into it's own file
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],

    devtool: isProduction ? "source-map" : "inline-source-map", // source map to find errors in our code. See webpack.com devtools
    // source-maps also makes debugging much easier ^
    // source-map is external file and better for productions (slows down speed slightly)
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true, // handles routing through client side and tells dev-server to always serve index.html file for all unknown routes/ 404's
      publicPath: "/dist/",
    }, // absolute path to where server can find our content
  };
  // module.exports is a node thing that exposes something (in this case a node object)
  //to another file
  // webpack grabs it, runs it, and gets access to whatever is in this object

  // to use babel to convert JSX into JS, we must use a Loader
  // more complex thing in webpack, customizes the behavior of webpack when it sees a certain file
  // install babel-core & babel-loader -> yarn add babel-core babel-loader
};
