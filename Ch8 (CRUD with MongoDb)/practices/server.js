require('dotenv').config();
const app = require('./app');
const dbConnection = require('./config/db.connection');

const PORT = process.env.PORT || 7000

dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})