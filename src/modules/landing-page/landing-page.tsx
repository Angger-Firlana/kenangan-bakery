import { Search, User, ShoppingCart, Star, ArrowRight, Facebook, Twitter, Instagram, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(`/memories-bakery/${path}`);
  };

  const handleOrderClick = () => {
    goTo("login");
  };

  const products = [
    { id: 1, name: "Red Velvet & Cream Cheese (500g)", rating: 4.5, reviews: 62 },
    { id: 2, name: "Chocolate Lava Cake (450g)", rating: 4.8, reviews: 41 },
    { id: 3, name: "Tiramisu Classic (500g)", rating: 4.7, reviews: 75 },
    { id: 4, name: "Matcha Swiss Roll (400g)", rating: 4.6, reviews: 63 },
    { id: 5, name: "Carrot Cake Deluxe (550g)", rating: 4.9, reviews: 89 }
  ];

  const socialIcons = [
    { Icon: Facebook, name: 'facebook' },
    { Icon: Twitter, name: 'twitter' },
    { Icon: Instagram, name: 'instagram' },
    { Icon: Github, name: 'github' },
    { Icon: Linkedin, name: 'linkedin' }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="header-logo" onClick={() => goTo("")}>
          Kenangan <span>Bakery</span>
        </div>
        
        <nav className="header-nav">
          <button onClick={() => goTo("")} className="nav-link">Home</button>
          <button onClick={() => goTo("categories")} className="nav-link">Categories</button>
          <button onClick={() => goTo("about")} className="nav-link">About Us</button>
          <button onClick={() => goTo("contact")} className="nav-link">Contact Us</button>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Cari kue favorit..." />
            <button className="search-btn"><Search size={16} /></button>
          </div>

          {/* GO TO LOGIN */}
          <button className="icon-btn" onClick={() => goTo("login")}>
            <User size={20} />
          </button>

          <button className="icon-btn cart-btn" onClick={() => goTo("login")}>
            <ShoppingCart size={20} />
            <span className="cart-badge">3</span>
          </button>

          <button 
            className="icon-btn mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => goTo("")} className="mobile-nav-link">Home</button>
            <button onClick={() => goTo("categories")} className="mobile-nav-link">Categories</button>
            <button onClick={() => goTo("about")} className="mobile-nav-link">About Us</button>
            <button onClick={() => goTo("contact")} className="mobile-nav-link">Contact Us</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Setiap Gigitan<br />
              <span className="gradient-text">Kenangan Manis</span>
            </h1>
            <p>
              Kami menghadirkan kelezatan autentik dalam setiap kue, roti, dan pastry.
              Dibuat dengan bahan premium dan penuh cinta untuk momen spesial Anda.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleOrderClick}>
                Order Sekarang <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => goTo("categories")}>
                Lihat Semua Menu
              </button>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="hero-image-main"><span>🎂</span></div>
            <div className="hero-badge hero-badge-left">🥐</div>
            <div className="hero-badge hero-badge-right">🍰</div>
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="best-selling">
        <div className="section-header">
          <span className="section-badge">🏆 BEST SELLER</span>
          <h2>Kue Favorit Pelanggan</h2>
          <p>Produk terbaik kami yang selalu dinantikan dan menjadi favorit pelanggan setia Kenangan Bakery</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span>🧁</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <span className="review-count">{product.reviews} reviews</span>
                </div>
                <button className="add-to-cart-btn">+ Keranjang</button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="btn-secondary">
            Lihat Semua Produk <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Premium Quality Section */}
      <section className="premium-quality">
        <div className="premium-content">
          <span className="section-badge">✨ PREMIUM QUALITY</span>
          <h2>Segar Langsung<br />dari Oven Kami</h2>
          <p>Setiap produk kami dibuat dengan bahan-bahan pilihan terbaik langsung dari petani lokal. Chef berpengalaman kami mengolahnya dengan teknik modern namun tetap mempertahankan cita rasa tradisional yang autentik.</p>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🌱</div>
              <span>Bahan Organik</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👨‍🍳</div>
              <span>Chef Profesional</span>
            </div>
          </div>
          <button className="text-link">
            Telusuri Proses Kami <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="premium-image">
          <span>👨‍🍳</span>
          <div className="chef-badge">
            <div className="chef-name">Chef Antonio</div>
            <div className="chef-title">Head Pastry Chef</div>
          </div>
        </div>
      </section>

      {/* Experience Store Section */}
      <section className="experience-store">
        <div className="experience-image">
          <span>☕</span>
          <div className="coffee-badge">
            <div className="coffee-title">Coffee Pairing</div>
            <div className="coffee-subtitle">Perfect Match</div>
          </div>
        </div>
        
        <div className="experience-content">
          <span className="section-badge section-badge-blue">🏪 EXPERIENCE STORE</span>
          <h2>Nikmati Moment<br />Spesial Bersama Kami</h2>
          <p>Kunjungi toko kami yang nyaman dan pilih favoritmu langsung dari display. Nikmati dengan secangkir kopi spesial atau teh premium sambil bersantai di atmosfer yang hangat dan mengundang.</p>
          <div className="amenities">
            {['Free WiFi', 'Cozy Atmosphere', 'Meeting Space'].map((item) => (
              <span key={item} className="amenity-badge">{item}</span>
            ))}
          </div>
          <button className="text-link">
            Cari Lokasi Terdekat <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Custom Order Banner */}
      <section className="custom-order-banner">
        <div className="banner-content">
          <h2>Pemesanan Kue Custom & Catering</h2>
          <p>Untuk acara spesial, wedding, atau kebutuhan corporate. Hubungi kami untuk konsultasi gratis</p>
          <div className="banner-buttons">
            <button className="btn-white" onClick={handleOrderClick}>
              WhatsApp Kami <ArrowRight size={16} />
            </button>
            <button className="btn-outline-white">Lihat Katalog</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonial-quote">❝</div>
        <span className="testimonial-label">Testimoni Pelanggan</span>
        <blockquote>
          "Kue tanpa telur di sini luar biasa enak!
          Pesan kue KitKat untuk ulang tahun anak,
          hasilnya memukau dan semua tamu suka!"
        </blockquote>
        <div className="testimonial-author">
          <div className="author-avatar"></div>
          <div className="author-name">Darren Dunlap</div>
          <div className="author-title">CEO & Founder di Flex.co</div>
          <div className="author-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="star-filled" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">Kenangan Bakery</div>
              <p>Menghadirkan kebahagiaan dalam setiap gigitan sejak 2015. Komitmen kami untuk kualitas dan cita rasa terbaik.</p>
              <div className="social-links">
                {socialIcons.map(({ Icon, name }) => (
                  <a key={name} href="#" className="social-link">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Tautan Cepat</h3>
              {['Beranda', 'Kategori', 'Tentang Kami', 'Hubungi Kami'].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>

            <div className="footer-links">
              <h3>Layanan</h3>
              {['Katering', 'Kue Custom', 'Delivery', 'Party Package'].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>

            <div className="footer-links">
              <h3>Kontak</h3>
              <span>Jl. Bakery No. 123, Jakarta</span>
              <span>+62 812 0000 0000</span>
              <span>hello@kenanganbakery.com</span>
              <span>10.00 - 22.00 WIB</span>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>© 2025 Kenangan Bakery. Semua hak cipta dilindungi.</div>
            <div className="footer-legal">
              {['Privasi', 'Syarat', 'Kebijakan'].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}