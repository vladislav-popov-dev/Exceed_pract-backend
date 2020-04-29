const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

// Middleware
app.use(express.json({ extended: true }))
app.use(cors());

app.use('/', require('./routes/user.routes'))
app.use('/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  }
  catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()



