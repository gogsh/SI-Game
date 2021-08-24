import { createGameStatus, createQuestionStatus, createPlayers, createPlayer } from '../DataCreators/Lobby'
import { lobbySocket } from '../socket'

const lobbyReducer = (lobbyState, action) => {
  console.log(lobbyState)
  const gameStatus = lobbyState.gameStatus
  switch (action.type) {
    case 'LOBBY_DATA':
      return {
        ...action.payload,
      }
    case 'LEADER_IN':      
      const test = {
        ...lobbyState,
        gameStatus: {
          ...gameStatus,
          leader: { 
            ...action.payload 
          }
        }
      }
      console.log(test)
      lobbySocket.emit('LOBBY:UPDATE_STATE', test)  
      return {
        ...test
      }
    case 'UPDATE_STATE':
      return {
        ...action.payload
      }
    default:
      return lobbyState
  }
}

export default lobbyReducer