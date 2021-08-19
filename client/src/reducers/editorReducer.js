import {createRounds, createThemes, createQuestions, createFinalThemes} from '../DataCreators/Pack'

const editorReducer = (state, action) => {
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
                      ...createQuestions(action.value - theme.questions.length, theme.questions.length)
                    ]
                  }
                })

              ]
            }
          })
        ],
      }
    case 'ON_CHANGE_QUESTION:CONTENT':
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
                      questions: theme.questions.map((question, j) => {
                        if (action.questionIndex === j) {
                          return {
                            ...question,
                            [action.name]: action.value
                          }
                        } else {
                          return question
                        }
                      })
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
    case 'ON_CHANGE_QUESTION:ANSWER':
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
                      questions: theme.questions.map((question, j) => {
                        if (action.questionIndex === j) {
                          return {
                            ...question,
                            answer: {
                              ...question.answer,
                              [action.name]: action.value
                            }

                          }
                        } else {
                          return question
                        }
                      })
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
    case 'ON_CHANGE_FINAL_QUESTION:CONTENT':
      return {
        ...state,
        finalRound: {
          ...state.finalRound,
          themes: [
            ...state.finalRound.themes.map((item, index) => {
              if (index === action.themeIndex) {
                return {
                  ...item,
                  question: {
                    ...item.question,
                    [action.name]: action.value
                  }
                }
              } else {
                return item
              }
            })
          ]
        }
      }
    case 'ON_CHANGE_FINAL_QUESTION:ANSWER':
      return {
        ...state,
        finalRound: {
          ...state.finalRound,
          themes: [
            ...state.finalRound.themes.map((item, index) => {
              if (index === action.themeIndex) {
                return {
                  ...item,
                  question: {
                    ...item.question,
                    answer: {
                      ...item.question.answer,
                      [action.name]: action.value
                    }
                  }
                }
              } else {
                return item
              }
            })
          ]
        }
      }
    case 'ON_CHANGE_FINAL_THEME:QUANTITY':
      return {
        ...state,
        [action.name]: action.value,
        finalRound: {
          ...state.finalRound,
          themes: [
            ...state.finalRound.themes,
            ...createFinalThemes(action.value - state.finalRound.themes.length)
          ]

        }
      }
    default:
      return state
  }
}

export default editorReducer