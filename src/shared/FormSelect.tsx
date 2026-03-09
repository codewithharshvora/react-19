import type { SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: Array<{ value: string | number; label: string }>;
}

export default function FormSelect({
  label,
  name,
  options,
  className,
  ...props
}: FormSelectProps) {
  const baseClasses = "w-full border p-1";
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      <select name={name} className={combinedClasses} {...props}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
