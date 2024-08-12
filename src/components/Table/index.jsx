"use client";
import { getProducts } from "@/app/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";
import { revalidatePath } from "next/navigation";
import Swal from "sweetalert2";

const ProductTable = ({
  products,
  totalPages,
  currentPage,
  searchTerm,
}) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("search", term);

    if (!term) {
      params.delete("search");
    } else {
      params.set("page", 1);
    }
    router.push(`/products?${params.toString()}`);
  };

  const paginate = async (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    router.push(`/products?${params.toString()}`);
    await getProducts(
      sessionStorage.getItem("accessToken"),
      pageNumber,
      searchTerm
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, sessionStorage.getItem("accessToken"));
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Debes iniciar sessión para eliminar un producto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });

      router.push("/login");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm || ""}
          onChange={handleSearch}
          className="border rounded-lg p-4 w-1/2"
        />
        <button
          onClick={() => router.push("/products/create")}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg text-lg"
        >
          Create Product
        </button>
      </div>
      <table className="bg-white border w-full mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b flex space-x-2 justify-center ">
                {accessToken ? (
                  <Link
                    href={`/products/update/${product.id}`}
                    className="rounded-md p-2 hover:bg-gray-100 flex items-center flex-col"
                  >
                    <PencilIcon className="w-5" height="45px" />
                  </Link>
                ) : null}

                <button
                  className="flex flex-col items-center rounded-md p-2 hover:bg-gray-100"
                  style={{ marginLeft: "20px" }}
                  onClick={() => handleDelete(product.id)}
                >
                  <TrashIcon className="w-5" height="45px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductTable;