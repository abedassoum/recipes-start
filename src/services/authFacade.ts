import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const LOGIN_URL = API_URL + "/api/auth/login";

export type User = { username: string; password: string; roles?: string[] };

interface LoginResponse {
  username: string;
  token: string;
  roles: Array<string>;
}

interface LoginRequest {
  username: string;
  password: string;
}

const authProvider = {
  isAuthenticated: false,
  async signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options = makeOptions("POST", user_);
    const res = await fetch(LOGIN_URL, options);
    return handleHttpErrors(res);
  },
};

export type { LoginResponse, LoginRequest };
export { authProvider };
