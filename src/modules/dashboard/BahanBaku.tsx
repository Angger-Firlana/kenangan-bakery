// Bahan Baku page with shared layout
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from "../../services/ingredientService";
import { getUnits } from "../../services/unitService";
import type { Ingredient, IngredientPayload } from "../../types/ingredient";
import type { Unit } from "../../types/unit";
import "./Dashboard.css";

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

  const [form, setForm] = useState<IngredientPayload>({ name: "", unit_id: 0, price: 0 });

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
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
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

  const openEdit = (item:Ingredient) => {
    setEditId(item.id);
    setForm({ name: item.name, unit_id: item.unit_id, price: item.price });
    setModalOpen(true);
  };

  const confirmDelete = (id:number) => {
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

  const filtered = ingredients.filter((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <>
      <main className="kb-main">
        <header className="kb-header">
          <h2>Bahan Baku</h2>
          <button className="kb-user-btn" onClick={() => navigate("/memories-bakery/profil")}>
            {user?.fullName ? (
              <div className="kb-user-avatar">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="kb-user-avatar">U</div>
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
                  <input placeholder="Cari bahan baku..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                        <td><strong>{item.name}</strong></td>
                        <td><span className="kb-badge">{units.find((u) => u.id === item.unit_id)?.unit_name || "-"}</span></td>
                        <td>Rp {item.price.toLocaleString()}</td>
                        <td>
                          <div className="kb-actions">
                            <button
                              className="kb-btn-icon"
                              onClick={() => openEdit(item)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="kb-btn-icon danger"
                              onClick={() => confirmDelete(item.id)}
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

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="kb-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editId === null ? "Tambah Bahan Baku" : "Edit Bahan Baku"}</h3>
            <div className="kb-modal-body">
              <div className="kb-form-group">
                <label>Nama Bahan</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="kb-input" />
              </div>
              <div className="kb-form-group">
                <label>Unit</label>
                <select name="unit_id" value={form.unit_id} onChange={handleChange} className="kb-input">
                  <option value={0}>-- Pilih Unit --</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>{u.unit_name}</option>
                  ))}
                </select>
              </div>
              <div className="kb-form-group">
                <label>Harga</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="kb-input" />
              </div>
            </div>
            <div className="kb-modal-footer">
              <button className="kb-btn-secondary" onClick={() => setModalOpen(false)}>Batal</button>
              <button className="kb-btn-primary" onClick={handleSubmit}>{editId === null ? "Simpan" : "Update"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteOpen && (
        <div className="kb-modal-overlay" onClick={() => setDeleteOpen(false)}>
          <div className="kb-modal kb-modal-sm" onClick={(e) => e.stopPropagation()}>
            <h3>Hapus Bahan Baku</h3>
            <p>Apakah Anda yakin ingin menghapus bahan baku ini?</p>
            <div className="kb-modal-footer">
              <button className="kb-btn-secondary" onClick={() => setDeleteOpen(false)}>Batal</button>
              <button className="kb-btn-danger" onClick={doDelete}>Hapus</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
