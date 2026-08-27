// src/components/admin/EditStatusModal.jsx
import { useState } from 'react';
import { X } from 'lucide-react';

// From Person B - UI Components
import Button from '../ui/Button';
import Modal from '../ui/Modal';

// From Person D - Status Enums
// import { STATUS } from '../../constants/statusEnums';

export default function EditStatusModal({ 
  isOpen, 
  onClose, 
  onSave, 
  item, 
  title = 'Edit Status',
  statusOptions = ['Published', 'Pending', 'Draft', 'Rejected'],
  currentStatus = 'Pending'
}) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(item.id, selectedStatus);
      onClose();
    } catch (error) {
      console.error('Failed to save status:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="space-y-4">
          {item && (
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-500">Item</p>
              <p className="font-medium text-slate-800">{item.title}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="secondary" 
              className="flex-1" 
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}