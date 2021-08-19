const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const multer = require("multer")
const crypto = require('crypto')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.zip') //Appending .jpg
  }
})


const app = express()


app
  .use(express.json({ extended: true }))
  .use(multer({ storage: storage }).single("file"))
  .use('/api/auth', require('./routes/auth.routes'))
  .use('/api/upload', require('./routes/upload.routes'))
  .use('/api/packsLibrary', require('./routes/packsLibrary.routes'))
  .use(require('cors')())


const DEV_SERVER_PORT = config.get('port') || 5000

const chatData = new Map([
  ['users', new Map()],
  ['messages', []]
])
const lobbys = []


const server = app.listen(DEV_SERVER_PORT, () => console.log(`App has been started on port ${DEV_SERVER_PORT}`))
const io = require('socket.io')(server)

// пути и сокеты для них
const chat = io.of('/main')
const lobby = io.of('/playingRoom')

chat.on('connection', (socket) => {
  socket.on('CHAT:JOIN', ({ nickname, roomId }) => {
    chatData.get('users').set(nickname, socket.id)
    console.log('пользователь зашел в чат', socket.id)
    chat.emit('LOBBY:INFO', lobbys)
  })
  socket.on('CHAT:NEW_MESSAGE', ({ nickname, text, avatarLink }) => {
    const obj = {
      nickname,
      text,
      avatarLink
    }
    chatData.get('messages').push(obj)
    chat.emit('CHAT:NEW_MESSAGE', obj)
  })
  socket.on('disconnect', function () {
    console.log('A user disconnected', socket.id);
  });
  chat.emit('LOBBY:INFO', lobbys)
  socket.on('LOBBY:GET_LOBBYS', () => {
    console.log('getLOBBYS')
    chat.emit('LOBBY:INFO', lobbys)
  })
})



lobby.on('connection', (socket) => {
  console.log('lobby')
  socket.on('LOBBY:JOIN', ({ lobbyData, nickname, avatarLink }) => {
    let lobbyId = crypto.createHmac('sha1', lobbyData.packId)
      .update(lobbyData.name)
      .digest('hex')
    socket.join(lobbyId)
    lobbys.push(lobbyData)
    lobbys[lobbys.length - 1]['lobbyId'] = lobbyId
    
    // TODO: refactor
    if (lobbys[lobbys.length - 1]['players']) {
      lobbys[lobbys.length - 1]['players'] = [
        lobbys[lobbys.length - 1]['players'], { nickname, avatarLink }
      ]
    } else {
      lobbys[lobbys.length - 1]['players'] = [{ nickname, avatarLink }]
    }

    lobby.to(lobbyId).emit('LOBBY:JOIN', lobbys)
    chat.emit('LOBBY:INFO', lobbys)
  })
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
