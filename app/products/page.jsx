import ProductTable from "@/src/components/Table";
import { getProducts } from "@/app/lib/data";

const ProductsPage = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const searchTerm = searchParams.search || "";

  const { products, totalPages } = await getProducts(page, searchTerm);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Product list</h1>
      <ProductTable
        products={products}
        totalPages={totalPages}
        currentPage={page}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default ProductsPage;
