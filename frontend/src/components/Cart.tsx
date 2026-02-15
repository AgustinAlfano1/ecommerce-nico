"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 bg-white text-black p-4 rounded shadow-lg w-64">
      <h2 className="font-bold mb-2">🛒 Carrito ({totalItems})</h2>

      <ul className="text-sm mb-3">
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} x{item.qty}
          </li>
        ))}
      </ul>

      <p className="font-bold">Total: ${totalPrice}</p>
      <Link href="/checkout">
        <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">
          Ir a pagar
        </button>
      </Link>
    </div>
  );
}
