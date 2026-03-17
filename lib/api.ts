const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendMessage(
  message: string,
  sessionId: string | null,
  role?: string,
): Promise<{ response: string; sessionId: string }> {
  const payload: Record<string, unknown> = {
    message,
    session_id: sessionId,
  };
  if (role) {
    payload.role = role;
  }

  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return {
    response: data.response,
    sessionId: data.session_id,
  };
}
