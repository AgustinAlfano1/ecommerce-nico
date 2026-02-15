export const getProducts = async (
  page = 1,
  keyword = "",
  limit = 6,
  sort = "-createdAt",
) => {
  const res = await fetch(
    `http://localhost:5000/api/products?page=${page}&keyword=${keyword}&limit=${limit}&sort=${sort}`,
  );

  return res.json();
};
