import React, { useMemo, useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchBar from "@/Components/SearchBar";
import Pagination from "@/Components/Pagination";
import DataTable from "@/Components/DataTable";
import { Product } from "@/types/index.d";

const Index = () => {
    // Ambil dari inertia props, fallback jika bukan paginasi
    const { products: rawProducts } = usePage().props as any;
    const products = rawProducts?.data
        ? rawProducts
        : {
              data: rawProducts || [],
              current_page: 1,
              last_page: 1,
              per_page: (rawProducts || []).length,
              total: (rawProducts || []).length,
              links: [],
          };

    const [search, setSearch] = useState("");

    // Filter hanya di frontend, paginasi tetap backend
    const filteredProducts = useMemo(() => {
        if (!search) return products.data;
        return products.data.filter((product: Product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products.data]);

    const columns = [
        { label: "Name", render: (item: Product) => item.name },
        { label: "Price", render: (item: Product) => `Rp ${item.price}` },
        { label: "Stock", render: (item: Product) => item.stock },
        { label: "SKU", render: (item: Product) => item.sku },
        {
            label: "Created At",
            render: (item: Product) =>
                new Date(item.created_at).toLocaleDateString(),
        },
        {
            label: "Updated At",
            render: (item: Product) =>
                new Date(item.updated_at).toLocaleDateString(),
        },
    ];

    const actions = (product: Product) => (
        <div className="flex space-x-2 items-center">
            <Link
                href={route("products.edit", product.id)}
                className="text-blue-500 hover:underline flex items-center"
            >
                Edit
            </Link>
            <button
                onClick={() =>
                    router.delete(route("products.destroy", product.id))
                }
                className="text-red-500 hover:underline ml-2 flex items-center"
                type="button"
            >
                Delete
            </button>
            <Link
                href={route("products.show", product.id)}
                className="text-green-500 hover:underline ml-2 flex items-center"
            >
                View
            </Link>
        </div>
    );

    const { pendingCount, statusMessage } = usePage().props as any;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Product List
                </h2>
            }
        >
            {pendingCount > 0 && (
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
                            {statusMessage}
                        </div>
                    )}
            <Head title="Product List" />
            <div className="space-y-4">
                <h1 className="text-xl font-bold">Product List</h1>
                <div className="flex justify-between items-center">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <Link
                        href={route("products.create")}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add New Product
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredProducts}
                    actions={actions}
                    currentPage={products.current_page}
                    perPage={products.per_page}
                />
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Showing{" "}
                        {(products.current_page - 1) * products.per_page + 1} to{" "}
                        {Math.min(
                            products.current_page * products.per_page,
                            products.total
                        )}{" "}
                        of {products.total} entries
                    </div>
                    <Pagination links={products.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
