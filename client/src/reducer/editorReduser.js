export default (state, action) => {
  switch (action.type) {
    case 'UPLOADING_DATA':
      return action.payload
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}