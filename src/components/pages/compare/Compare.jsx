// Import komponen dan fungsi yang diperlukan
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountries, fetchCountryList } from './countryActions';
import './Compare.css';
import earthImage from '../../../foto1.png';

const Compare = () => {
  // State untuk menyimpan nama negara yang diinput
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  
  // Hook untuk dispatch action dan navigasi
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Mengambil daftar negara dan error dari Redux store
  const { countryList, error } = useSelector((state) => state.country);

  // Mengambil daftar negara saat komponen dimount
  useEffect(() => {
    dispatch(fetchCountryList());
  }, [dispatch]);

  // Menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchCountries(country1, country2));

    if (!error) {
      // Memformat nama negara untuk URL
      const formattedCountry1 = country1.replace(/\s+/g, '-');
      const formattedCountry2 = country2.replace(/\s+/g, '-');

      // Navigasi ke halaman perbandingan
      navigate(`/compare/${formattedCountry1}/n/${formattedCountry2}`);
    }
  };

  return (
    <div className="compare-container">
      <h1>Form Country Compare </h1>
      <div className="content-wrapper">
        <div className="form-section">
          <p className="quote">
            "Would you like to compare two countries? Please provide two country names"
          </p>
          <form onSubmit={handleSubmit}>
            {/* Input untuk negara pertama */}
            <input
              type="text"
              value={country1}
              onChange={(e) => setCountry1(e.target.value)}
              placeholder="Type country name 1"
              className="input-field"
              list="countryList"
            />
            {/* Input untuk negara kedua */}
            <input
              type="text"
              value={country2}
              onChange={(e) => setCountry2(e.target.value)}
              placeholder="Type country name 2"
              className="input-field"
              list="countryList"
            />
            {/* Daftar saran negara */}
            <datalist id="countryList">
              {countryList.map((country) => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
        {/* Gambar ilustrasi */}
        <div className="illustration">
          <img src={earthImage} alt="Smiling Earth" className="earth-image" />
        </div>
      </div>
    </div>
  );
};

export default Compare;