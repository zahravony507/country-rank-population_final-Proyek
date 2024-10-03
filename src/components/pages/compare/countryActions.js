import axios from 'axios';

// Action types
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';
export const FETCH_COUNTRY_LIST_SUCCESS = 'FETCH_COUNTRY_LIST_SUCCESS';
export const FETCH_COUNTRY_LIST_FAILURE = 'FETCH_COUNTRY_LIST_FAILURE';

// Action creator untuk mengambil detail dua negara
export const fetchCountries = (country1, country2) => async (dispatch) => {
  try {
    // Melakukan dua request secara bersamaan menggunakan Promise.all
    const [response1, response2] = await Promise.all([
      axios.get(`https://restcountries.com/v3.1/name/${country1}`),
      axios.get(`https://restcountries.com/v3.1/name/${country2}`)
    ]);

    // Dispatch action success dengan payload data negara
    dispatch({
      type: FETCH_COUNTRIES_SUCCESS,
      payload: { country1: response1.data[0], country2: response2.data[0] }
    });
  } catch (error) {
    // Dispatch action failure jika terjadi error
    dispatch({
      type: FETCH_COUNTRIES_FAILURE,
      error: error.message
    });
  }
};

// Action creator untuk mengambil daftar semua negara
export const fetchCountryList = () => async (dispatch) => {
  try {
    // Melakukan request untuk mendapatkan semua data negara
    const response = await axios.get('https://restcountries.com/v3.1/all');
    
    // Dispatch action success dengan payload daftar negara yang sudah diformat
    dispatch({
      type: FETCH_COUNTRY_LIST_SUCCESS,
      payload: response.data.map(country => ({
        name: country.name.common,
        code: country.cca2, // Menggunakan cca2 sebagai kode negara
      })),
    });
  } catch (error) {
    // Dispatch action failure jika terjadi error
    dispatch({
      type: FETCH_COUNTRY_LIST_FAILURE,
      error: error.message
    });
  }
};