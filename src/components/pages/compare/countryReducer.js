// countryReducer.js

// Import action types
import { 
  FETCH_COUNTRIES_SUCCESS, 
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRY_LIST_SUCCESS,
  FETCH_COUNTRY_LIST_FAILURE
} from './countryActions';

// Initial state untuk reducer
const initialState = {
  country1: null,
  country2: null,
  countryList: [],
  error: null
};

// Reducer function
const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Ketika fetch countries berhasil
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        country1: action.payload.country1,
        country2: action.payload.country2,
        error: null
      };
    // Ketika fetch countries gagal
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    // Ketika fetch country list berhasil
    case FETCH_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        countryList: action.payload,
        error: null
      };
    // Ketika fetch country list gagal
    case FETCH_COUNTRY_LIST_FAILURE:
      return {
        ...state,
        error: action.error
      };
    // Default case: kembalikan state tanpa perubahan
    default:
      return state;
  }
};

export default countryReducer;