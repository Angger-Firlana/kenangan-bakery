// src/modules/dashboard/Pesanan.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Box, Calendar, FileText, ShoppingBag, User, Plus, Search, Eye } from 'lucide-react';
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

const pesananData = [
  { id: 'ORD001', pelanggan: 'Budi Santoso', produk: 'Red Velvet Cake', jumlah: 2, total: 170000, tanggal: '2025-01-20', status: 'Selesai' },
  { id: 'ORD002', pelanggan: 'Siti Rahayu', produk: 'Croissant', jumlah: 10, total: 250000, tanggal: '2025-01-20', status: 'Proses' },
  { id: 'ORD003', pelanggan: 'Ahmad Wijaya', produk: 'Donut Coklat', jumlah: 24, total: 288000, tanggal: '2025-01-20', status: 'Menunggu' },
  { id: 'ORD004', pelanggan: 'Maya Putri', produk: 'Cheese Bread', jumlah: 15, total: 225000, tanggal: '2025-01-19', status: 'Selesai' },
  { id: 'ORD005', pelanggan: 'Rini Kusuma', produk: 'Roti Tawar', jumlah: 5, total: 90000, tanggal: '2025-01-19', status: 'Selesai' },
];

export default function Pesanan() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
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

  const filteredPesanan = pesananData.filter(p => {
    const matchSearch = p.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Selesai': return 'success';
      case 'Proses': return 'info';
      case 'Menunggu': return 'warning';
      default: return '';
    }
  };

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
          <h2>Pesanan</h2>
          <button 
  className="kb-user-btn"
  onClick={() => navigate('/memories-bakery/profil')}
>
  <User size={20} />
</button>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Daftar Pesanan</h3>
              <div className="kb-card-actions">
                <div className="kb-search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari pesanan..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="kb-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Proses">Proses</option>
                  <option value="Selesai">Selesai</option>
                </select>
                <button className="kb-btn-primary">
                  <Plus size={18} />
                  Tambah Pesanan
                </button>
              </div>
            </div>

            <div className="kb-table-wrapper">
              <table className="kb-table">
                <thead>
                  <tr>
                    <th>ID Pesanan</th>
                    <th>Pelanggan</th>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Total</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPesanan.map((pesanan) => (
                    <tr key={pesanan.id}>
                      <td><strong>{pesanan.id}</strong></td>
                      <td>{pesanan.pelanggan}</td>
                      <td>{pesanan.produk}</td>
                      <td>{pesanan.jumlah}</td>
                      <td>Rp {pesanan.total.toLocaleString()}</td>
                      <td>{pesanan.tanggal}</td>
                      <td>
                        <span className={`kb-status ${getStatusClass(pesanan.status)}`}>
                          {pesanan.status}
                        </span>
                      </td>
                      <td>
                        <div className="kb-table-actions">
                          <button className="kb-btn-sm view">
                            <Eye size={14} />
                          </button>
                          <button className="kb-btn-sm edit">Edit</button>
                        </div>
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