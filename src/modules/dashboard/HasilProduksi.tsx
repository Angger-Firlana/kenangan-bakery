// src/modules/dashboard/HasilProduksi.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, Box, Calendar, FileText, ShoppingBag, User, Plus, Search } from 'lucide-react';
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

const products = [
  { id: 1, name: 'Croissant', kategori: 'Pastry', stok: 150, harga: 25000 },
  { id: 2, name: 'Roti Tawar', kategori: 'Roti', stok: 200, harga: 18000 },
  { id: 3, name: 'Red Velvet Cake', kategori: 'Cake', stok: 30, harga: 85000 },
  { id: 4, name: 'Donut Coklat', kategori: 'Pastry', stok: 80, harga: 12000 },
  { id: 5, name: 'Cheese Bread', kategori: 'Roti', stok: 120, harga: 15000 },
];

export default function HasilProduksi() {
  const [user, setUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2>Hasil Produksi</h2>
          <button className="kb-user-btn">
            <User size={20} />
          </button>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Daftar Produk</h3>
              <div className="kb-card-actions">
                <div className="kb-search-box">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari produk..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="kb-btn-primary">
                  <Plus size={18} />
                  Tambah Produk
                </button>
              </div>
            </div>

            <div className="kb-table-wrapper">
              <table className="kb-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Stok</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <tr key={product.id}>
                      <td>{idx + 1}</td>
                      <td>{product.name}</td>
                      <td><span className="kb-badge">{product.kategori}</span></td>
                      <td>{product.stok}</td>
                      <td>Rp {product.harga.toLocaleString()}</td>
                      <td>
                        <div className="kb-table-actions">
                          <button className="kb-btn-sm edit">Edit</button>
                          <button className="kb-btn-sm delete">Hapus</button>
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