"use client";

import Cart from "../src/components/Cart";
import { useCart } from "../src/context/CartContext";
import { useEffect, useState } from "react";
import { getProducts } from "../src/services/productService";

export default function Home() {
  {
    /* USE STATES */
  }
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("-createdAt");

  {
    /* USE CARTS */
  }
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async (
      page: number,
      keyword = "",
      limit = 6,
      sort = "-createdAt",
    ) => {
      const data = await getProducts(page, keyword, limit, sort);
      setProducts(data.products);
      setTotalPages(data.pages);
    };

    fetchProducts(page, search, 6, sort);
  }, [page, search, sort]);

  return (
    <main className="p-10">
      <Cart />
      <h1 className="text-3xl font-bold mb-6">Productos</h1>

      {/*ESTE ES EL IMPUT DE LA PAGINA*/}

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-600"
      />
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}
        className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-600"
      >
        <option value="-createdAt">Más nuevos</option>
        <option value="price">Precio menor</option>
        <option value="-price">Precio mayor</option>
        <option value="name">Nombre A-Z</option>
      </select>

      {/*ESTOS SON LOS PRODUCTOS*/}

      <div className="grid grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="border rounded-lg shadow hover:shadow-xl transition p-4"
          >
            <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-500">Imagen</span>
            </div>

            <h2 className="text-lg font-semibold">{product.name}</h2>

            <p className="text-gray-600 text-sm">{product.description}</p>

            <p className="text-green-600 font-bold text-xl mt-2">
              ${product.price}
            </p>

            <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅ Anterior
        </button>

        <span style={{ margin: "0 15px" }}>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente ➡
        </button>
      </div>
    </main>
  );
}
