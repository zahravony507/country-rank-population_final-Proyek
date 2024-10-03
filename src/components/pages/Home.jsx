import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  // State untuk menyimpan data negara, status loading, dan error
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data negara dari API
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://restcountries.com/v3.1/all');
        // Memproses dan mengurutkan data negara berdasarkan populasi
        const sortedCountries = response.data
          .map(country => ({
            name: country.name.common,
            code: country.cca2,
            population: country.population
          }))
          .sort((a, b) => b.population - a.population);
        setCountries(sortedCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError('Failed to fetch country data');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Fungsi untuk memformat tampilan populasi
  const formatPopulation = (population) => {
    if (population >= 1_000_000_000) return (population / 1_000_000_000).toFixed(1) + 'B';
    if (population >= 1_000_000) return (population / 1_000_000).toFixed(1) + 'M';
    if (population >= 1_000) return (population / 1_000).toFixed(1) + 'K';
    return population;
  };

  // Menampilkan pesan loading atau error jika diperlukan
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      {/* Bagian kiri dengan judul dan kutipan */}
      <div className="left-container">
        <h2 className="rank-text">Rank</h2>
        <h1 className="population-text">Population Country 2024 </h1>
        <p className="qoute">"Activism works. So what I'm telling you to do now, is to act.<br/>
        Because no one is too small to make a difference."</p>
      </div>
      {/* Bagian kanan dengan tabel populasi negara */}
      <div className="table-container">
        <table className="population-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Country</th>
              <th>Code</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {/* Menampilkan 195 negara teratas berdasarkan populasi */}
            {countries.slice(0, 195).map((country, index) => (
              <tr key={country.code}>
                <td>{index + 1}</td>
                <td>{country.name}</td>
                <td>{country.code}</td>
                <td>{formatPopulation(country.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;