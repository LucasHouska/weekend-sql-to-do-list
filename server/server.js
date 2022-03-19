const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const router = require('./routes/tasks.router.js')

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('server/public'));

app.use('/tasks', router)

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})