import api from "../../shared/api/axiosInstance";
import type { User } from "./userSlice";

export async function fetchUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/users");
  return res.data;
}

export async function createUser(user: Partial<User>): Promise<User> {
  const res = await api.post<User>("/users", user);
  return res.data;
}

export async function updateUser(user: User): Promise<User> {
  const res = await api.put<User>(`/users/${user.id}`, user);
  return res.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
