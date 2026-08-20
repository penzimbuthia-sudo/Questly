import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useForm } from 'react-hook-form';

const EditStatusModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialData = {},
  fields = [],
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'select' ? (
              <div>
                <label className="text-sm font-medium text-dark-200 block mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                  {...register(field.name, { required: field.required })}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                )}
              </div>
            ) : field.type === 'textarea' ? (
              <div>
                <label className="text-sm font-medium text-dark-200 block mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  {...register(field.name, { required: field.required })}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-400 focus:border-primary-500 focus:outline-none resize-none"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                )}
              </div>
            ) : (
              <Input
                label={field.label}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                register={register}
                name={field.name}
                required={field.required}
                error={errors[field.name]?.message}
              />
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-4 border-t border-dark-700">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStatusModal;
