const messageReducer = (messages, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return [
        ...messages,
        action.payload
      ]
    default:
      return messages
  }
}

export default messageReducer