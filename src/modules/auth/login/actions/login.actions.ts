import { fetchClient } from "@/lib/api/client";
import { apiRoute } from "@/routes/routes";
import { LoginSchemaType } from "../schemas/login-schema";
import { LoginResponse } from "../types/login.types";

export async function login(data: LoginSchemaType): Promise<LoginResponse> {
  return fetchClient<LoginResponse>({
    method: "POST",
    url: apiRoute.login,
    body: data,
  });
}
