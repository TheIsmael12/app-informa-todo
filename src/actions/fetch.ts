import { HTTPStatus } from "@/constants/httpStatus";
import { FetchResponse } from "@/types/fetchResponse";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

/**
 * Fetch genérico que no requiere Token, se pasa por parámetros el endpoint, method
 * @param endpoint
 * @param method
 * @param data
 */

export async function fetchData<T, Y>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Partial<Y>,
): Promise<FetchResponse<T>> {

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "es";

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "Cookie": `NEXT_LOCALE=${locale}`,
  };

  try {

    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: method,
      headers: requestHeaders,
      body: method !== "GET" ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type") ?? "";
      const dataError = contentType.includes("application/json")
        ? await response.json()
        : null;
      return {
        status: response.status,
        error: response.statusText,
        message: dataError?.message ?? `Error ${response.status}`,
      };
    }

    const responseData = await response.json();

    return {
      status: response.status,
      data: responseData.result,
      message: responseData.message,
    };

  } catch (error) {

    return {
      status: HTTPStatus.INTERNAL_SERVER_ERROR,
      error: error instanceof Error ? error.message : "Error desconocido",
      message: error instanceof Error ? error.message : "Error desconocido",
    };

  }

}