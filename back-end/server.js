require('dotenv').config()

const express = require('express')
const { exec } = require('child_process')
const cors = require('cors')

// express app
const app = express()

app.use(express.json())
app.use(cors())

app.post('/runProgram', (req, res) => {
    const {feedAmount} = req.body;
    console.log(`runProgram feedAmount ${feedAmount}`);

    // Run program here
    exec(`python3 test.py ${feedAmount}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.status(200).send('Program executed successfully');
    });
});

// log the type of request to the web app e.g. POST, GET, etc.
app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

app.get('/', (request, response) => {
    response.json({mssg: "Welcome to the app"})
})

// listen for requests
app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("listening on port", process.env.PORT);
})