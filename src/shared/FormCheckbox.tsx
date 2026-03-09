import type { InputHTMLAttributes } from "react";

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  checkboxLabel?: string;
}

export default function FormCheckbox({
  label,
  name,
  checkboxLabel,
  className,
  ...props
}: FormCheckboxProps) {
  return (
    <div>
      {label && <label className="block mb-2">{label}</label>}
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          className="mr-2"
          {...props}
        />
        {checkboxLabel && (
          <label htmlFor={name} className="cursor-pointer">
            {checkboxLabel}
          </label>
        )}
      </div>
    </div>
  );
}
