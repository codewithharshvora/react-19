import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  onErrorClear?: () => void;
  isRequired?: boolean; // Optional: explicitly mark as required (alternative to checking validation)
}

export default function FormInput({
  label,
  name,
  className,
  error,
  required,
  onChange,
  onErrorClear,
  isRequired,
  ...props
}: FormInputProps) {
  const baseClasses = "w-full border p-1";
  const errorClasses = error ? "border-red-500" : "";
  const combinedClasses = `${baseClasses} ${errorClasses} ${className || ""}`;

  // Show asterisk if field is required or has an error (indicating required validation)
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
        <label className="block mb-1">
          {label}
          {showAsterisk && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        name={name}
        className={combinedClasses}
        required={required}
        onChange={handleChange}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
