import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

// Komponen utama untuk halaman Home
const Home = () => {
  // Menggunakan useState untuk mendefinisikan state:
  // 'countries' menyimpan daftar negara yang diambil dari API
  // 'loading' menyimpan status loading (benar jika data masih dalam proses diambil)
  // 'error' menyimpan pesan error jika ada masalah saat mengambil data
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect digunakan untuk mengambil data negara dari API setelah komponen di-render
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Set status loading menjadi true sebelum mulai mengambil data
        setLoading(true);
        // Mengambil data dari API restcountries.com menggunakan axios
        const response = await axios.get('https://restcountries.com/v3.1/all');

        // Memproses data yang diambil: memetakan ke array yang lebih ringkas, hanya mengambil nama, kode, populasi, dan bendera negara
        const sortedCountries = response.data
          .map(country => ({
            name: country.name.common, // Nama negara
            code: country.cca2,        // Kode negara (misalnya ID, US)
            population: country.population, // Populasi negara
            flag: country.flags.svg    // URL gambar bendera negara
          }))
          // Mengurutkan negara berdasarkan populasi dari terbesar ke terkecil
          .sort((a, b) => b.population - a.population);

        // Setelah berhasil mengambil dan mengolah data, set state 'countries' dengan hasilnya
        setCountries(sortedCountries);
        setLoading(false); // Set loading menjadi false karena pengambilan data selesai
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Jika terjadi error, set state 'error' dengan pesan kesalahan
        setError('Failed to fetch country data');
        setLoading(false); // Set loading menjadi false meskipun ada error
      }
    };

    // Memanggil fungsi fetchCountries ketika komponen pertama kali di-render
    fetchCountries();
  }, []); // [] sebagai dependency array berarti useEffect hanya dipanggil sekali saat komponen pertama kali dimuat

  // Fungsi untuk memformat populasi menjadi lebih mudah dibaca (misalnya dari 1.000.000 menjadi 1M)
  const formatPopulation = (population) => {
    if (population >= 1_000_000_000) return (population / 1_000_000_000).toFixed(1) + 'B'; // Untuk populasi di atas 1 miliar
    if (population >= 1_000_000) return (population / 1_000_000).toFixed(1) + 'M';        // Untuk populasi di atas 1 juta
    if (population >= 1_000) return (population / 1_000).toFixed(1) + 'K';                // Untuk populasi di atas 1 ribu
    return population; // Jika populasi di bawah 1 ribu, tampilkan angka aslinya
  };

  // Menampilkan pesan loading jika data masih diambil
  if (loading) return <p>Loading...</p>;

  // Menampilkan pesan error jika ada kesalahan dalam pengambilan data
  if (error) return <p>{error}</p>;

  // Jika data berhasil diambil, tampilkan dalam bentuk tabel
  return (
    <div className="home-container">
      {/* Bagian kiri layar yang menampilkan judul dan quote */}
      <div className="left-container">
        <h2 className="rank-text">Country</h2>
        <h1 className="population-text"> Rank Population 2024</h1>
        <p className="qoute">"Activism works. So what I'm telling you to do now, is to act.<br/>
        Because no one is too small to make a difference."</p>
      </div>

      {/* Bagian kanan layar yang menampilkan tabel populasi negara */}
      <div className="table-container">
        <table className="population-table">
          <thead>
            <tr>
              <th>No</th> 
              <th>Flag</th> 
              <th>Country</th> 
              <th>Code</th> 
              <th>Population</th> 
            </tr>
          </thead>
          <tbody>
            {/* Menampilkan 195 negara teratas dalam tabel berdasarkan populasi */}
            {countries.slice(0, 195).map((country, index) => (
              <tr key={country.code}>
                <td>{index + 1}</td> {/* Menampilkan nomor urut negara */}
                <td><img src={country.flag} alt={`Flag of ${country.name}`} className="flag-icon" /></td> {/* Menampilkan bendera negara */}
                <td>{country.name}</td> {/* Menampilkan nama negara */}
                <td>{country.code}</td> {/* Menampilkan kode negara */}
                <td>{formatPopulation(country.population)}</td> {/* Menampilkan populasi negara dalam format yang sudah diformat */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
