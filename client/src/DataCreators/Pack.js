export function createRounds(NoR, NoT, NoQ) {
  if (NoR <= 0) return []
  return new Array(NoR).fill().map(() => {
    return {
      RoundName: '',
      themes: createThemes(NoT, NoQ)
    }
  })
}

export function createThemes(NoT, NoQ) {
  if (NoT <= 0) return []
  return new Array(NoT).fill().map(() => {
    return {
      themeName: '',
      questions: createQuestions(NoQ)
    }
  })
}

export function createQuestions(NoQ, currentLength) {
  if (NoQ <= 0) return []
  return new Array(NoQ).fill().map((e, i) => {
    currentLength++
    return {
      questionContent: '',
      price: currentLength ? currentLength * 100 : (i + 1) * 100,
      answer: {
        text: ''
      }
    }    
  })
}

export function createFinalThemes(NoT) {
  if (NoT <= 0) return []
  return new Array(NoT).fill().map((e, i) => {
    return {
      themeName: '',
      question: {
        questionContent: '',
        price: (i + 1) * 100,
        answer: {
          text: ''
        }
      }
    }
  })
}