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
    chat.emit('LOBBY:INFO', lobbys)
  })
})



lobby.on('connection', (socket) => {
  socket.on('LOBBY:CREATE', ({ lobbyData, nickname, avatarLink, userId }) => {
    console.log(`LOBBY: user create lobby`)
    let lobbyId = crypto.createHmac('sha1', lobbyData.packId)
      .update(lobbyData.name)
      .digest('hex')
    socket.join(lobbyId)
    lobbyData.gameStatus.players.push(createPlayer(nickname, avatarLink, userId))
    lobbyData.lobbyId = lobbyId
    lobbys.push(lobbyData)
    console.log(lobbys)

    lobby.to(lobbyId).emit('LOBBY:JOIN', getLobby(lobbys, lobbyId))
    chat.emit('LOBBY:INFO', lobbys)
  })

  socket.on('LOBBY:JOIN', ({ lobbyId, nickname, avatarLink, userId }) => {
    console.log(`LOBBY: user connected`)
    socket.join(lobbyId)
    lobbys.forEach((lobby, index) => {
      if (lobby.lobbyId === lobbyId) {
        lobbys[index].gameStatus.players.push(createPlayer(nickname, avatarLink, userId))
      }
    })
    console.log(lobbys)
    lobby.to(lobbyId).emit('LOBBY:JOIN', getLobby(lobbys, lobbyId))
    chat.emit('LOBBY:INFO', lobbys)
  })

  socket.on('LOBBY:SLOT_SELECTED', ({ lobbyId, userId, value }) => {
    console.log(`LOBBY:SLOT_SELECTED`)
    console.log(lobbyId, userId, value)
    changePlayerInfo(lobbys, lobbyId, userId, value)
    console.log(getLobby(lobbys, lobbyId).gameStatus.players)
    lobby.to(lobbyId).emit('LOBBY:SLOT_SELECTED', getLobby(lobbys, lobbyId))
  })

  socket.on('LOBBY:DISCONNECT', ({ lobbyId, userId }) => {
    socket.leave(lobbyId)
    console.log(lobbyId, userId)
    deletePlayer(lobbys, lobbyId, userId)
    // console.log('A', a)
    lobby.to(lobbyId).emit('LOBBY:UPDATE_STATE', getLobby(lobbys, lobbyId))
  })
})

function createPlayer(nickname, avatarLink, userId) {
  return {
    nickname: nickname,
    avatarLink: avatarLink,
    score: 0,
    userId: userId,
    slotNumber: null,
  }
}

function getLobby(lobbys, lobbyId) {
  let result
  lobbys.forEach(lobby => {
    if (lobby.lobbyId === lobbyId) {
      result = lobby
      return
    }
  })
  return result
}

function changePlayerInfo(lobbys, lobbyId, userId, value) {
  lobbys.forEach((lobby, index) => {
    if (lobby.lobbyId === lobbyId) {
      lobby.gameStatus.players.forEach((player, i) => {
        if (player.userId === userId) {
          Object.assign(lobbys[index].gameStatus.players[i], value)
          return
        }
      })
      return
    }
  })
}

function deletePlayer(lobbys, lobbyId, userId) {
  lobbys.forEach((lobby, index) => {
    if (lobby.lobbyId === lobbyId) {
      lobby.gameStatus.players.forEach((player, i) => {
        if (player.userId === userId) {
          lobbys[index].gameStatus.players.splice(i, 1)
        }
      })
      return
    }
  })
}


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
