import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate("/users");
        },
      },
    );
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      {mutation.isError && (
        <p className="text-red-500">{mutation.error?.message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Username</label>
          <input
            className="w-full border p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            className="w-full border p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
