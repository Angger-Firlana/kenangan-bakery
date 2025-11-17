import { Search, User, ShoppingCart, Star, ArrowRight, Facebook, Twitter, Instagram, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import "./style.css";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Red Velvet & Cream Cheese (500g)", rating: 4.5, reviews: 62 },
    { id: 2, name: "Chocolate Lava Cake (450g)", rating: 4.8, reviews: 41 },
    { id: 3, name: "Tiramisu Classic (500g)", rating: 4.7, reviews: 75 },
    { id: 4, name: "Matcha Swiss Roll (400g)", rating: 4.6, reviews: 63 },
    { id: 5, name: "Carrot Cake Deluxe (550g)", rating: 4.9, reviews: 89 }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #fefaf6;
        }
        
        .nav-link:hover {
          color: #8b5a2f !important;
          transform: translateY(-1px);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #8b5a2f 0%, #a87c52 100%);
          box-shadow: 0 4px 15px rgba(139, 90, 47, 0.3);
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #7a4c26 0%, #956b44 100%);
          box-shadow: 0 6px 20px rgba(139, 90, 47, 0.4);
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          border: 2px solid #8b5a2f;
          color: #8b5a2f;
          background-color: transparent;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background-color: #8b5a2f;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(139, 90, 47, 0.3);
        }
        
        .hero-img:hover {
          transform: scale(1.05);
        }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-radius: 20px;
          overflow: hidden;
          background: white;
        }
        
        .product-card:hover {
          box-shadow: 0 20px 40px rgba(139, 90, 47, 0.15);
          transform: translateY(-8px) scale(1.02);
        }
        
        .text-link:hover {
          color: #a87c52 !important;
          transform: translateX(4px);
        }
        
        .footer-link:hover {
          color: #8b5a2f !important;
          transform: translateY(-1px);
        }
        
        .social-link {
          transition: all 0.3s ease;
          border-radius: 50%;
          padding: 8px;
        }
        
        .social-link:hover {
          background-color: #8b5a2f;
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(139, 90, 47, 0.3);
        }

        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #8b5a2f 0%, #d4a574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="min-h-screen bg-white w-full overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-white shadow-lg relative sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="text-2xl font-bold gradient-text">
            Kenangan <span className="font-semibold">Bakery</span>
          </div>
          
          <nav className="hidden md:flex gap-10">
            <a href="#" className="text-sm font-medium transition-all duration-300 nav-link" style={{ color: '#5d4037' }}>Home</a>
            <a href="#" className="text-sm font-medium transition-all duration-300 nav-link" style={{ color: '#5d4037' }}>Categories</a>
            <a href="#" className="text-sm font-medium transition-all duration-300 nav-link" style={{ color: '#5d4037' }}>About Us</a>
            <a href="#" className="text-sm font-medium transition-all duration-300 nav-link" style={{ color: '#5d4037' }}>Contact Us</a>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Cari kue favorit..."
                className="py-3 px-5 pr-12 border-2 rounded-full text-sm w-56 focus:outline-none focus:border-amber-700 transition-all"
                style={{ borderColor: '#e5e7eb', backgroundColor: '#fefaf6' }}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white rounded-full transition-all hover:scale-110" style={{ backgroundColor: '#8b5a2f' }}>
                <Search size={16} />
              </button>
            </div>
            <button className="p-3 rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-110" style={{ color: '#8b5a2f' }}>
              <User size={22} />
            </button>
            <button className="p-3 rounded-full hover:bg-amber-50 transition-all duration-300 hover:scale-110 relative" style={{ color: '#8b5a2f' }}>
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button className="p-3 rounded-full hover:bg-amber-50 transition-all duration-300 md:hidden" style={{ color: '#8b5a2f' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-2xl px-8 py-6 z-50 md:hidden border-t" style={{ borderColor: '#f3e5d8' }}>
              <a href="#" className="block py-4 text-sm font-medium border-b transition-all hover:pl-4" style={{ color: '#5d4037', borderColor: '#f3e5d8' }}>Home</a>
              <a href="#" className="block py-4 text-sm font-medium border-b transition-all hover:pl-4" style={{ color: '#5d4037', borderColor: '#f3e5d8' }}>Categories</a>
              <a href="#" className="block py-4 text-sm font-medium border-b transition-all hover:pl-4" style={{ color: '#5d4037', borderColor: '#f3e5d8' }}>About Us</a>
              <a href="#" className="block py-4 text-sm font-medium transition-all hover:pl-4" style={{ color: '#5d4037' }}>Contact Us</a>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section className="px-8 py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef7ed 0%, #fcefdf 100%)' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#5d4037' }}>
                Setiap Gigitan
                <br />
                <span className="gradient-text">Kenangan Manis</span>
              </h1>
              <p className="mb-8 leading-relaxed text-lg" style={{ color: '#8d6e63' }}>
                Kami menghadirkan kelezatan autentik dalam setiap kue, roti, dan pastry.
                <br />
                Dibuat dengan bahan premium dan penuh cinta untuk moment spesial Anda.
              </p>
              <div className="flex justify-center md:justify-start gap-5 flex-wrap">
                <button className="btn-primary text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
                  Order Sekarang
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary px-10 py-4 rounded-full font-semibold transition-all duration-300">
                  Lihat Semua Menu
                </button>
              </div>
            </div>
            <div className="relative floating-animation">
              <div className="w-full h-96 rounded-[40px] flex items-center justify-center shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #8b5a2f 0%, #d4a574 100%)' }}>
                <img
                  src="./images/5f0f80d4e5eea.jpg"
                  alt="Kue Lezat dari Kenangan Bakery"
                  className="w-full h-full object-cover rounded-[40px] transition-transform duration-700 hero-img"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #f3e5d8 0%, #e8d5c4 100%)' }}>
                <span className="text-3xl">🥐</span>
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #f3e5d8 0%, #e8d5c4 100%)' }}>
                <span className="text-2xl">🍰</span>
              </div>
            </div>
          </div>
        </section>

        {/* Best Selling Section */}
        <section className="px-8 py-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>
              🏆 BEST SELLER
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#5d4037' }}>Kue Favorit Pelanggan</h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#8d6e63' }}>
              Produk terbaik kami yang selalu dinantikan dan menjadi favorit pelanggan setia Kenangan Bakery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                <div className="h-48 flex items-center justify-center transition-transform duration-500 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200"></div>
                  <span className="text-6xl z-10 floating-animation">🧁</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-base mb-3" style={{ color: '#5d4037' }}>{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16}
                          style={{ fill: i < Math.floor(product.rating) ? '#f59e0b' : 'transparent', color: i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db' }}
                        />
                      ))}
                      <span className="text-sm ml-2 font-medium" style={{ color: '#8b5a2f' }}>{product.rating}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>
                      {product.reviews} reviews
                    </span>
                  </div>
                  <button className="w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>
                    + Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-secondary px-12 py-4 rounded-full inline-flex items-center gap-3 font-semibold transition-all duration-300">
              <span>Lihat Semua Produk</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Kami Membuatnya untuk Anda Section */}
        <section className="px-8 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>
                ✨ PREMIUM QUALITY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#5d4037' }}>
                Segar Langsung
                <br />
                dari Oven Kami
              </h2>
              <p className="mb-8 leading-relaxed text-lg" style={{ color: '#8d6e63' }}>
                Setiap produk kami dibuat dengan bahan-bahan pilihan terbaik langsung dari petani lokal. 
                Chef berpengalaman kami mengolahnya dengan teknik modern namun tetap mempertahankan 
                cita rasa tradisional yang autentik.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f3e5d8' }}>
                    <span className="text-xl">🌱</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#5d4037' }}>Bahan Organik</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f3e5d8' }}>
                    <span className="text-xl">👨‍🍳</span>
                  </div>
                  <span className="font-semibold" style={{ color: '#5d4037' }}>Chef Profesional</span>
                </div>
              </div>
              <button className="text-link font-semibold inline-flex items-center gap-3 transition-all duration-300 bg-transparent border-0 cursor-pointer text-lg" style={{ color: '#8b5a2f' }}>
                <span>Telusuri Proses Kami</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="h-[500px] rounded-[40px] flex items-center justify-center shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e5d8 0%, #e8d5c4 100%)' }}>
              <span className="text-8xl floating-animation">👨‍🍳</span>
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <div className="font-bold text-lg" style={{ color: '#5d4037' }}>Chef Antonio</div>
                <div className="text-sm" style={{ color: '#8b5a2f' }}>Head Pastry Chef</div>
              </div>
            </div>
          </div>
        </section>

        {/* Datang dan Pilih Bagian */}
        <section className="px-8 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="h-[500px] rounded-[40px] flex items-center justify-center shadow-2xl relative overflow-hidden order-2 md:order-1" style={{ background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e7f0 100%)' }}>
              <span className="text-8xl floating-animation">☕</span>
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <div className="font-bold text-lg" style={{ color: '#5d4037' }}>Coffee Pairing</div>
                <div className="text-sm" style={{ color: '#8b5a2f' }}>Perfect Match</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f4f8', color: '#2c5530' }}>
                🏪 EXPERIENCE STORE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#5d4037' }}>
                Nikmati Moment
                <br />
                Spesial Bersama Kami
              </h2>
              <p className="mb-8 leading-relaxed text-lg" style={{ color: '#8d6e63' }}>
                Kunjungi toko kami yang nyaman dan pilih favoritmu langsung dari display. 
                Nikmati dengan secangkir kopi spesial atau teh premium sambil bersantai 
                di atmosfer yang hangat dan mengundang.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>Free WiFi</div>
                <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>Cozy Atmosphere</div>
                <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#f3e5d8', color: '#8b5a2f' }}>Meeting Space</div>
              </div>
              <button className="text-link font-semibold inline-flex items-center gap-3 transition-all duration-300 bg-transparent border-0 cursor-pointer text-lg" style={{ color: '#8b5a2f' }}>
                <span>Cari Lokasi Terdekat</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Banner Pesanan Besar */}
        <section className="px-8 py-20 mx-8 mb-20 rounded-[40px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #8b5a2f 0%, #a87c52 100%)' }}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Pemesanan Kue Custom & Catering
            </h2>
            <p className="mb-8 leading-relaxed text-xl text-amber-100">
              Untuk acara spesial, wedding, atau kebutuhan corporate
              <br />
              Hubungi kami untuk konsultasi gratis
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button className="bg-white text-amber-900 px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                <span>WhatsApp Kami</span>
                <ArrowRight size={18} />
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-amber-900">
                Lihat Katalog
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </section>

        {/* Testimoni */}
        <section className="px-8 py-24 max-w-4xl mx-auto text-center relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">❝</div>
          <div className="text-sm font-semibold mb-4 tracking-wider uppercase" style={{ color: '#d4a574' }}>Testimoni Pelanggan</div>
          <blockquote className="text-4xl font-bold mb-10 leading-tight" style={{ color: '#5d4037' }}>
            "Kue tanpa telur di sini luar biasa enak! 
            <br />
            Pesan kue KitKat untuk ulang tahun anak,
            <br />
            hasilnya memukau dan semua tamu suka!"
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full mb-6 overflow-hidden border-4 border-white shadow-lg" style={{ background: 'linear-gradient(135deg, #8b5a2f 0%, #d4a574 100%)' }}></div>
            <div className="font-bold text-xl mb-2" style={{ color: '#5d4037' }}>Darren Dunlap</div>
            <div className="text-lg" style={{ color: '#8b5a2f' }}>CEO & Founder di Flex.co</div>
            <div className="flex gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 py-16 relative overflow-hidden" style={{ backgroundColor: '#2c1810' }}>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="text-2xl font-bold text-white mb-6">Kenangan Bakery</div>
                <p className="text-amber-200 leading-relaxed mb-6" >
                  Menghadirkan kebahagiaan dalam setiap gigitan sejak 2015. 
                  Komitmen kami untuk kualitas dan cita rasa terbaik.
                </p>
                <div className="flex gap-4">
                  {[Facebook, Twitter, Instagram, Github, Linkedin].map((Icon, index) => (
                    <a key={index} href="#" className="social-link transition-all duration-300" style={{ color: '#d4a574', backgroundColor: 'rgba(212, 165, 116, 0.1)' }}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Tautan Cepat</h3>
                <div className="space-y-4">
                  {['Beranda', 'Kategori', 'Tentang Kami', 'Hubungi Kami'].map((item) => (
                    <a key={item} href="#" className="footer-link block text-amber-200 transition-all duration-300 hover:translate-x-2">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Layanan</h3>
                <div className="space-y-4">
                  {['Katering', 'Kue Custom', 'Delivery', 'Party Package'].map((item) => (
                    <a key={item} href="#" className="footer-link block text-amber-200 transition-all duration-300 hover:translate-x-2">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Kontak</h3>
                <div className="space-y-4 text-amber-200">
                  <div>Jl. Bakery No. 123, Jakarta</div>
                  <div>+62 812 0000 0000</div>
                  <div>hello@kenanganbakery.com</div>
                  <div>10.00 - 22.00 WIB</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-8 border-t flex-wrap gap-4" style={{ borderColor: '#5d4037' }}>
              <div className="text-amber-200 text-sm">
                © 2025 Kenangan Bakery. Semua hak cipta dilindungi.
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-amber-200 transition-colors hover:text-white">Privasi</a>
                <a href="#" className="text-amber-200 transition-colors hover:text-white">Syarat</a>
                <a href="#" className="text-amber-200 transition-colors hover:text-white">Kebijakan</a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-900/20 rounded-full -translate-y-32 translate-x-32"></div>
        </footer>
      </div>
    </>
  );
}