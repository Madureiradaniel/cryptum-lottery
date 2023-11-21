require('dotenv').config()

const app = require('./server')
const port = process.env.PORT

app.listen(port, () => { console.log(`Server\'s fired up and running on port ${port}!`) })