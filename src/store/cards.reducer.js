const initialState = [];

function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CARDS":
      return action.payload;
    default:
      return state;
  }
}

export default cardsReducer;
