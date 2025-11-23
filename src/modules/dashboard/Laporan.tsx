// src/modules/dashboard/Laporan.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Box, Calendar, FileText, ShoppingBag, User, Download, TrendingUp, TrendingDown } from 'lucide-react';
import './Dashboard.css';

interface UserData {
  fullName?: string;
  email?: string;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/memories-bakery/dashboard' },
  { id: 'hasil-produksi', label: 'Hasil Produksi', icon: Package, path: '/memories-bakery/dashboard/hasil-produksi' },
  { id: 'bahan-baku', label: 'Bahan Baku', icon: Box, path: '/memories-bakery/dashboard/bahan-baku' },
  { id: 'jadwal-produksi', label: 'Jadwal Produksi', icon: Calendar, path: '/memories-bakery/dashboard/jadwal-produksi' },
  { id: 'laporan', label: 'Laporan', icon: FileText, path: '/memories-bakery/dashboard/laporan' },
  { id: 'pesanan', label: 'Pesanan', icon: ShoppingBag, path: '/memories-bakery/dashboard/pesanan' },
];

const summaryData = [
  { label: 'Total Penjualan', value: 'Rp 125.500.000', change: '+12%', trend: 'up' },
  { label: 'Total Produksi', value: '5.230 pcs', change: '+8%', trend: 'up' },
  { label: 'Total Pesanan', value: '342', change: '+15%', trend: 'up' },
  { label: 'Bahan Terpakai', value: 'Rp 45.200.000', change: '-5%', trend: 'down' },
];

const laporanBulanan = [
  { bulan: 'Januari', penjualan: 125500000, produksi: 5230, pesanan: 342 },
  { bulan: 'Desember', penjualan: 112000000, produksi: 4850, pesanan: 298 },
  { bulan: 'November', penjualan: 98500000, produksi: 4120, pesanan: 265 },
  { bulan: 'Oktober', penjualan: 105200000, produksi: 4500, pesanan: 285 },
];

export default function Laporan() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    if (!isLoggedIn || !userData) {
      navigate('/memories-bakery/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <div className="kb-sidebar-header">
          <div className="kb-logo">
            <div className="kb-logo-icon">🍞</div>
            <div className="kb-logo-text">
              <h1>Kenangan Bakery</h1>
              <p>Setiap Rasa Memiliki Kenangan</p>
            </div>
          </div>
        </div>
        <nav className="kb-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`kb-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="kb-sidebar-footer">
          <p>KenanganBakery</p>
          <p>Reserved</p>
        </div>
      </aside>

      <main className="kb-main">
        <header className="kb-header">
          <h2>Laporan</h2>
          <button 
  className="kb-user-btn"
  onClick={() => navigate('/memories-bakery/profil')}
>
  <User size={20} />
</button>
        </header>

        <div className="kb-content">
          <div className="kb-summary-grid">
            {summaryData.map((item, idx) => (
              <div key={idx} className="kb-summary-card">
                <div className="kb-summary-header">
                  <span className="kb-summary-label">{item.label}</span>
                  <span className={`kb-summary-change ${item.trend}`}>
                    {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {item.change}
                  </span>
                </div>
                <p className="kb-summary-value">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Laporan Bulanan</h3>
              <button className="kb-btn-primary">
                <Download size={18} />
                Export PDF
              </button>
            </div>

            <div className="kb-table-wrapper">
              <table className="kb-table">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Total Penjualan</th>
                    <th>Total Produksi</th>
                    <th>Total Pesanan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanBulanan.map((laporan, idx) => (
                    <tr key={idx}>
                      <td>{laporan.bulan}</td>
                      <td>Rp {laporan.penjualan.toLocaleString()}</td>
                      <td>{laporan.produksi.toLocaleString()} pcs</td>
                      <td>{laporan.pesanan}</td>
                      <td>
                        <button className="kb-btn-sm view">Lihat Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}