import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useAuth";
import { FormInput, FormButton } from "../../../shared/components";

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
        <FormInput
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton
          type="submit"
          variant="primary"
          isLoading={mutation.status === "pending"}
          loadingText="Logging in…"
        >
          Login
        </FormButton>
      </form>
    </div>
  );
}
