// src/modules/profil/Profil.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Package, Box, Calendar, FileText, ShoppingBag, User, Edit, Mail, Phone, MapPin, Briefcase, LogOut } from 'lucide-react';
import './Profil.css';

interface UserData {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  position?: string;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/memories-bakery/dashboard' },
  { id: 'hasil-produksi', label: 'Hasil Produksi', icon: Package, path: '/memories-bakery/dashboard/hasil-produksi' },
  { id: 'bahan-baku', label: 'Bahan Baku', icon: Box, path: '/memories-bakery/dashboard/bahan-baku' },
  { id: 'jadwal-produksi', label: 'Jadwal Produksi', icon: Calendar, path: '/memories-bakery/dashboard/jadwal-produksi' },
  { id: 'laporan', label: 'Laporan', icon: FileText, path: '/memories-bakery/dashboard/laporan' },
  { id: 'pesanan', label: 'Pesanan', icon: ShoppingBag, path: '/memories-bakery/dashboard/pesanan' },
];

export default function Profil() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    position: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    if (!isLoggedIn || !userData) {
      navigate('/memories-bakery/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      fullName: parsedUser.fullName || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || '',
      position: parsedUser.position || 'Staff'
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/memories-bakery/login');
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
          <h2>Profil</h2>
          <button className="kb-user-btn active">
            <User size={20} />
          </button>
        </header>

        <div className="kb-content">
          <div className="profil-container">
            {/* Profile Header Card */}
            <div className="profil-header-card">
              <div className="profil-avatar-section">
                <div className="profil-avatar">
                  <User size={60} />
                </div>
                <div className="profil-header-info">
                  <h2>{formData.fullName || 'Nama Pengguna'}</h2>
                  <p className="profil-position">{formData.position || 'Staff'}</p>
                  <div className="profil-email">
                    <Mail size={16} />
                    <span>{formData.email}</span>
                  </div>
                </div>
              </div>
              <button className="profil-logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Keluar</span>
              </button>
            </div>

            {/* Profile Details Card */}
            <div className="profil-details-card">
              <div className="profil-card-header">
                <h3>Informasi Detail</h3>
                {!isEditing ? (
                  <button className="profil-edit-btn" onClick={() => setIsEditing(true)}>
                    <Edit size={16} />
                    <span>Edit Profil</span>
                  </button>
                ) : (
                  <div className="profil-edit-actions">
                    <button className="profil-cancel-btn" onClick={() => setIsEditing(false)}>
                      Batal
                    </button>
                    <button className="profil-save-btn" onClick={handleSave}>
                      Simpan
                    </button>
                  </div>
                )}
              </div>

              <div className="profil-info-grid">
                <div className="profil-info-item">
                  <div className="profil-info-label">
                    <User size={18} />
                    <span>Nama Lengkap</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="profil-input"
                    />
                  ) : (
                    <p className="profil-info-value">{formData.fullName || '-'}</p>
                  )}
                </div>

                <div className="profil-info-item">
                  <div className="profil-info-label">
                    <Mail size={18} />
                    <span>Email</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="profil-input"
                    />
                  ) : (
                    <p className="profil-info-value">{formData.email || '-'}</p>
                  )}
                </div>

                <div className="profil-info-item">
                  <div className="profil-info-label">
                    <Phone size={18} />
                    <span>Nomor Telepon</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="profil-input"
                      placeholder="Belum diisi"
                    />
                  ) : (
                    <p className="profil-info-value">{formData.phone || '-'}</p>
                  )}
                </div>

                <div className="profil-info-item">
                  <div className="profil-info-label">
                    <Briefcase size={18} />
                    <span>Posisi</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="profil-input"
                    />
                  ) : (
                    <p className="profil-info-value">{formData.position || '-'}</p>
                  )}
                </div>

                <div className="profil-info-item profil-info-full">
                  <div className="profil-info-label">
                    <MapPin size={18} />
                    <span>Alamat</span>
                  </div>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="profil-textarea"
                      placeholder="Belum diisi"
                      rows={3}
                    />
                  ) : (
                    <p className="profil-info-value">{formData.address || '-'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}