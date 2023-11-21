const mongoose = require('mongoose');

const connectionURL = process.env.MONGO_CONNECTION_URL

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    dbName:process.env.MONGO_DB,
})
.then(success => console.log('Database conected'))