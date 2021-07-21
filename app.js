const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()


app
  .use(express.json({ extended: true }))
  .use('/api/auth', require('./routes/auth.routes'))
  .use(require('cors')())

const DEV_SERVER_PORT = config.get('port') || 5000

const chatData = new Map([
  ['users', new Map()],
  ['messages', []]
])


const server = app.listen(DEV_SERVER_PORT, () => console.log(`App has been started on port ${DEV_SERVER_PORT}`))
const io = require('socket.io')(server)

// пути и сокеты для них
const chat = io.of('/main')

chat.on('connection', (socket) => {
  console.log('пользователь зашел в чат', socket.id)

  socket.on('CHAT:JOIN', ({nickname, roomId}) => {
    chatData.get('users').set(nickname, socket.id)
  })

  socket.on('CHAT:NEW_MESSAGE', ({nickname, text}) => {
    const obj = {
      nickname,
      text
    }
    chatData.get('messages').push(obj) 
    chat.emit('CHAT:NEW_MESSAGE', obj) 
  })
     
  

  socket.on('disconnect', function () {
    console.log('A user disconnected', socket.id);
  });
})



async function start() {
  console.log('startinng...')
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })  

  } catch (e) {
    console.log('server error', e.message)
    process.exit(1)
  }
}

start()
