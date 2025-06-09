import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, usePage } from "@inertiajs/react";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";
import { Product } from "@/types";
interface Inventory {
    id: number;
    product: Product;
    quantity: number;
    cost_price: number;
    selling_price: number;
    updated_at: string;
}

export default function InventoryIndex() {
    const { inventories: rawInventories } = usePage().props as any;
    const inventories = rawInventories?.data
        ? rawInventories
        : {
              data: rawInventories || [],
              current_page: 1,
              per_page: (rawInventories || []).length,
              total: (rawInventories || []).length,
              links: [],
          };
    console.log(inventories);
    const [search, setSearch] = useState("");

    const filteredData = useMemo(() => {
        if (!search) return inventories.data;
        return inventories.data.filter(
            (item: Inventory) =>
                item.product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.quantity.toString().includes(search) ||
                item.cost_price.toString().includes(search) ||
                item.selling_price.toString().includes(search)
        );
    }, [search, inventories.data]);

    const columns = [
        { label: "Nama Produk", render: (inv: Inventory) => inv.product.name },
        { label: "Stok", render: (inv: Inventory) => inv.quantity },
        {
            label: "Harga Modal",
            render: (inv: Inventory) => `Rp ${inv.cost_price.toLocaleString()}`,
        },
        {
            label: "Harga Jual",
            render: (inv: Inventory) =>
                `Rp ${inv.selling_price.toLocaleString()}`,
        },
        {
            label: "Terakhir Diperbarui",
            render: (inv: Inventory) => inv.updated_at.slice(0, 10),
        },
    ];

    const actions = (inv: Inventory) => (
        <div className="flex space-x-2">
            <Link
                href={route("inventory.show", inv.id)}
                className="text-blue-600 hover:underline"
            >
                Detail
            </Link>
            <Link
                href={route("inventory.edit", inv.id)}
                className="text-yellow-600 hover:underline"
            >
                Edit
            </Link>
            <button
                onClick={() =>
                    router.delete(route("inventory.destroy", inv.id))
                }
                className="text-red-500 hover:underline ml-2 flex items-center"
                type="button"
            >
                Delete
            </button>
        </div>
    );

    const { lowStockCount, lowStockName } = usePage().props as any;

    return (
        <AuthenticatedLayout>
            <div className="space-y-4 max-w-7xl mx-auto p-6">
                {lowStockCount > 0 && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
                        ⚠️ Produk {lowStockName} stok menipis! Segera restock dengan tambah inventori.
                    </div>
                )}
                <h1 className="text-2xl font-bold mb-4">Inventori Barang</h1>
                <div className="flex justify-between items-center">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <Link
                        href={route("purchase-orders.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Tambah Inventori
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    actions={actions}
                    currentPage={inventories.current_page}
                    perPage={inventories.per_page}
                />
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Menampilkan{" "}
                        {(inventories.current_page - 1) * inventories.per_page +
                            1}{" "}
                        sampai{" "}
                        {Math.min(
                            inventories.current_page * inventories.per_page,
                            inventories.total
                        )}{" "}
                        dari {inventories.total} entri
                    </div>
                    <Pagination links={inventories.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
