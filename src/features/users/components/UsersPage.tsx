import { useState } from "react";
import { useFetchUsers } from "../hooks/useFetchUsers";
import UserForm from "./UserForm";
import UserList from "./UserList";
import type { User } from "../userSlice";

export default function UsersPage() {
  const { isLoading, error } = useFetchUsers();
  const [editing, setEditing] = useState<User | null>(null);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error loading users: {(error as Error).message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Users</h1>
      <UserForm initialData={editing || undefined} onSaved={() => setEditing(null)} />
      <UserList onEdit={(u) => setEditing(u)} />
    </div>
  );
}
