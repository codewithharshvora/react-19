import type { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  error?: string;
  onErrorClear?: () => void;
  isRequired?: boolean;
}

export default function FormTextarea({
  label,
  name,
  className,
  error,
  required,
  onChange,
  onErrorClear,
  isRequired,
  ...props
}: FormTextareaProps) {
  const baseClasses = "w-full border p-1";
  const errorClasses = error ? "border-red-500" : "";
  const combinedClasses = `${baseClasses} ${errorClasses} ${className || ""}`;

  const showAsterisk =
    required || isRequired || (error && error.includes("required"));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
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
