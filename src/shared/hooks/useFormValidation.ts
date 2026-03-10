import { useState, useCallback } from "react";

// Helper function to format field names to readable labels
// "username" -> "Username", "firstName" -> "First name"
const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, " $1") // Add space before capitals
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
};

export interface ValidationRule {
  [fieldName: string]: {
    label?: string; // Human-readable label (auto-generated if not provided)
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    patternMessage?: string;
    custom?: (value: string) => string | null;
  };
}

export interface UseFormValidationReturn<T> {
  formData: T;
  errors: Record<string, string>;
  setFormData: (data: Partial<T>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearFieldError: (field: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRule,
): UseFormValidationReturn<T> {
  const [formData, setFormDataState] = useState<T>(initialData);
  const [errors, setErrorsState] = useState<Record<string, string>>({});

  const setFormData = useCallback((data: Partial<T>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setErrors = useCallback((newErrors: Record<string, string>) => {
    setErrorsState(newErrors);
  }, []);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrorsState((prev) => {
      const updated = { ...prev };
      delete updated[field as string];
      return updated;
    });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(validationRules).forEach((fieldName) => {
      const value = formData[fieldName as keyof T];
      const rule = validationRules[fieldName];
      const label = rule.label || formatFieldName(fieldName);

      // Check required
      if (
        rule.required &&
        (!value || (typeof value === "string" && !value.trim()))
      ) {
        newErrors[fieldName] = `${label} is required`;
        return;
      }

      // Skip other validations if value is empty and not required
      if (!value || (typeof value === "string" && !value.trim())) {
        return;
      }

      const stringValue = String(value);

      // Check minLength
      if (rule.minLength && stringValue.length < rule.minLength) {
        newErrors[fieldName] =
          `${label} must be at least ${rule.minLength} characters`;
        return;
      }

      // Check maxLength
      if (rule.maxLength && stringValue.length > rule.maxLength) {
        newErrors[fieldName] =
          `${label} must not exceed ${rule.maxLength} characters`;
        return;
      }

      // Check pattern
      if (rule.pattern && !rule.pattern.test(stringValue)) {
        newErrors[fieldName] =
          rule.patternMessage || `${label} format is invalid`;
        return;
      }

      // Check custom validation
      if (rule.custom) {
        const customError = rule.custom(stringValue);
        if (customError) {
          newErrors[fieldName] = customError;
        }
      }
    });

    setErrorsState(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormDataState(initialData);
    setErrorsState({});
  };

  return {
    formData,
    errors,
    setFormData,
    setFieldValue,
    setErrors,
    clearFieldError,
    validateForm,
    resetForm,
  };
}
