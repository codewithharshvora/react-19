import { useAppSelector } from "../../../app/hooks";
import { useDeleteUser } from "../hooks/useFetchUsers";
import type { User } from "../userSlice";

interface Props {
  onEdit?: (user: User) => void;
}

export default function UserList({ onEdit }: Props) {
  const users = useAppSelector((state) => state.users.list);
  const deleteMutation = useDeleteUser();

  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u.id} className="flex justify-between border p-2">
          <span>
            {u.name} {u.email ? `(${u.email})` : ""}
          </span>
          <div className="space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(u)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteMutation.mutate(u.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
