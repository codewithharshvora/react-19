import type { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
}

export default function FormTextarea({
  label,
  name,
  className,
  ...props
}: FormTextareaProps) {
  const baseClasses = "w-full border p-1";
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses;

  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      <textarea name={name} className={combinedClasses} {...props} />
    </div>
  );
}
