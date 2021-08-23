import { createGameStatus, createQuestionStatus, createPlayers, createPlayer } from '../DataCreators/Lobby'

const lobbyReducer = (lobbyState, action) => {
  switch (action.type) {
    case 'LOBBY_DATA':
      console.log(action.payload.players)
      return {
        ...action.payload,
        gameStatus: {
          ...createGameStatus(action.status, action.payload.players)
        }
      }
    default:
      return lobbyState
  }
}

export default lobbyReducer