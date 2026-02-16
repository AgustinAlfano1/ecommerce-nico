export const createPreference = async (orderId: string) => {
  const res = await fetch(
    "http://localhost:5000/api/payments/create-preference",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // mostramos el mensaje real del backend
    throw new Error(
      data?.message || `Error creando preferencia (HTTP ${res.status})`,
    );
  }

  return data;
};
