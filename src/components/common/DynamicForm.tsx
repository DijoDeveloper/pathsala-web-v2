import { ReactNode } from 'react';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
};

type DynamicFormProps = {
  fields: FormField[];
  formData: Record<string, any>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (name: string, value: string) => void;
  submitButtonText: string;
  className?: string;
  children?: ReactNode;
};

const DynamicForm = ({
  fields,
  formData,
  onSubmit,
  onChange,
  submitButtonText,
  className = '',
  children,
}: DynamicFormProps) => {
  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        onChange(field.name, e.target.value),
      className: 'w-full md:w-1/2',
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
      required: field.required,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 3}
            className={`${commonProps.className} px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white`}
          />
        );
      case 'select':
        return (
          <select
            {...commonProps}
            className={`${commonProps.className} px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:text-white`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <Input type={field.type} {...commonProps} />;
    }
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
      {children}
      <div className="pt-4">
        <Button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md"
        >
          {submitButtonText.toUpperCase()}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
