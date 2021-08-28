
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