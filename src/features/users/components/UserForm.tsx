import { useState, useLayoutEffect } from "react";
import type { FormEvent } from "react";
import { useAddUser, useUpdateUser } from "../hooks/useFetchUsers";
import type { User } from "../userSlice";
import { FormInput, FormButton } from "../../../shared/components";

interface Props {
  initialData?: User;
  onSaved?: () => void;
}

export default function UserForm({ initialData, onSaved }: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");

  const addMutation = useAddUser();
  const updateMutation = useUpdateUser();

  // when initialData changes (start editing or cancel), update form fields
  // useLayoutEffect to avoid warning about synchronous setState causing cascading renders
  useLayoutEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateMutation.mutate(
        { ...initialData, name, email },
        {
          onSuccess: () => {
            onSaved && onSaved();
          },
        },
      );
    } else {
      addMutation.mutate(
        { name, email },
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
