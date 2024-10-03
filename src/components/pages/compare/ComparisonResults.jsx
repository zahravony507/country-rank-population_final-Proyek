import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ComparisonResults.css';
import { fetchCountries } from './countryActions';
import earthImage from '../../../foto1.png';

const ComparisonResults = () => {
  // Mengambil kode negara dari URL
  const { code1, code2 } = useParams();
  const dispatch = useDispatch();
  // Mengambil data negara dan error dari Redux store
  const { country1, country2, error } = useSelector((state) => state.country);

  useEffect(() => {
    // Mengubah tanda hubung kembali menjadi spasi dalam kode negara
    const formattedCode1 = code1.replace(/-/g, ' ');
    const formattedCode2 = code2.replace(/-/g, ' ');

    // Memanggil action untuk mengambil data negara
    dispatch(fetchCountries(formattedCode1, formattedCode2));
  }, [dispatch, code1, code2]);

  // Teks konstan untuk header dan kutipan
  const HEADER_TEXT = "COUNTRY POPULATION COMPARISON ";
  const QUOTE_TEXT = " ";

  // Menampilkan pesan error jika terjadi kesalahan
  if (error) {
    return (
      <div className="error-message">
        Error: {error}
      </div>
    );
  }

  // Menampilkan pesan jika data negara belum tersedia
  if (!country1 || !country2) {
    return (
      <div className="no-data-message">
        Tidak ada data untuk ditampilkan. Silakan lakukan perbandingan terlebih dahulu.
      </div>
    );
  }

  // Fungsi untuk merender informasi negara
  const renderCountryInfo = (country) => (
    <div className="country-info">
      <img src={country.flags.svg} alt={`Bendera ${country.name.common}`} className="flag" />
      <h2>{country.name.common}</h2>
      <ul>
        <li><strong>Populasi:</strong> {country.population.toLocaleString()}</li>
        <li><strong>Luas Area:</strong> {country.area.toLocaleString()} km²</li>
        <li><strong>Ibukota:</strong> {country.capital}</li>
        <li><strong>Subregion:</strong> {country.subregion}</li>
        <li><strong>Bahasa:</strong> {Object.values(country.languages).join(', ')}</li>
      </ul>
    </div>
  );

  // Render komponen utama
  return (
    <div className="comparison-results">
      <h1>{HEADER_TEXT}</h1>
      <p>{QUOTE_TEXT}</p>
      <div className="comparison-content">
        <div className="earth-image-container">
          <img src={earthImage} alt="Smiling Earth" className="earth-image" />
        </div>
        <div className="results-content">
          <div className="countries-container">
            {renderCountryInfo(country1)}
            {renderCountryInfo(country2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResults;