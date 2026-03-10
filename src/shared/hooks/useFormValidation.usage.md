/\*\*

- useFormValidation Hook - Reusable Form State & Validation
-
- A custom hook that handles form state, validation rules, and error management
- so you don't have to repeat validation logic in every form.
  \*/

// ============================================
// BASIC USAGE - Required Fields Only
// ============================================

import { useFormValidation } from "../../../shared/hooks";

export default function MyForm() {
const { formData, errors, setFieldValue, clearFieldError, validateForm } =
useFormValidation(
{ username: "", email: "", password: "" },
{
username: { required: true },
email: { required: true },
password: { required: true },
}
);

const handleSubmit = (e) => {
e.preventDefault();
if (!validateForm()) return;

    // Submit formData...

};

return (
<form onSubmit={handleSubmit}>
<FormInput
label="Username"
value={formData.username}
onChange={(e) => setFieldValue("username", e.target.value)}
error={errors.username}
onErrorClear={() => clearFieldError("username")}
/>
{/_ More fields... _/}
<button type="submit">Submit</button>
</form>
);
}

// ============================================
// ADVANCED USAGE - Multiple Validation Rules
// ============================================

const { formData, errors, setFieldValue, clearFieldError, validateForm, resetForm } =
useFormValidation(
{
username: "",
email: "",
password: "",
bio: ""
},
{
username: {
required: true,
requiredMessage: "Username is required",
minLength: 3,
maxLength: 20,
},
email: {
required: true,
requiredMessage: "Email is required",
pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
patternMessage: "Please enter a valid email",
},
password: {
required: true,
minLength: 8,
custom: (value) => {
if (!/[A-Z]/.test(value)) return "Password must contain uppercase";
if (!/[0-9]/.test(value)) return "Password must contain a number";
return null;
},
},
bio: {
maxLength: 500,
},
}
);

// ============================================
// HOOK RETURN VALUES
// ============================================

/\*
{
// Current form data
formData: { username: "", email: "" },

// Error messages for each field
errors: { username: "Username is required" },

// Update single field value
setFieldValue: (fieldName, value) => void,

// Update entire form data (partial update)
setFormData: (data: Partial<T>) => void,

// Manually set errors
setErrors: (errors) => void,

// Clear error for specific field
clearFieldError: (fieldName) => void,

// Validate entire form and return boolean
validateForm: () => boolean,

// Reset form to initial values and clear errors
resetForm: () => void,
}
\*/

// ============================================
// VALIDATION RULE OPTIONS
// ============================================

interface ValidationRule {
[fieldName: string]: {
required?: boolean; // Mark field as required
requiredMessage?: string; // Custom required message
minLength?: number; // Minimum string length
maxLength?: number; // Maximum string length
pattern?: RegExp; // Regex pattern to match
patternMessage?: string; // Custom pattern error message
custom?: (value: string) => string | null; // Custom validation function
};
}

// ============================================
// COMPLETE EXAMPLE WITH ALL FEATURES
// ============================================

import { FormEvent } from "react";
import { useFormValidation } from "../../../shared/hooks";
import { FormInput, FormSelect, FormButton } from "../../../shared/components";

interface SignUpData {
username: string;
email: string;
country: string;
password: string;
confirmPassword: string;
}

export default function SignUpForm() {
const {
formData,
errors,
setFieldValue,
clearFieldError,
validateForm,
resetForm
} = useFormValidation<SignUpData>(
{
username: "",
email: "",
country: "",
password: "",
confirmPassword: "",
},
{
username: {
required: true,
requiredMessage: "Please enter a username",
minLength: 3,
maxLength: 20,
},
email: {
required: true,
pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
patternMessage: "Invalid email format",
},
country: {
required: true,
requiredMessage: "Please select a country",
},
password: {
required: true,
minLength: 8,
custom: (value) => {
if (!/[A-Z]/.test(value)) return "Need 1 uppercase letter";
if (!/[0-9]/.test(value)) return "Need 1 number";
return null;
},
},
confirmPassword: {
required: true,
custom: (value) => {
if (value !== formData.password) return "Passwords don't match";
return null;
},
},
}
);

const handleSubmit = (e: FormEvent) => {
e.preventDefault();

    if (!validateForm()) return;

    // API call here
    console.log("Submitting:", formData);

    // After success, reset form
    resetForm();

};

return (
<form onSubmit={handleSubmit} className="space-y-4">
<FormInput
label="Username"
value={formData.username}
onChange={(e) => setFieldValue("username", e.target.value)}
error={errors.username}
onErrorClear={() => clearFieldError("username")}
required
/>

      <FormInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
        error={errors.email}
        onErrorClear={() => clearFieldError("email")}
        required
      />

      <FormSelect
        label="Country"
        value={formData.country}
        onChange={(e) => setFieldValue("country", e.target.value)}
        error={errors.country}
        onErrorClear={() => clearFieldError("country")}
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
        required
      />

      <FormInput
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFieldValue("password", e.target.value)}
        error={errors.password}
        onErrorClear={() => clearFieldError("password")}
        required
      />

      <FormInput
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
        onErrorClear={() => clearFieldError("confirmPassword")}
        required
      />

      <div className="flex gap-2">
        <FormButton type="submit" variant="primary">Sign Up</FormButton>
        <FormButton type="button" variant="ghost" onClick={resetForm}>
          Reset
        </FormButton>
      </div>
    </form>

);
}
