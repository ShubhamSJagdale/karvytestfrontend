import { ADD_COUNTRY, REMOVE_COUNTRY, ADD_COUNTRYS } from "../action/action-types";

const initialState = [];

const country = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTRYS:
      return [...state, ...action.payload];
    case ADD_COUNTRY:
      console.log("patlo", [...state, action.payload])
      return [...state, action.payload];
    case REMOVE_COUNTRY:
      return state.filter((item) => item.rank !== action.payload);
    default:
      return state;
  }
};

export default country;
