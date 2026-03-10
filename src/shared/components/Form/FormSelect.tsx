import type { SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: Array<{ value: string | number; label: string }>;
  error?: string;
  onErrorClear?: () => void;
  isRequired?: boolean;
}

export default function FormSelect({
  label,
  name,
  options,
  className,
  error,
  required,
  onChange,
  onErrorClear,
  isRequired,
  ...props
}: FormSelectProps) {
  const baseClasses = "w-full border p-1";
  const errorClasses = error ? "border-red-500" : "";
  const combinedClasses = `${baseClasses} ${errorClasses} ${className || ""}`;

  const showAsterisk =
    required || isRequired || (error && error.includes("required"));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (error && onErrorClear) {
      onErrorClear();
    }
    onChange?.(e);
  };

  return (
    <div>
      {label && (
        <label className="block mb-1">
          {label}
          {showAsterisk && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        className={combinedClasses}
        required={required}
        onChange={handleChange}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
