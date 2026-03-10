import type { InputHTMLAttributes } from "react";

interface FormRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  options: Array<{ value: string | number; label: string }>;
  error?: string;
  onErrorClear?: () => void;
  isRequired?: boolean;
}

export default function FormRadio({
  label,
  name,
  options,
  error,
  required,
  onChange,
  onErrorClear,
  isRequired,
  ...props
}: FormRadioProps) {
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
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              className={`mr-2 ${error ? "border-red-500" : ""}`}
              required={required}
              onChange={handleChange}
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
