import { useNavigate, useLocation } from "react-router-dom";
import { Home, Package, Box, Calendar, FileText, ShoppingBag } from "lucide-react";
import "./sidebar.css";

const menuItemsNav = [
  { id: "home", label: "Home", icon: Home, path: "/memories-bakery/dashboard" },
  { id: "hasil-produksi", label: "Hasil Produksi", icon: Package, path: "/memories-bakery/dashboard/hasil-produksi" },
  { id: "bahan-baku", label: "Bahan Baku", icon: Box, path: "/memories-bakery/dashboard/bahan-baku" },
  { id: "jadwal-produksi", label: "Jadwal Produksi", icon: Calendar, path: "/memories-bakery/dashboard/jadwal-produksi" },
  { id: "laporan", label: "Laporan", icon: FileText, path: "/memories-bakery/dashboard/laporan" },
  { id: "pesanan", label: "Pesanan", icon: ShoppingBag, path: "/memories-bakery/dashboard/pesanan" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
        {menuItemsNav.map((it) => (
          <button 
            key={it.id}
            className={`kb-nav-item ${location.pathname === it.path ? "active" : ""}`}
            onClick={() => navigate(it.path)}
          >
            <it.icon size={20} />
            <span>{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="kb-sidebar-footer">
        <p>KenanganBakery</p>
        <p>Reserved</p>
      </div>
    </aside>
  );
}
