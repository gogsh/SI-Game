export default (state, action) => {
  let rounds = state.rounds
  switch (action.type) {
    case 'UPLOADING_DATA':
      return action.payload
    case 'ON_CHANGE':
      return {
        ...state,
        [action.name]: action.value
      }
    case 'ON_CHANGE_ROUND:NAME':
      return {
        ...state,
        rounds: [
          ...rounds.map((round, index) => {
            if (action.roundIndex === index) {
              return {
                ...round,
                [action.name]: action.value
              }
            } else {
              return round
            }
          })
        ]
      }
    case 'ON_CHANGE_THEME:NAME':
      return {
        ...state,
        rounds: [
          ...rounds.map((round, index) => {
            if (action.roundIndex === index) {
              return {
                ...round,
                themes: round.themes.map((theme, i) => {
                  if (action.themeIndex === i) {
                    return {
                      ...theme,
                      [action.name]: action.value
                    }
                  } else {
                    return theme
                  }
                })
              }
            } else {
              return round
            }
          })
        ]
      }
    case 'ON_CHANGE_ROUND:QUANTITY':
      return {
        ...state,
        [action.name]: action.value,
        rounds: [
          ...rounds,
          ...createRounds(action.value - rounds.length, state.numberOfThemes, state.numberOfQuestions)
        ]
      }
    case 'ON_CHANGE_THEME:QUANTITY':
      return {
        ...state,
        [action.name]: action.value,
        rounds: [
          ...rounds.map(round => {
            return {
              ...round,
              themes: [
                ...round.themes,
                ...createThemes(action.value - round.themes.length, state.numberOfQuestions)
              ]
            }
          })
        ],
      }
    case 'ON_CHANGE_QUESTION:QUANTITY':
      return {
        ...state,
        [action.name]: action.value,
        rounds: [
          ...rounds.map(round => {
            return {
              ...round,
              themes: [
                ...round.themes.map(theme => {     
                  return {
                    ...theme,
                    questions: [
                      ...theme.questions,
                      ...createQuestions(action.value - theme.questions.length)
                    ]
                  }
                })
                
              ]
            }
          })
        ],
      }
    default:
      return state
  }
}


function createRounds(NoR, NoT, NoQ) {
  if (NoR <= 0) return []
  return new Array(NoR).fill().map(() => {
    return {
      RoundName: '',
      themes: createThemes(NoT, NoQ)
    }
  })
}

function createThemes(NoT, NoQ) {
  if (NoT <= 0) return []
  return new Array(NoT).fill().map(() => {
    return {
      themeName: '',
      questions: createQuestions(NoQ)
    }
  })
}

function createQuestions(NoQ) {
  if (NoQ <= 0) return []
  return new Array(NoQ).fill().map((e, i) => {
    return {
      questionContent: '',
      price: (i + 1) * 100,
      answer: {
        text: ''
      }
    }
  })
}