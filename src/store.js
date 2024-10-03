import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countryReducer from './components/pages/compare/countryReducer';

// Menggabungkan semua reducer yang digunakan di aplikasi
const rootReducer = combineReducers({
  country: countryReducer
});

// Membuat store dengan middleware thunk untuk operasi asinkron
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
