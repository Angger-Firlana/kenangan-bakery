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
import DashboardLayout from "../shared/layout.tsx";

// Profil page
import Profil from "../modules/profil/Profil.tsx";

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
        <Route path="/memories-bakery/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/memories-bakery/dashboard/hasil-produksi" element={<DashboardLayout><HasilProduksi /></DashboardLayout>} />
        <Route path="/memories-bakery/dashboard/bahan-baku" element={<DashboardLayout><BahanBaku /></DashboardLayout>} />
        <Route path="/memories-bakery/dashboard/jadwal-produksi" element={<DashboardLayout><JadwalProduksi /></DashboardLayout>} />
        <Route path="/memories-bakery/dashboard/laporan" element={<DashboardLayout><Laporan /></DashboardLayout>} />
        <Route path="/memories-bakery/dashboard/pesanan" element={<DashboardLayout><Pesanan /></DashboardLayout>} />

        {/* Profil */}
        <Route path="/memories-bakery/profil" element={<Profil />} />
      </Routes>
    </div>
  );
}

export default App;