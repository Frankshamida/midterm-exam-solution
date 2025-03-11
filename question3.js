/*
2. Node.js and Express
Create a simple Express.js server that listens on port 3000.
Define a route /test that sends a JSON response { message: 'Express is working! Write your full name' }.
Hint: Focus on basic Express.js setup and routing.
*/


const express = require('express');
const app = express();
const port = 3000;

app.get('/test', (req, res) => {
    res.send('Express is working! Frank Dweezel D. Gomez');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});