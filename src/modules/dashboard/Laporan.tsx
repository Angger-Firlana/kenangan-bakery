// src/modules/dashboard/Laporan.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Box, Calendar, FileText, ShoppingBag, User, Download, TrendingUp, TrendingDown, Filter } from 'lucide-react';
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

const cabangList = ['Semua Cabang', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Tangerang'];
const tahunList = ['2025', '2024', '2023', '2022'];
const bulanList = [
  'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const laporanData = [
  { bulan: 'Januari', tahun: 2025, cabang: 'Jakarta Pusat', penjualan: 125500000, biaya: 45200000, produksi: 5230, pesanan: 342 },
  { bulan: 'Januari', tahun: 2025, cabang: 'Jakarta Selatan', penjualan: 98000000, biaya: 38500000, produksi: 4100, pesanan: 285 },
  { bulan: 'Desember', tahun: 2024, cabang: 'Jakarta Pusat', penjualan: 112000000, biaya: 42000000, produksi: 4850, pesanan: 298 },
  { bulan: 'Desember', tahun: 2024, cabang: 'Jakarta Barat', penjualan: 87500000, biaya: 35200000, produksi: 3650, pesanan: 245 },
  { bulan: 'November', tahun: 2024, cabang: 'Jakarta Pusat', penjualan: 98500000, biaya: 39000000, produksi: 4120, pesanan: 265 },
  { bulan: 'November', tahun: 2024, cabang: 'Tangerang', penjualan: 76200000, biaya: 31500000, produksi: 3200, pesanan: 210 },
  { bulan: 'Oktober', tahun: 2024, cabang: 'Jakarta Pusat', penjualan: 105200000, biaya: 40500000, produksi: 4500, pesanan: 285 },
  { bulan: 'Oktober', tahun: 2024, cabang: 'Jakarta Selatan', penjualan: 92300000, biaya: 37800000, produksi: 3890, pesanan: 258 },
];

export default function Laporan() {
  const [user, setUser] = useState<UserData | null>(null);
  const [filterCabang, setFilterCabang] = useState('Semua Cabang');
  const [filterTahun, setFilterTahun] = useState('2025');
  const [filterBulan, setFilterBulan] = useState('Semua Bulan');
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

  // Filter data berdasarkan pilihan
  const filteredData = laporanData.filter(item => {
    const cabangMatch = filterCabang === 'Semua Cabang' || item.cabang === filterCabang;
    const tahunMatch = item.tahun.toString() === filterTahun;
    const bulanMatch = filterBulan === 'Semua Bulan' || item.bulan === filterBulan;
    return cabangMatch && tahunMatch && bulanMatch;
  });

  // Hitung total
  const totalPenjualan = filteredData.reduce((sum, item) => sum + item.penjualan, 0);
  const totalBiaya = filteredData.reduce((sum, item) => sum + item.biaya, 0);
  const totalKeuntungan = totalPenjualan - totalBiaya;
  const totalProduksi = filteredData.reduce((sum, item) => sum + item.produksi, 0);
  const totalPesanan = filteredData.reduce((sum, item) => sum + item.pesanan, 0);
  const persentaseKeuntungan = totalPenjualan > 0 ? ((totalKeuntungan / totalPenjualan) * 100).toFixed(1) : '0';

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
            title={user?.fullName || 'Profile'}
          >
            {user?.fullName ? (
              <div className="kb-user-avatar">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User size={20} />
            )}
          </button>
        </header>

        <div className="kb-content">
          {/* Filter Section */}
          <div className="kb-filter-section">
            <div className="kb-filter-header">
              <div className="kb-filter-title">
                <Filter size={20} />
                <h3>Filter Laporan</h3>
              </div>
            </div>
            <div className="kb-filter-controls">
              <div className="kb-filter-group">
                <label>Tahun</label>
                <select 
                  className="kb-select" 
                  value={filterTahun}
                  onChange={(e) => setFilterTahun(e.target.value)}
                >
                  {tahunList.map(tahun => (
                    <option key={tahun} value={tahun}>{tahun}</option>
                  ))}
                </select>
              </div>
              <div className="kb-filter-group">
                <label>Bulan</label>
                <select 
                  className="kb-select" 
                  value={filterBulan}
                  onChange={(e) => setFilterBulan(e.target.value)}
                >
                  {bulanList.map(bulan => (
                    <option key={bulan} value={bulan}>{bulan}</option>
                  ))}
                </select>
              </div>
              <div className="kb-filter-group">
                <label>Cabang</label>
                <select 
                  className="kb-select" 
                  value={filterCabang}
                  onChange={(e) => setFilterCabang(e.target.value)}
                >
                  {cabangList.map(cabang => (
                    <option key={cabang} value={cabang}>{cabang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Summary Cards with Profit/Loss */}
          <div className="kb-summary-grid">
            <div className="kb-summary-card">
              <div className="kb-summary-header">
                <span className="kb-summary-label">Total Penjualan</span>
                <span className="kb-summary-change up">
                  <TrendingUp size={16} />
                  +12%
                </span>
              </div>
              <p className="kb-summary-value">Rp {totalPenjualan.toLocaleString()}</p>
            </div>

            <div className="kb-summary-card">
              <div className="kb-summary-header">
                <span className="kb-summary-label">Total Biaya</span>
                <span className="kb-summary-change down">
                  <TrendingDown size={16} />
                  -5%
                </span>
              </div>
              <p className="kb-summary-value">Rp {totalBiaya.toLocaleString()}</p>
            </div>

            <div className="kb-summary-card kb-profit-card">
              <div className="kb-summary-header">
                <span className="kb-summary-label">Keuntungan Bersih</span>
                <span className={`kb-summary-change ${totalKeuntungan >= 0 ? 'up' : 'down'}`}>
                  {totalKeuntungan >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {persentaseKeuntungan}%
                </span>
              </div>
              <p className={`kb-summary-value ${totalKeuntungan >= 0 ? 'profit' : 'loss'}`}>
                Rp {totalKeuntungan.toLocaleString()}
              </p>
            </div>

            <div className="kb-summary-card">
              <div className="kb-summary-header">
                <span className="kb-summary-label">Total Produksi</span>
                <span className="kb-summary-change up">
                  <TrendingUp size={16} />
                  +8%
                </span>
              </div>
              <p className="kb-summary-value">{totalProduksi.toLocaleString()} pcs</p>
            </div>
          </div>

          {/* Table Section */}
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Detail Laporan - {filterBulan} {filterTahun}</h3>
              <button className="kb-btn-primary">
                <Download size={18} />
                Export PDF
              </button>
            </div>

            {filteredData.length > 0 ? (
              <div className="kb-table-wrapper">
                <table className="kb-table">
                  <thead>
                    <tr>
                      <th>Bulan</th>
                      <th>Cabang</th>
                      <th>Penjualan</th>
                      <th>Biaya</th>
                      <th>Keuntungan/Rugi</th>
                      <th>Produksi</th>
                      <th>Pesanan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((laporan, idx) => {
                      const keuntungan = laporan.penjualan - laporan.biaya;
                      const isProfit = keuntungan >= 0;
                      return (
                        <tr key={idx}>
                          <td>{laporan.bulan} {laporan.tahun}</td>
                          <td>{laporan.cabang}</td>
                          <td>Rp {laporan.penjualan.toLocaleString()}</td>
                          <td>Rp {laporan.biaya.toLocaleString()}</td>
                          <td>
                            <span className={`kb-profit-indicator ${isProfit ? 'profit' : 'loss'}`}>
                              {isProfit ? '↑' : '↓'} Rp {Math.abs(keuntungan).toLocaleString()}
                            </span>
                          </td>
                          <td>{laporan.produksi.toLocaleString()} pcs</td>
                          <td>{laporan.pesanan}</td>
                          <td>
                            <button className="kb-btn-sm view">Lihat Detail</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="kb-table-total">
                      <td colSpan={2}><strong>Total</strong></td>
                      <td><strong>Rp {totalPenjualan.toLocaleString()}</strong></td>
                      <td><strong>Rp {totalBiaya.toLocaleString()}</strong></td>
                      <td>
                        <strong className={`kb-profit-indicator ${totalKeuntungan >= 0 ? 'profit' : 'loss'}`}>
                          {totalKeuntungan >= 0 ? '↑' : '↓'} Rp {Math.abs(totalKeuntungan).toLocaleString()}
                        </strong>
                      </td>
                      <td><strong>{totalProduksi.toLocaleString()} pcs</strong></td>
                      <td><strong>{totalPesanan}</strong></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="kb-empty-state">
                <FileText size={48} />
                <p>Tidak ada data laporan untuk filter yang dipilih</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}