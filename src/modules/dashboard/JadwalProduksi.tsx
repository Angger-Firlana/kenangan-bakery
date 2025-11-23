// src/modules/dashboard/JadwalProduksi.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Box, Calendar, FileText, ShoppingBag, User, Plus, Clock } from 'lucide-react';
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

const jadwalData = [
  { id: 1, produk: 'Croissant', jumlah: 100, tanggal: '2025-01-20', waktu: '06:00', status: 'Selesai' },
  { id: 2, produk: 'Roti Tawar', jumlah: 150, tanggal: '2025-01-20', waktu: '07:00', status: 'Proses' },
  { id: 3, produk: 'Donut Coklat', jumlah: 80, tanggal: '2025-01-20', waktu: '08:00', status: 'Menunggu' },
  { id: 4, produk: 'Red Velvet Cake', jumlah: 20, tanggal: '2025-01-21', waktu: '06:00', status: 'Menunggu' },
  { id: 5, produk: 'Cheese Bread', jumlah: 100, tanggal: '2025-01-21', waktu: '07:00', status: 'Menunggu' },
];

export default function JadwalProduksi() {
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
          <h2>Jadwal Produksi</h2>
          <button className="kb-user-btn">
            <User size={20} />
          </button>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Jadwal Produksi Harian</h3>
              <button className="kb-btn-primary">
                <Plus size={18} />
                Tambah Jadwal
              </button>
            </div>

            <div className="kb-schedule-grid">
              {jadwalData.map((jadwal) => (
                <div key={jadwal.id} className="kb-schedule-card">
                  <div className="kb-schedule-header">
                    <h4>{jadwal.produk}</h4>
                    <span className={`kb-status ${getStatusClass(jadwal.status)}`}>
                      {jadwal.status}
                    </span>
                  </div>
                  <div className="kb-schedule-body">
                    <div className="kb-schedule-info">
                      <Calendar size={16} />
                      <span>{jadwal.tanggal}</span>
                    </div>
                    <div className="kb-schedule-info">
                      <Clock size={16} />
                      <span>{jadwal.waktu}</span>
                    </div>
                    <div className="kb-schedule-info">
                      <Package size={16} />
                      <span>{jadwal.jumlah} pcs</span>
                    </div>
                  </div>
                  <div className="kb-schedule-footer">
                    <button className="kb-btn-sm edit">Edit</button>
                    <button className="kb-btn-sm delete">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}