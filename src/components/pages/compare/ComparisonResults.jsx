import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ComparisonResults.css';
import { fetchCountries } from './countryActions';
import earthImage from '../../../foto1.png';

// Komponen utama untuk menampilkan hasil perbandingan negara
const ComparisonResults = () => {
  // Mengambil parameter dari URL (code1 dan code2) melalui React Router
  const { code1, code2 } = useParams();

  // Mengambil fungsi dispatch dari Redux untuk memanggil action
  const dispatch = useDispatch();

  // Mengambil data negara dan error dari state Redux melalui selector
  const { country1, country2, error } = useSelector((state) => state.country);

  // useEffect digunakan untuk memanggil action fetchCountries ketika komponen ini di-render atau kode negara berubah
  useEffect(() => {
    // Mengganti karakter '-' dengan spasi dalam kode negara
    const formattedCode1 = code1.replace(/-/g, ' ');
    const formattedCode2 = code2.replace(/-/g, ' ');

    // Memanggil action fetchCountries untuk mengambil data negara berdasarkan kode negara
    dispatch(fetchCountries(formattedCode1, formattedCode2));
  }, [dispatch, code1, code2]); // Meng-define dependency untuk effect agar dijalankan setiap code1 atau code2 berubah

  // Konstanta untuk teks header dan quote
  const HEADER_TEXT = "Country Comparison ";
  const QUOTE_TEXT = "Discover key between selected countries";

  // Jika ada error dalam pengambilan data, tampilkan pesan error
  if (error) {
    return (
      <div className="error-message">
        Error: {error}
      </div>
    );
  }

  // Jika data negara belum tersedia, tampilkan pesan tidak ada data
  if (!country1 || !country2) {
    return (
      <div className="no-data-message">
        Tidak ada data untuk ditampilkan. Silakan lakukan perbandingan terlebih dahulu.
      </div>
    );
  }

  // Fungsi untuk menampilkan informasi detail dari negara
  const renderCountryInfo = (country) => (
    <div className="country-info">
      {/* Menampilkan gambar bendera negara */}
      <img src={country.flags.svg} alt={`Bendera ${country.name.common}`} className="flag" />
      {/* Menampilkan nama negara dan kodenya */}
      <h2>{country.name.common} ({country.cca3})</h2>
      {/* Daftar informasi negara */}
      <ul>
        <li><strong>Populasi:</strong> {country.population.toLocaleString()}</li>
        <li><strong>Luas Area:</strong> {country.area.toLocaleString()} km²</li>
        <li><strong>Ibukota:</strong> {country.capital}</li>
        <li><strong>Subregion:</strong> {country.subregion}</li>
        <li><strong>Bahasa:</strong> {Object.values(country.languages).join(', ')}</li>
      </ul>
    </div>
  );

  // JSX yang merender halaman hasil perbandingan
  return (
    <div className="comparison-results">
      {/* Menampilkan header dan quote */}
      <h1>{HEADER_TEXT}</h1>
      <p>{QUOTE_TEXT}</p>
      {/* Bagian utama yang berisi gambar bumi dan hasil perbandingan negara */}
      <div className="comparison-content">
        <div className="results-content">
          {/* Menampilkan informasi kedua negara yang dibandingkan */}
          <div className="countries-container">
            {renderCountryInfo(country1)}
            {renderCountryInfo(country2)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ekspor komponen agar dapat digunakan di tempat lain
export default ComparisonResults;
