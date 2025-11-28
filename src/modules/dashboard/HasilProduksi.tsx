// src/modules/dashboard/HasilProduksi.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Package, Box, Calendar, FileText, ShoppingBag, User, Plus, Search, Edit, Trash2, ImageIcon
} from "lucide-react";
import "./Dashboard.css";

import type { MenuItem } from "../../types/menu";
import type { Ingredient } from "../../types/ingredient";

import { getMenus, deleteMenu } from "../../services/menuService";
import { getIngredients } from "../../services/ingredientService";

import AddEditMenuModal from "./component/AddEditMenuModal";
import DeleteConfirmDialog from "./component/DeleteConfirmDialog";

const menuItemsNav = [
  { id: "home", label: "Home", icon: Home, path: "/memories-bakery/dashboard" },
  { id: "hasil-produksi", label: "Hasil Produksi", icon: Package, path: "/memories-bakery/dashboard/hasil-produksi" },
  { id: "bahan-baku", label: "Bahan Baku", icon: Box, path: "/memories-bakery/dashboard/bahan-baku" },
  { id: "jadwal-produksi", label: "Jadwal Produksi", icon: Calendar, path: "/memories-bakery/dashboard/jadwal-produksi" },
  { id: "laporan", label: "Laporan", icon: FileText, path: "/memories-bakery/dashboard/laporan" },
  { id: "pesanan", label: "Pesanan", icon: ShoppingBag, path: "/memories-bakery/dashboard/pesanan" },
];

export default function HasilProduksi() {
  const [user, setUser] = useState<{ fullName?: string } | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [addEditOpen, setAddEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");
    if (!isLoggedIn || !userData) {
      navigate("/memories-bakery/login");
      return;
    }
    setUser(JSON.parse(userData));
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const menusRes = await getMenus(); // returns MenuItem[]
      setMenus(menusRes);

      const ingRes = await getIngredients(); // IngredientResponse { success, message, data: [] }
      const ingData = (ingRes as any)?.data ?? (ingRes as any);
      setIngredients(ingData);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const filtered = menus.filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const openAdd = () => {
    setEditingId(null);
    setAddEditOpen(true);
  };

  const openEdit = (id: number) => {
    setEditingId(id);
    setAddEditOpen(true);
  };

  const handleSaved = async () => {
    await loadAll();
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMenu(deleteId);
      setMenus((p) => p.filter((m) => m.id !== deleteId));
      setDeleteOpen(false);
      setDeleteId(null);
      alert("Data berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
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
          {menuItemsNav.map((it) => (
            <button key={it.id} className={`kb-nav-item ${location.pathname === it.path ? "active" : ""}`} onClick={() => navigate(it.path)}>
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

      <main className="kb-main">
        <header className="kb-header">
          <h2>Hasil Produksi</h2>
          <button className="kb-user-btn" onClick={() => navigate("/memories-bakery/profil")} title={user?.fullName ?? "Profile"}>
            {user?.fullName ? <div className="kb-user-avatar">{user.fullName.charAt(0).toUpperCase()}</div> : <User size={20} />}
          </button>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Daftar Produk</h3>
              <div className="kb-card-actions">
                <div className="kb-search-box">
                  <Search size={18} />
                  <input placeholder="Cari produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button className="kb-btn-primary" onClick={openAdd}>
                  <Plus size={18} /> Tambah Produk
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
                  {loading ? (
                    <tr><td colSpan={6}>Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6}>Tidak ada produk</td></tr>
                  ) : (
                    filtered.map((m, i) => (
                      <tr key={m.id}>
                        <td>{i + 1}</td>
                        <td style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {m.photo ? (
                            // If backend returns relative path, you might need to prefix with baseURL
                            <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                          ) : (
                            <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", background: "#f3f3f3", borderRadius: 6 }}>
                              <ImageIcon size={20} />
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 600 }}>{m.name}</div>
                            <div style={{ fontSize: 12, color: "#666" }}>{m.description}</div>
                          </div>
                        </td>
                        <td><span className="kb-badge">{m.type.type_name}</span></td>
                        <td>{m.stock}</td>
                        <td>Rp {m.price.toLocaleString()}</td>
                        <td>
                          <div className="kb-table-actions">
                            <button className="kb-btn-sm edit" onClick={() => openEdit(m.id)}><Edit size={14} /> Edit</button>
                            <button className="kb-btn-sm delete" onClick={() => confirmDelete(m.id)}><Trash2 size={14} /> Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AddEditMenuModal
        isOpen={addEditOpen}
        onClose={() => { setAddEditOpen(false); setEditingId(null); }}
        onSaved={handleSaved}
        editingId={editingId ?? undefined}
        ingredients={ingredients}
        initialBranchId={3}
      />

      <DeleteConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={doDelete}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan."
      />
    </div>
  );
}
