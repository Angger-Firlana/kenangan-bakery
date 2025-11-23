import { Routes, Route } from "react-router-dom";
import LandingPage from "../modules/landing-page/landing-page.tsx";
import Login from "../modules/login_register/Login.tsx";
import Register from "../modules/login_register/Register.tsx";

// Dashboard pages
import Dashboard from "../modules/dashboard/Home.tsx";
import HasilProduksi from "../modules/dashboard/HasilProduksi.tsx";
import BahanBaku from "../modules/dashboard/BahanBaku.tsx";
import JadwalProduksi from "../modules/dashboard/JadwalProduksi.tsx";
import Laporan from "../modules/dashboard/Laporan.tsx";
import Pesanan from "../modules/dashboard/Pesanan.tsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Landing */}
        <Route path="/memories-bakery/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/memories-bakery/login" element={<Login />} />
        <Route path="/memories-bakery/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/memories-bakery/dashboard" element={<Dashboard />} />
        <Route path="/memories-bakery/dashboard/hasil-produksi" element={<HasilProduksi />} />
        <Route path="/memories-bakery/dashboard/bahan-baku" element={<BahanBaku />} />
        <Route path="/memories-bakery/dashboard/jadwal-produksi" element={<JadwalProduksi />} />
        <Route path="/memories-bakery/dashboard/laporan" element={<Laporan />} />
        <Route path="/memories-bakery/dashboard/pesanan" element={<Pesanan />} />
      </Routes>
    </div>
  );
}

export default App;
