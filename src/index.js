const express = require('express');
const app = express();
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const { User } = require('./models/index');
const {Role} = require('./models/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.listen(PORT, async () => {
    if (process.env.DB_SYNC) {
        db.sequelize.sync({ alter: true });
    }
});
