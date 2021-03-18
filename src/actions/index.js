// import { REACT_APP_API_URL } from "../constants/api";

export const getCards = (payload) => {
  return {
    type: "GET_CARDS",
    payload,
  };
};

export const getCardsFromAPI = (deckId) => {
  return (dispatch) => {
    const cardsQueryUrl = `${process.env.REACT_APP_API_URL}/decks/${deckId}/cards`;
    fetch(cardsQueryUrl)
      .then((response) => response.json())
      .then((cardsJson) => {
        dispatch(getCards(cardsJson));
      });
  };
};
