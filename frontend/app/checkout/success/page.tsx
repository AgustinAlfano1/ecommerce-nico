"use client";

import { useEffect } from "react";
import { useCart } from "../../../src/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Pago aprobado ✅</h1>
      <p className="mt-2">Gracias por tu compra.</p>
    </main>
  );
}
