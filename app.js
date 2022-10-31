const express = require('express');

//express app
const app = express();

//listen for request
app.listen(3000);


app.get('/', (req, res) => {
    res.sendFile('./views1/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views1/about.html', { root: __dirname });
});

//redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})
//404
app.use((req, res) => {
 res.status(404).sendFile('./views1/404.html', { root: __dirname });
});

