
module.exports = lobbyHelper = {
  deletePlayer: function (lobbys, lobbyId, userId) {
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
  },
  changePlayerInfo: function (lobbys, lobbyId, userId, value) {
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
  },
  gameStart: function (lobbys, lobbyId, status) {
    lobbys.forEach((lobby, index) => {
      if(lobby.lobbyId === lobbyId) {
        lobbys[index].numberOfPlayers = lobbys[index].gameStatus.players.length
        lobbys[index].gameStatus.status = status
      }
    })
  },
  gameChangeStatus: function (lobbys, lobbyId, status) {
    lobbys.forEach((lobby, index) => {
      if(lobby.lobbyId === lobbyId) {
        lobbys[index].gameStatus.status = status
      }
    })
  },
  gameChooseWhoStart: function (lobbys, lobbyId, status, whoStart) {
    lobbys.forEach((lobby, index) => {
      if(lobby.lobbyId === lobbyId) {
        lobbys[index].gameStatus.status = status
        lobbys[index].gameStatus.whosTurn = lobbys[index].gameStatus.players[Number(whoStart)].slotNumber
        lobbys[index].gameStatus.currentRound = 1
      }
    })
  },
  getLobby: function (lobbys, lobbyId) {
    let result
    lobbys.forEach(lobby => {
      if (lobby.lobbyId === lobbyId) {
        result = lobby
        return
      }
    })
    return result
  },
  createPlayer: function (nickname, avatarLink, userId) {
    return {
      nickname: nickname,
      avatarLink: avatarLink,
      score: 0,
      userId: userId,
      slotNumber: null,
    }
  }
}