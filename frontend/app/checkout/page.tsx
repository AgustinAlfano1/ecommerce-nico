"use client";

import { useCart } from "../../src/context/CartContext";
import { useState } from "react";
import { createOrder } from "../../src/services/orderService";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    if (!name || !email) {
      alert("Completa nombre y email");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      const payload = {
        customer: { name, email },
        items: cart.map((i: any) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          qty: i.qty,
        })),
        total: cart.reduce((acc: number, i: any) => acc + i.price * i.qty, 0),
      };

      const result = await createOrder(payload);

      alert(`Orden creada ✅ ID: ${result.orderId}`);
      clearCart();
    } catch (e: any) {
      alert(e.message || "Error creando la orden");
    }
  };

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finalizar compra</h1>

      {/* RESUMEN */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

        {cart.map((item: any) => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>${item.price * item.qty}</span>
          </div>
        ))}

        <p className="font-bold mt-4">Total: ${totalPrice}</p>
      </div>

      {/* FORMULARIO */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded"
        />

        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
        >
          Confirmar compra
        </button>
      </div>
    </main>
  );
}
