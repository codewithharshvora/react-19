import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/useAuth";
import { FormInput, FormButton } from "../../../shared/components";
import { useFormValidation } from "../../../shared/hooks";

export default function Login() {
  const navigate = useNavigate();
  const mutation = useLogin();

  const { formData, errors, setFieldValue, clearFieldError, validateForm } =
    useFormValidation(
      { username: "", password: "" },
      {
        username: { required: true },
        password: { required: true },
      },
    );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutation.mutate(
      { username: formData.username, password: formData.password },
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
          value={formData.username}
          onChange={(e) => setFieldValue("username", e.target.value)}
          error={errors.username}
          onErrorClear={() => clearFieldError("username")}
          isRequired
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
          error={errors.password}
          onErrorClear={() => clearFieldError("password")}
          isRequired
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
