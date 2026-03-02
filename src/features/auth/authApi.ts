// simple fake authentication API

export interface LoginResponse {
  token: string;
  user: { name: string };
}

interface Credentials {
  username: string;
  password: string;
}

export async function login({
  username,
  password,
}: Credentials): Promise<LoginResponse> {
  // mimic network delay
  await new Promise((r) => setTimeout(r, 500));
  if (username === "admin" && password === "password") {
    return { token: "fake-jwt-token", user: { name: "Admin User" } };
  }
  throw new Error("Invalid credentials");
}
