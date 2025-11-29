// src/modules/dashboard/Home.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Package, Box, Calendar, FileText, ShoppingBag, User, ChevronLeft, ChevronRight } from 'lucide-react';
import './Dashboard.css';

interface UserData {
  fullName?: string;
  email?: string;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/memories-bakery/dashboard' },
  { id: 'hasil-produksi', label: 'Hasil Produksi', icon: Package, path: '/memories-bakery/dashboard/hasil-produksi' },
  { id: 'bahan-baku', label: 'Bahan Baku', icon: Box, path: '/memories-bakery/dashboard/bahan-baku' },
  { id: 'jadwal-produksi', label: 'Jadwal Produksi', icon: Calendar, path: '/memories-bakery/dashboard/jadwal-produksi' },
  { id: 'laporan', label: 'Laporan', icon: FileText, path: '/memories-bakery/dashboard/laporan' },
  { id: 'pesanan', label: 'Pesanan', icon: ShoppingBag, path: '/memories-bakery/dashboard/pesanan' },
];

const carouselImages = [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800',
  'https://images.unsplash.com/photo-1517433670267-30f41c09b307?w=800',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
];

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovering]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="kb-container">
      

      <main className="kb-main">
        <header className="kb-header">
          <h2>Home</h2>
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
          <div 
            className="kb-carousel-improved"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="kb-carousel-wrapper">
              {carouselImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`kb-carousel-slide ${idx === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
            
            <button 
              className={`kb-carousel-btn prev ${isHovering ? 'show' : ''}`}
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className={`kb-carousel-btn next ${isHovering ? 'show' : ''}`}
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </button>

            <div className="kb-carousel-dots">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`kb-dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>

          <div className="kb-stats-grid">
            <div className="kb-stat-card">
              <h3>Top Product</h3>
              <div className="kb-stat-content">
                <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150" alt="Croissant" className="kb-stat-img" />
                <div className="kb-stat-info">
                  <h4>Croissant</h4>
                  <p className="kb-stat-number">230.923</p>
                  <p className="kb-stat-label">Penjualan</p>
                </div>
              </div>
            </div>

            <div className="kb-stat-card">
              <h3>Top Branch</h3>
              <div className="kb-stat-content">
                <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150" alt="Branch" className="kb-stat-img" />
                <div className="kb-stat-info">
                  <h4>Jakarta Pusat</h4>
                  <p className="kb-stat-number">450.250</p>
                  <p className="kb-stat-label">Penjualan</p>
                </div>
              </div>
            </div>

            <div className="kb-stat-card">
              <h3>Total Customer</h3>
              <div className="kb-stat-content">
                <div className="kb-stat-icon">👥</div>
                <div className="kb-stat-info">
                  <h4>Active</h4>
                  <p className="kb-stat-number">1.234</p>
                  <p className="kb-stat-label">Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}