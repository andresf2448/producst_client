"use server";

export const getProducts = async (page, searchTerm, count = 5) => {
  const response = await fetch(
    `http://localhost:3000/products?page=${page}&search=${searchTerm}&limit=${count}`
  );
  const data = await response.json();

  return {
    products: data.products,
    totalPages: data.total_pages,
  };
};
