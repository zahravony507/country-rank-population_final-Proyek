import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountries, fetchCountryList } from './countryActions';
import './Compare.css';
import earthImage from '../../../foto1.png';

const Compare = () => {
  const [country1, setCountry1] = useState(''); // Input negara pertama
  const [country2, setCountry2] = useState(''); // Input negara kedua
  const [suggestions1, setSuggestions1] = useState([]); // Saran negara pertama
  const [suggestions2, setSuggestions2] = useState([]); // Saran negara kedua

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil data daftar negara dari Redux
  const { countryList, error } = useSelector((state) => state.country);

  // Memuat daftar negara saat komponen di-render pertama kali
  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchCountries(country1, country2));

    // Jika tidak ada error, navigasi ke halaman perbandingan
    if (!error) {
      const formattedCountry1 = country1.replace(/\s+/g, '-');
      const formattedCountry2 = country2.replace(/\s+/g, '-');
      navigate(`/compare/${formattedCountry1}/n/${formattedCountry2}`);
    }
  };

  // Fungsi untuk menangani perubahan input dan memberikan saran negara
  const handleInputChange = (e, setCountry, setSuggestions, excludeCountry = '') => {
    const value = e.target.value;
    setCountry(value);

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions(countryList
        .filter(country => regex.test(country.name) && country.name !== excludeCountry) // Exclude negara yang dipilih di kolom lainnya
        .slice(0, 5)); // Batas maksimal 5 saran
    } else {
      setSuggestions([]);
    }
  };

  // Fungsi untuk menangani klik pada saran negara
  const handleSuggestionClick = (suggestion, setCountry, setSuggestions) => {
    setCountry(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="compare-container">
      <h1>Form Country Compare</h1>
      <p className="quote">
            "Would you like to compare two countries? Please provide two country names"
          </p>
      <div className="content-wrapper">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Input Negara 1 */}
            <div className="input-wrapper">
              <input
                type="text"
                value={country1}
                onChange={(e) => handleInputChange(e, setCountry1, setSuggestions1)}
                placeholder="Type country name 1"
                className="input-field"
              />
              {suggestions1.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions1.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion, setCountry1, setSuggestions1)}>
                      {suggestion.name} ({suggestion.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Input Negara 2 */}
            <div className="input-wrapper">
              <input
                type="text"
                value={country2}
                onChange={(e) => handleInputChange(e, setCountry2, setSuggestions2, country1)} // Exclude country1 dari saran di negara 2
                placeholder="Type country name 2"
                className="input-field"
              />
              {suggestions2.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions2.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion, setCountry2, setSuggestions2)}>
                      {suggestion.name} ({suggestion.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Compare;
