import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

export default function FormInput({
  label,
  name,
  className,
  ...props
}: FormInputProps) {
  const baseClasses = "w-full border p-1";
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      <input name={name} className={combinedClasses} {...props} />
    </div>
  );
}
