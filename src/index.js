const express = require('express');
const app = express();
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.listen(3000, async () => {
    console.log('Server started on port 3000');
});
