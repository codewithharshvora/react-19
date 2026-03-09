import type { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
  loadingText?: string;
}

export default function FormButton({
  variant = "primary",
  isLoading = false,
  loadingText,
  children,
  className,
  disabled,
  ...props
}: FormButtonProps) {
  const baseClasses = "px-4 py-2 rounded font-medium transition";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "bg-secondary text-white hover:bg-opacity-90",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${
    className || ""
  } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}
