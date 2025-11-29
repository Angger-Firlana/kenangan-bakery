// src/modules/dashboard/JadwalProduksi.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  Box,
  Calendar,
  FileText,
  ShoppingBag,
  User,
  Plus,
  Clock,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import "./Dashboard.css";

import type { ProductionSchedule, ProductionScheduleDetail } from "../../types/productionSchedule";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../services/productionScheduleService";
import { getMenus } from "../../services/menuService";
import type { MenuItem } from "../../types/menu";

interface UserData {
  fullName?: string;
  email?: string;
}

const menuItems = [
  { id: "home", label: "Home", icon: Home, path: "/memories-bakery/dashboard" },
  { id: "hasil-produksi", label: "Hasil Produksi", icon: Package, path: "/memories-bakery/dashboard/hasil-produksi" },
  { id: "bahan-baku", label: "Bahan Baku", icon: Box, path: "/memories-bakery/dashboard/bahan-baku" },
  { id: "jadwal-produksi", label: "Jadwal Produksi", icon: Calendar, path: "/memories-bakery/dashboard/jadwal-produksi" },
  { id: "laporan", label: "Laporan", icon: FileText, path: "/memories-bakery/dashboard/laporan" },
  { id: "pesanan", label: "Pesanan", icon: ShoppingBag, path: "/memories-bakery/dashboard/pesanan" },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "completed":
    case "done":
      return "success";
    case "in_progress":
      return "info";
    case "pending":
    default:
      return "warning";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Selesai";
    case "in_progress":
      return "Dalam Proses";
    case "pending":
      return "Menunggu";
    default:
      return status;
  }
};

function formatDateFromISO(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateReadable(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return d.toLocaleDateString('id-ID', options);
}

export default function JadwalProduksi() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [schedules, setSchedules] = useState<ProductionSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ProductionSchedule | null>(null);

  const [formBranchId, setFormBranchId] = useState<number>(3);
  const [formDate, setFormDate] = useState<string>("");
  const [formStatus, setFormStatus] = useState<string>("pending");
  const [formDetails, setFormDetails] = useState<
    { id?: number; menu_id: number | null; quantity: number }[]
  >([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");
    if (!isLoggedIn || !userData) {
      navigate("/memories-bakery/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchAll();
    fetchMenus();
  }, [navigate]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getSchedules();
      setSchedules(res);
    } catch (err) {
      console.error("failed get schedules", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenus = async () => {
    try {
      const m = await getMenus();
      setMenus(m);
    } catch (err) {
      console.error("failed get menus", err);
    }
  };

  const openCreateModal = () => {
    setEditingSchedule(null);
    setFormBranchId(3);
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormStatus("pending");
    setFormDetails([{ menu_id: menus[0]?.id ?? null, quantity: 1 }]);
    setIsModalOpen(true);
  };

  const openEditModal = (s: ProductionSchedule) => {
    setEditingSchedule(s);
    setFormBranchId(s.branch_id);
    setFormDate(formatDateFromISO(s.schedule_date));
    setFormStatus(s.status ?? "pending");
    setFormDetails(
      s.production_schedule_details.map((d: ProductionScheduleDetail) => ({
        id: d.id,
        menu_id: d.menu_id,
        quantity: d.quantity,
      }))
    );
    setIsModalOpen(true);
  };

  const addDetailRow = () => {
    setFormDetails((prev) => [...prev, { menu_id: menus[0]?.id ?? null, quantity: 1 }]);
  };

  const removeDetailRow = (index: number) => {
    setFormDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, patch: Partial<{ menu_id: number | null; quantity: number }>) => {
    setFormDetails((prev) =>
      prev.map((r, i) => (i === index ? { ...r, ...patch } : r))
    );
  };

  const submitForm = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formDate || formDetails.length === 0) {
      alert("Isi tanggal dan minimal satu detail menu.");
      return;
    }
    const payload = {
      branch_id: formBranchId,
      schedule_date: formDate,
      status: formStatus,
      details: formDetails.map((d) => ({
        ...(d.id ? { id: d.id } : {}),
        menu_id: Number(d.menu_id),
        quantity: Number(d.quantity),
      })),
    };

    try {
      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, payload);
        alert("Jadwal berhasil diupdate");
      } else {
        await createSchedule(payload as any);
        alert("Jadwal berhasil ditambahkan");
      }
      await fetchAll();
      setIsModalOpen(false);
    } catch (err) {
      console.error("submit schedule failed", err);
      alert("Gagal menyimpan jadwal. Lihat console.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus jadwal ini?")) return;
    try {
      await deleteSchedule(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      alert("Jadwal berhasil dihapus");
    } catch (err) {
      console.error("delete failed", err);
      alert("Gagal hapus jadwal.");
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
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`kb-nav-item ${location.pathname === item.path ? "active" : ""}`}
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
          <h2>Jadwal Produksi</h2>
          <button
            className="kb-user-btn"
            onClick={() => navigate("/memories-bakery/profil")}
            title={user?.fullName || "Profile"}
          >
            {user?.fullName ? (
              <div className="kb-user-avatar">{user.fullName.charAt(0).toUpperCase()}</div>
            ) : (
              <User size={20} />
            )}
          </button>
        </header>

        <div className="kb-content">
          <div className="kb-page-card">
            <div className="kb-card-header">
              <h3>Jadwal Produksi Harian</h3>
              <button className="kb-btn-primary" onClick={openCreateModal}>
                <Plus size={18} />
                Tambah Jadwal
              </button>
            </div>

            <div className="kb-schedule-grid">
              {loading ? (
                <div className="kb-empty-state">Loading schedules...</div>
              ) : schedules.length === 0 ? (
                <div className="kb-empty-state">Tidak ada jadwal produksi</div>
              ) : (
                schedules.map((jadwal) => (
                  <div key={jadwal.id} className="kb-schedule-card">
                    <div className="kb-schedule-header">
                      <h4>
                        {jadwal.production_schedule_details[0]?.menu?.name ??
                          `Schedule #${jadwal.id}`}
                      </h4>
                      <span className={`kb-status ${getStatusClass(jadwal.status)}`}>
                        {getStatusLabel(jadwal.status)}
                      </span>
                    </div>
                    <div className="kb-schedule-body">
                      <div className="kb-schedule-info">
                        <Calendar size={16} />
                        <span>{formatDateReadable(jadwal.schedule_date)}</span>
                      </div>
                      <div className="kb-schedule-info">
                        <Package size={16} />
                        <span>
                          {jadwal.production_schedule_details.reduce((a: number, b: ProductionScheduleDetail) => a + b.quantity, 0)} pcs total
                        </span>
                      </div>

                      <div className="kb-schedule-details">
                        {jadwal.production_schedule_details.map((d: ProductionScheduleDetail) => (
                          <div className="kb-schedule-detail-item" key={d.id}>
                            <Clock size={14} />
                            <span>
                              {d.menu?.name ?? `Menu ${d.menu_id}`} — <strong>{d.quantity} pcs</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="kb-schedule-footer">
                      <button className="kb-btn-sm edit" onClick={() => openEditModal(jadwal)}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="kb-btn-sm delete" onClick={() => handleDelete(jadwal.id)}>
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="kb-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="kb-modal kb-modal-form kb-modal-schedule" onClick={(e) => e.stopPropagation()}>
            <div className="kb-modal-header">
              <div className="kb-modal-title-wrapper">
                <div className="kb-modal-icon">
                  {editingSchedule ? <Edit size={24} /> : <Plus size={24} />}
                </div>
                <div>
                  <h3>{editingSchedule ? "Edit Jadwal Produksi" : "Tambah Jadwal Produksi"}</h3>
                  <p className="kb-modal-subtitle">
                    {editingSchedule 
                      ? "Perbarui informasi jadwal produksi" 
                      : "Buat jadwal produksi baru untuk hari ini"}
                  </p>
                </div>
              </div>
              <button 
                className="kb-modal-close" 
                onClick={() => setIsModalOpen(false)}
                title="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            <form className="kb-modal-body" onSubmit={submitForm}>
              <div className="kb-form-row">
                <div className="kb-form-group">
                  <label className="kb-label">
                    Tanggal Produksi <span className="kb-required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="kb-input"
                    required
                  />
                </div>

                <div className="kb-form-group">
                  <label className="kb-label">
                    Status <span className="kb-required">*</span>
                  </label>
                  <select 
                    value={formStatus} 
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="kb-input kb-select"
                  >
                    <option value="pending">Menunggu</option>
                    <option value="in_progress">Dalam Proses</option>
                    <option value="completed">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="kb-form-group">
                <label className="kb-label">
                  Detail Produksi <span className="kb-required">*</span>
                </label>
                <div className="kb-detail-list">
                  {formDetails.map((r, idx) => (
                    <div key={idx} className="kb-detail-row">
                      <div className="kb-detail-row-fields">
                        <select
                          value={r.menu_id ?? ""}
                          onChange={(e) => updateDetail(idx, { menu_id: Number(e.target.value) })}
                          className="kb-input kb-select"
                          required
                        >
                          <option value="" disabled>
                            Pilih menu...
                          </option>
                          {menus.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} (Stok: {m.stock ?? 0})
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min={1}
                          value={r.quantity}
                          onChange={(e) => updateDetail(idx, { quantity: Number(e.target.value) })}
                          className="kb-input"
                          placeholder="Qty"
                          required
                        />
                      </div>

                      <button 
                        type="button" 
                        onClick={() => removeDetailRow(idx)}
                        className="kb-btn-icon-danger"
                        disabled={formDetails.length === 1}
                        title="Hapus item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={addDetailRow}
                  className="kb-btn-add-item"
                >
                  <Plus size={16} /> Tambah Item
                </button>
              </div>
            </form>

            <div className="kb-modal-footer">
              <button 
                type="button"
                className="kb-btn-secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </button>
              <button 
                type="button"
                className="kb-btn-primary" 
                onClick={() => submitForm()}
              >
                {editingSchedule ? "Update Jadwal" : "Simpan Jadwal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}