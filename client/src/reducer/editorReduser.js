export default (state, action) => {
  switch (action.type) {
    case 'UPLOADING_DATA':
      return action.payload
    default:
      return state
  }
}