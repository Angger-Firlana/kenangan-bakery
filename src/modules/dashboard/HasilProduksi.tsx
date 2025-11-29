// src/modules/dashboard/HasilProduksi.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash2, ImageIcon } from "lucide-react";
import "./Dashboard.css";

import type { MenuItem } from "../../types/menu";
import type { Ingredient } from "../../types/ingredient";

import { getMenus, deleteMenu } from "../../services/menuService";
import { getIngredients } from "../../services/ingredientService";

import AddEditMenuModal from "./component/AddEditMenuModal";
import DeleteConfirmDialog from "./component/DeleteConfirmDialog";

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
    <>
      <main className="kb-main">
        <header className="kb-header">
          <h2>Hasil Produksi</h2>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Daftar Hasil Produksi</h3>
              <div className="kb-header-actions">
                <div className="kb-search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="kb-btn-primary" onClick={openAdd}>
                  <Plus size={18} />
                  Tambah Produk
                </button>
              </div>
            </div>

            <div className="kb-table-container">
              <table className="kb-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Gambar</th>
                    <th>Nama Produk</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Harga</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Stok</th>
                    <th style={{ width: '120px' }}>Status</th>
                    <th style={{ width: '120px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6}>Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={6}>Tidak ada produk</td></tr>
                  ) : (
                    filtered.map((m) => (
                      <tr key={m.id}>
                        <td>
                          {m.photo ? (
                            <img src={m.photo} alt={m.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }} />
                          ) : (
                            <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", background: "#f3f3f3", borderRadius: 6 }}>
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{m.name}</div>
                          <div style={{ fontSize: 12, color: "#666" }}>{m.description}</div>
                        </td>
                        <td style={{ textAlign: 'right' }}>Rp {m.price.toLocaleString()}</td>
                        <td style={{ textAlign: 'center' }}>{m.stock}</td>
                        <td><span className="kb-badge">{m.type.type_name}</span></td>
                        <td>
                          <div className="kb-actions">
                            <button
                              className="kb-btn-icon"
                              onClick={() => openEdit(m.id)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="kb-btn-icon danger"
                              onClick={() => confirmDelete(m.id)}
                              title="Hapus"
                            >
                              <Trash2 size={16} />
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

      <AddEditMenuModal
        isOpen={addEditOpen}
        editingId={editingId}
        ingredients={ingredients}
        onClose={() => setAddEditOpen(false)}
        onSaved={handleSaved}
      />

      {deleteOpen && (
        <DeleteConfirmDialog
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={doDelete}
          title="Hapus Produk"
          message="Apakah Anda yakin ingin menghapus produk ini?"
        />
      )}
    </>
  );
}
