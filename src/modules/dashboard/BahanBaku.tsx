import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Package, Box, Calendar, FileText, ShoppingBag, User, Plus, Search, Edit, Trash2
} from "lucide-react";
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from "../../services/ingredientService";
import { getUnits } from "../../services/unitService";

import type { Ingredient, IngredientPayload } from "../../types/ingredient";
import type { Unit } from "../../types/unit";

import "./Dashboard.css";

const menuItemsNav = [
  { id: "home", label: "Home", icon: Home, path: "/memories-bakery/dashboard" },
  { id: "hasil-produksi", label: "Hasil Produksi", icon: Package, path: "/memories-bakery/dashboard/hasil-produksi" },
  { id: "bahan-baku", label: "Bahan Baku", icon: Box, path: "/memories-bakery/dashboard/bahan-baku" },
  { id: "jadwal-produksi", label: "Jadwal Produksi", icon: Calendar, path: "/memories-bakery/dashboard/jadwal-produksi" },
  { id: "laporan", label: "Laporan", icon: FileText, path: "/memories-bakery/dashboard/laporan" },
  { id: "pesanan", label: "Pesanan", icon: ShoppingBag, path: "/memories-bakery/dashboard/pesanan" },
];

export default function BahanBaku() {
  const [user, setUser] = useState<{ fullName?: string } | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState<IngredientPayload>({
    name: "",
    unit_id: 0,
    price: 0,
  });

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
      const resIngredients = await getIngredients();
      setIngredients(resIngredients.data);

      const resUnits = await getUnits();
      setUnits(resUnits.data);
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "unit_id"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editId === null) {
        await createIngredient(form);
        alert("Bahan baku berhasil ditambahkan");
      } else {
        await updateIngredient(editId, form);
        alert("Bahan baku berhasil diupdate");
      }

      setModalOpen(false);
      setEditId(null);
      setForm({ name: "", unit_id: 0, price: 0 });
      loadAll();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ name: "", unit_id: 0, price: 0 });
    setModalOpen(true);
  };

  const openEdit = (item: Ingredient) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      unit_id: item.unit_id,
      price: item.price,
    });
    setModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteIngredient(deleteId);
      setIngredients((p) => p.filter((i) => i.id !== deleteId));
      setDeleteOpen(false);
      setDeleteId(null);
      alert("Bahan baku berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
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

      <main className="kb-main">
        <header className="kb-header">
          <h2>Bahan Baku</h2>
          <button 
            className="kb-user-btn" 
            onClick={() => navigate("/memories-bakery/profil")} 
            title={user?.fullName ?? "Profile"}
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
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Daftar Bahan Baku</h3>
              <div className="kb-card-actions">
                <div className="kb-search-box">
                  <Search size={18} />
                  <input 
                    placeholder="Cari bahan baku..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                  />
                </div>
                <button className="kb-btn-primary" onClick={openAdd}>
                  <Plus size={18} /> Tambah Bahan
                </button>
              </div>
            </div>

            <div className="kb-table-wrapper">
              <table className="kb-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Bahan</th>
                    <th>Unit</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5}>Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={5}>Tidak ada bahan baku</td></tr>
                  ) : (
                    filtered.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                        </td>
                        <td>
                          <span className="kb-badge">
                            {units.find((u) => u.id === item.unit_id)?.unit_name || "-"}
                          </span>
                        </td>
                        <td>Rp {item.price.toLocaleString()}</td>
                        <td>
                          <div className="kb-table-actions">
                            <button 
                              className="kb-btn-sm edit" 
                              onClick={() => openEdit(item)}
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button 
                              className="kb-btn-sm delete" 
                              onClick={() => confirmDelete(item.id)}
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
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

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="kb-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kb-modal-header">
              <h3>{editId === null ? "Tambah Bahan Baku" : "Edit Bahan Baku"}</h3>
              <button 
                className="kb-modal-close" 
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="kb-modal-body">
              <div className="kb-form-group">
                <label>Nama Bahan</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama bahan"
                  className="kb-input"
                />
              </div>

              <div className="kb-form-group">
                <label>Unit</label>
                <select
                  name="unit_id"
                  value={form.unit_id}
                  onChange={handleChange}
                  className="kb-input"
                >
                  <option value={0}>-- Pilih Unit --</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.unit_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="kb-form-group">
                <label>Harga</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Masukkan harga"
                  className="kb-input"
                />
              </div>
            </div>

            <div className="kb-modal-footer">
              <button 
                className="kb-btn-secondary" 
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>
              <button className="kb-btn-primary" onClick={handleSubmit}>
                {editId === null ? "Simpan" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteOpen && (
        <div className="kb-modal-overlay" onClick={() => setDeleteOpen(false)}>
          <div className="kb-modal kb-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="kb-modal-header">
              <h3>Hapus Bahan Baku</h3>
              <button 
                className="kb-modal-close" 
                onClick={() => setDeleteOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="kb-modal-body">
              <p>Apakah Anda yakin ingin menghapus bahan baku ini? Tindakan ini tidak bisa dibatalkan.</p>
            </div>

            <div className="kb-modal-footer">
              <button 
                className="kb-btn-secondary" 
                onClick={() => setDeleteOpen(false)}
              >
                Batal
              </button>
              <button className="kb-btn-danger" onClick={doDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}