

const scrollReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SCROLL_POS':
      return action.val
      break;
    default:
      return state
  }
}
