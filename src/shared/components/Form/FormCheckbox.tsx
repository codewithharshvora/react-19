import type { InputHTMLAttributes } from "react";

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  checkboxLabel?: string;
  error?: string;
  onErrorClear?: () => void;
  isRequired?: boolean;
}

export default function FormCheckbox({
  label,
  name,
  checkboxLabel,
  className,
  error,
  required,
  onChange,
  onErrorClear,
  isRequired,
  ...props
}: FormCheckboxProps) {
  const showAsterisk =
    required || isRequired || (error && error.includes("required"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error && onErrorClear) {
      onErrorClear();
    }
    onChange?.(e);
  };

  return (
    <div>
      {label && (
        <label className="block mb-2">
          {label}
          {showAsterisk && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          className={`mr-2 ${error ? "border-red-500" : ""}`}
          required={required}
          onChange={handleChange}
          {...props}
        />
        {checkboxLabel && (
          <label htmlFor={name} className="cursor-pointer">
            {checkboxLabel}
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
