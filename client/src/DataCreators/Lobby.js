export function createGameStatus(status, players, gameState) {  
  // ‘prepairing’ - подготовка к старту игры
  // 'choose-who-start'
  // ‘answering’ - время на ответ игрока
  // ‘choosing’ - время на выбор вопроса
  // ‘waiting’ - время на право ответить
  // showing round - показываем номер раунда (2-3 сек)
  // showing themes - показываем темы (4-5 секунд)
  // pause
  return {
    status: status || 'prepairing',
    pause: false,
    currentRound: '',
    currentTheme: '',
    currentQuestion: '',
    whosTurn: '',
    whosAnswer: '',
    isLoading: true,
    question: createQuestionStatus(),
    players: createPlayers(players || []),
    leader: null,
    ...gameState
  }
}


export function createQuestionStatus(question) {
  if (question) {
    return {
      questionData: {
        question: question.questionContent,
        answer: question.answer._text,
        price: question.price
      },
      isRight: null
    }
  } else {
    return {
      questionData: {
        question: '',
        answer: '',
        price: 0
      },
      isRight: null
    }
  }
}

export function createFinalStatus() {

}

export function createPlayers(players) {
  return players.map((player) => {
    return createPlayer(player)
  })
}

export function createPlayer(player) {
  return {
    name: player.nickname,
    avatarLink: player.avatarLink,
    score: 0,
    isLeader: undefined,
    slotNumber: null,
  }
}
