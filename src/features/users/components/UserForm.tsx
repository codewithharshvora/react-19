import { useLayoutEffect, type FormEvent } from "react";
import { useAddUser, useUpdateUser } from "../hooks/useFetchUsers";
import type { User } from "../userSlice";
import { FormInput, FormButton } from "../../../shared/components";
import { useFormValidation } from "../../../shared/hooks";

interface Props {
  initialData?: User;
  onSaved?: () => void;
}

export default function UserForm({ initialData, onSaved }: Props) {
  const addMutation = useAddUser();
  const updateMutation = useUpdateUser();

  const {
    formData,
    errors,
    setFormData,
    setFieldValue,
    clearFieldError,
    validateForm,
  } = useFormValidation(
    { name: "", email: "" },
    {
      name: { required: true },
      email: { required: true },
    },
  );

  // when initialData changes (start editing or cancel), update form fields
  // useLayoutEffect to avoid warning about synchronous setState causing cascading renders
  useLayoutEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name, email: initialData.email || "" });
    } else {
      setFormData({ name: "", email: "" });
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (initialData) {
      updateMutation.mutate(
        { ...initialData, name: formData.name, email: formData.email },
        {
          onSuccess: () => {
            onSaved && onSaved();
          },
        },
      );
    } else {
      addMutation.mutate(
        { name: formData.name, email: formData.email },
        {
          onSuccess: () => {
            onSaved && onSaved();
          },
        },
      );
    }
  };

  const isPending = initialData
    ? updateMutation.status === "pending"
    : addMutation.status === "pending";

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <div className="space-y-2">
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
          error={errors.name}
          onErrorClear={() => clearFieldError("name")}
          isRequired
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          error={errors.email}
          onErrorClear={() => clearFieldError("email")}
          isRequired
        />
      </div>
      <div className="flex gap-2">
        <FormButton
          type="submit"
          variant="secondary"
          isLoading={isPending}
          loadingText="Saving…"
        >
          {initialData ? "Update" : "Add"}
        </FormButton>
        {initialData && (
          <FormButton
            type="button"
            variant="ghost"
            onClick={() => onSaved && onSaved()}
          >
            Cancel
          </FormButton>
        )}
      </div>
    </form>
  );
}
