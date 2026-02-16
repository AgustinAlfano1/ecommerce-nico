"use client";

import Link from "next/link";

export default function FailurePage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Pago rechazado ❌</h1>

      <p className="mt-4">Tu pago no pudo procesarse.</p>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/checkout"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          Intentar nuevamente
        </Link>

        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
