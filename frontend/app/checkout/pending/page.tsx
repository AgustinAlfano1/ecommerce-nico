"use client";

import Link from "next/link";

export default function PendingPage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold text-yellow-600">Pago pendiente ⏳</h1>

      <p className="mt-4">
        Estamos esperando la confirmación del pago. Te avisaremos cuando se
        apruebe.
      </p>

      <div className="mt-6">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
