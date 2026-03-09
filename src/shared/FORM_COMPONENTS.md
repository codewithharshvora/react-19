/\*\*

- Form Components Library
-
- A collection of reusable form components for consistent styling and behavior across the application.
  \*/

// ============================================
// IMPORT EXAMPLES
// ============================================

// Individual imports
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

// Barrel import (recommended)
import {
FormInput,
FormSelect,
FormRadio,
FormCheckbox,
FormTextarea,
FormButton,
} from "./index";

// ============================================
// USAGE EXAMPLES
// ============================================

// --- FormInput ---
// For text, email, password, number inputs
<FormInput
label="Username"
name="username"
type="text"
placeholder="Enter username"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>

// --- FormSelect ---
// For dropdown selections
<FormSelect
label="Country"
name="country"
value={country}
onChange={(e) => setCountry(e.target.value)}
options={[
{ value: "us", label: "United States" },
{ value: "uk", label: "United Kingdom" },
{ value: "ca", label: "Canada" },
]}
/>

// --- FormRadio ---
// For radio button groups
<FormRadio
label="Gender"
name="gender"
value={gender}
onChange={(e) => setGender(e.target.value)}
options={[
{ value: "male", label: "Male" },
{ value: "female", label: "Female" },
{ value: "other", label: "Other" },
]}
/>

// --- FormCheckbox ---
// For single or multiple checkboxes
<FormCheckbox
name="terms"
checkboxLabel="I agree to the terms and conditions"
checked={acceptTerms}
onChange={(e) => setAcceptTerms(e.target.checked)}
/>

// --- FormTextarea ---
// For textarea fields
<FormTextarea
label="Comments"
name="comments"
placeholder="Enter your comments here"
value={comments}
onChange={(e) => setComments(e.target.value)}
rows={5}
/>

// --- FormButton ---
// For submit buttons with variants
<FormButton type="submit">Submit</FormButton>
<FormButton variant="secondary">Save Draft</FormButton>
<FormButton variant="danger">Delete</FormButton>
<FormButton variant="ghost">Cancel</FormButton>

// With loading state
<FormButton
type="submit"
isLoading={isSubmitting}
loadingText="Submitting..."

> Submit
> </FormButton>

// ============================================
// COMPONENT PROPS REFERENCE
// ============================================

// FormInput Props
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
label?: string; // Optional label text
name: string; // Required: input name
// Plus all standard HTML input attributes: type, placeholder, value, onChange, etc.
}

// FormSelect Props
interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
label?: string; // Optional label text
name: string; // Required: select name
options: Array<{ // Array of select options
value: string | number;
label: string;
}>;
// Plus all standard HTML select attributes: value, onChange, disabled, etc.
}

// FormRadio Props
interface FormRadioProps extends InputHTMLAttributes<HTMLInputElement> {
label?: string; // Optional label for group
name: string; // Required: radio name
options: Array<{ // Array of radio options
value: string | number;
label: string;
}>;
// Plus all standard HTML input attributes: value, onChange, etc.
}

// FormCheckbox Props
interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
label?: string; // Optional main label
name: string; // Required: checkbox name
checkboxLabel?: string; // Label next to checkbox
// Plus all standard HTML input attributes: checked, onChange, etc.
}

// FormTextarea Props
interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
label?: string; // Optional label text
name: string; // Required: textarea name
// Plus all standard HTML textarea attributes: placeholder, value, onChange, rows, cols, etc.
}

// FormButton Props
interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
variant?: "primary" | "secondary" | "danger" | "ghost"; // Button style variant
isLoading?: boolean; // Show loading state
loadingText?: string; // Text to show when loading
// Plus all standard HTML button attributes: onClick, type, disabled, etc.
}
