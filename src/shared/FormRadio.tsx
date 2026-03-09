import type { InputHTMLAttributes } from "react";

interface FormRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options: Array<{ value: string | number; label: string }>;
}

export default function FormRadio({
  label,
  name,
  options,
  ...props
}: FormRadioProps) {
  return (
    <div>
      {label && <label className="block mb-2">{label}</label>}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              className="mr-2"
              {...props}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
