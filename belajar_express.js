const express = require('express');
const app = express();
const port = 8080;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.post('/', (req, res) => {
    res.send('Hello Post');
});

app.get('/about', (req, res) => {
    res.send('Hello About');
});

// app.all('*', (req, res) => {
//     res.status(404).send('404 Not Found');
// });




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});