import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import About from "./components/pages/About";
import News from "./components/pages/News";
import Home from "./components/pages/Home";
import Compare from "./components/pages/compare/Compare";
import ComparisonResults from "./components/pages/compare/ComparisonResults"; // Mengimpor ComparisonResults

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/compare/results" element={<ComparisonResults />} /> {/* Routing untuk ComparisonResults */}
        <Route path="/compare/:code1/n/:code2" element={<ComparisonResults />} /> {/* Rute dinamis */}
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
