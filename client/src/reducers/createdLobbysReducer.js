const createdLobbysReducer = (lobbys, action) => {
  switch (action.type) {
    case 'ADD_LOBBYS':
      return [
        ...action.payload
      ]     
      
    default:
      return lobbys
  }
}

export default createdLobbysReducer