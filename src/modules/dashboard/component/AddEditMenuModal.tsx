// src/modules/dashboard/components/AddEditMenuModal.tsx
import React, { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import type { Ingredient } from "../../../types/ingredient";
import type { MenuFormData } from "../../../types/menu";
import { createMenu, updateMenu, getMenuById } from "../../../services/menuService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingId?: number | null;
  ingredients: Ingredient[];
  initialBranchId?: number;
}

export default function AddEditMenuModal({
  isOpen,
  onClose,
  onSaved,
  editingId = null,
  ingredients,
  initialBranchId = 3,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const emptyForm = (): MenuFormData => ({
    type_id: 1,
    branch_id: initialBranchId,
    name: "",
    description: "",
    price: 0,
    validDuration: 0,
    stock: 0,
    details: [],
    photo: undefined,
  });

  const [form, setForm] = useState<MenuFormData>(emptyForm());

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Load menu when editing */
  useEffect(() => {
    if (!isOpen) return;

    if (!editingId) {
      setForm(emptyForm());
      setPreviewUrl(null);
      return;
    }

    (async () => {
      try {
        const data = await getMenuById(editingId);

        setForm({
          type_id: data.type_id,
          branch_id: data.branch_id,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          validDuration: Number(data.validDuration ?? 0),
          stock: Number(data.stock ?? 0),
          details: data.menu_details?.map((m) => ({
            ingredient_id: Number(m.ingredient_id),
            quantity: Number(m.quantity),
          })) ?? [],
          photo: undefined,
        });

        setPreviewUrl(data.photo ? data.photo : null);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data menu untuk edit.");
      }
    })();
  }, [isOpen, editingId]);

  const handleField = (k: keyof MenuFormData, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    handleField("photo", f);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  };

  const addDetail = () => {
    setForm((p) => ({
      ...p,
      details: [...(p.details ?? []), { ingredient_id: 0, quantity: 0 }],
    }));
  };

  const removeDetail = (i: number) => {
    setForm((p) => ({
      ...p,
      details: p.details?.filter((_, idx) => idx !== i) ?? [],
    }));
  };

  const updateDetail = (i: number, patch: Partial<{ ingredient_id: number; quantity: number }>) => {
    setForm((p) => {
      const copy = [...(p.details ?? [])];
      copy[i] = { ...copy[i], ...patch };
      return { ...p, details: copy };
    });
  };

  const onSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setLoading(true);

    if (!form.name.trim()) {
      alert("Nama produk wajib diisi.");
      setLoading(false);
      return;
    }

    const cleanedDetails = (form.details ?? []).filter(
      (d) => d.ingredient_id !== 0 && d.quantity > 0
    );

    try {
      if (editingId == null) {
        await createMenu({ ...form, details: cleanedDetails });
        alert("Menu berhasil dibuat");
      } else {
        await updateMenu(editingId, { ...form, details: cleanedDetails });
        alert("Menu berhasil diperbarui");
      }
      onSaved();
      handleClose();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Gagal menyimpan menu");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(emptyForm());
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .kb-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: kbFadeIn 0.2s ease;
        }

        @keyframes kbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes kbSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .kb-modal {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: kbSlideUp 0.3s ease;
        }

        .kb-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid #e5e7eb;
        }

        .kb-modal-header h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .kb-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: #6b7280;
          transition: all 0.2s;
        }

        .kb-modal-close:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .kb-modal-body {
          padding: 28px;
          overflow-y: auto;
          flex: 1;
        }

        .kb-modal-body::-webkit-scrollbar {
          width: 8px;
        }

        .kb-modal-body::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }

        .kb-modal-body::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }

        .kb-modal-body::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        .kb-form-row {
          margin-bottom: 24px;
        }

        .kb-form-row label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .kb-form-row input[type="text"],
        .kb-form-row input[type="number"],
        .kb-form-row input[type="file"],
        .kb-form-row textarea,
        .kb-detail-row select {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          transition: all 0.2s;
          font-family: inherit;
          background: white;
        }

        .kb-form-row input:focus,
        .kb-form-row textarea:focus,
        .kb-detail-row select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .kb-form-row textarea {
          min-height: 100px;
          resize: vertical;
        }

        .kb-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .kb-img-preview {
          margin-top: 12px;
          max-width: 200px;
          max-height: 200px;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          object-fit: cover;
        }

        .kb-detail-row {
          display: grid;
          grid-template-columns: 1fr 120px 80px;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
        }

        .kb-detail-row input {
          padding: 10px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .kb-detail-row input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .kb-btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .kb-btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }

        .kb-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .kb-btn-secondary {
          background: white;
          color: #374151;
          border: 1.5px solid #d1d5db;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .kb-btn-secondary:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .kb-btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .kb-btn-sm {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .kb-btn-sm.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .kb-btn-sm.delete:hover {
          background: #fecaca;
        }

        .kb-modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .kb-modal {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
          }

          .kb-grid-3 {
            grid-template-columns: 1fr;
          }

          .kb-detail-row {
            grid-template-columns: 1fr;
          }

          .kb-modal-actions {
            flex-direction: column-reverse;
          }

          .kb-modal-actions button {
            width: 100%;
          }
        }
      `}</style>

      <div className="kb-modal-overlay" onClick={handleClose}>
        <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
          <div className="kb-modal-header">
            <h4>{editingId ? "Edit Produk" : "Tambah Produk"}</h4>
            <button className="kb-modal-close" onClick={handleClose}>
              <X />
            </button>
          </div>

          <form className="kb-modal-body" onSubmit={onSubmit}>
            <div className="kb-form-row">
              <label>Nama Produk</label>
              <input type="text" value={form.name} onChange={(e) => handleField("name", e.target.value)} />
            </div>

            <div className="kb-form-row">
              <label>Deskripsi</label>
              <textarea value={form.description} onChange={(e) => handleField("description", e.target.value)} />
            </div>

            <div className="kb-grid-3">
              <div className="kb-form-row">
                <label>Harga</label>
                <input type="number" value={form.price} onChange={(e) => handleField("price", Number(e.target.value))} />
              </div>
              <div className="kb-form-row">
                <label>Stok</label>
                <input type="number" value={form.stock} onChange={(e) => handleField("stock", Number(e.target.value))} />
              </div>
              <div className="kb-form-row">
                <label>Durasi (menit)</label>
                <input type="number" value={form.validDuration} onChange={(e) => handleField("validDuration", Number(e.target.value))} />
              </div>
            </div>

            <div className="kb-form-row">
              <label>Foto Produk</label>
              <input type="file" accept="image/*" onChange={handlePhoto} />
              {previewUrl && (
                <img
                  src={previewUrl}
                  className="kb-img-preview"
                  alt="preview"
                />
              )}
            </div>

            <div className="kb-form-row">
              <label>Detil Bahan</label>

              {(form.details ?? []).map((d, i) => (
                <div key={i} className="kb-detail-row">
                  <select
                    value={d.ingredient_id}
                    onChange={(e) => updateDetail(i, { ingredient_id: Number(e.target.value) })}
                  >
                    <option value={0}>-- Pilih bahan --</option>
                    {ingredients.map((ing) => (
                      <option key={ing.id} value={ing.id}>
                        {ing.name} {ing.unit ? `(${ing.unit.name})` : ""}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min={1}
                    placeholder="Jumlah"
                    value={d.quantity}
                    onChange={(e) => updateDetail(i, { quantity: Number(e.target.value) })}
                  />

                  <button type="button" className="kb-btn-sm delete" onClick={() => removeDetail(i)}>Hapus</button>
                </div>
              ))}

              <button type="button" className="kb-btn-secondary" onClick={addDetail}>
                <Plus size={14} /> Tambah Bahan
              </button>
            </div>

            <div className="kb-modal-actions">
              <button type="button" className="kb-btn-secondary" onClick={handleClose} disabled={loading}>
                Batal
              </button>
              <button type="submit" className="kb-btn-primary" disabled={loading}>
                {loading ? "Menyimpan..." : editingId ? "Simpan" : "Buat"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}