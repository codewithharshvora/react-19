import { useState, useLayoutEffect } from "react";
import type { FormEvent } from "react";
import { useAddUser, useUpdateUser } from "../hooks/useFetchUsers";
import type { User } from "../userSlice";

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
      <div>
        <input
          className="border p-1 mr-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-1 mr-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-secondary text-white px-3 py-1 rounded"
          disabled={isPending}
        >
          {initialData ? "Update" : "Add"}
        </button>
        {initialData && (
          <button
            type="button"
            className="ml-2 text-gray-700 underline"
            onClick={() => onSaved && onSaved()}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
