const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks.router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log('listen on port:', PORT);
});