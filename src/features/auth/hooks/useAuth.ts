import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../authApi";
import type { LoginResponse } from "../authApi";
import { loginSuccess } from "../authSlice";

export function useLogin() {
  const dispatch = useDispatch();

  return useMutation<
    LoginResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: (creds: { username: string; password: string }) => login(creds),
    onSuccess(data: LoginResponse) {
      dispatch(loginSuccess(data));
      // persist token and user so refresh keeps auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
}
