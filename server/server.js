// IMPORTS
const express = require('express'); // node way to import
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// WHAT TO SERVE
app.use(express.static(publicPath));
// .static() = function that takes the path to the dicrectory as its argument

// FALLBACK ROUTING
app.get('*', (req, res) => { 
    res.sendFile(path.join(publicPath, 'index.html'));
 })
// * = match all unmatched routes
// 2nd arg is a function to process all unandled requests -> send back to index.html file in public directory



// START UP THE SERVER
app.listen(port, () => { console.log('server is up!') }); 
// app.listen(3000, () => { console.log('server is up!') }); replaced w/ port const for heroku deployment
// 3000 is a port that express will use
// callback function that calls when server is up