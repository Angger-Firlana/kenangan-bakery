// src/modules/dashboard/components/DeleteConfirmDialog.tsx
import React from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmDialog({ isOpen, onClose, onConfirm, title = "Konfirmasi Hapus", message = "Yakin ingin menghapus item ini?" }: Props) {
  if (!isOpen) return null;
  return (
    <div className="kb-modal-overlay" onClick={onClose}>
      <div className="kb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kb-modal-header">
          <h4>{title}</h4>
          <button className="kb-btn-icon" onClick={onClose}><X /></button>
        </div>
        <div className="kb-modal-body">
          <p>{message}</p>
        </div>
        <div className="kb-modal-actions">
          <button className="kb-btn-secondary" onClick={onClose}>Batal</button>
          <button className="kb-btn-danger" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
}
