export async function fetchWithAuth(
  input: RequestInfo,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  //TODO: colocar url/protected logo aqui
  const response = await fetch(input, {
    ...options,
    headers,
  });

  // TODO: corrigir isto para uma solucao mais rapida
  if (response.status === 401) {
    // redirecionar para login
    window.location.href = "/login";
  }

  return response;
}
