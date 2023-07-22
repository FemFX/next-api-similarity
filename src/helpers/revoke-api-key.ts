export async function revokeApiKey({ keyId }: { keyId: string }) {
  const res = await fetch("/api/api-key/revoke", {
    method: "POST",
    body: JSON.stringify({ keyId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as { error?: string };
  if (data.error) {
    throw new Error(data.error);
  }
}
