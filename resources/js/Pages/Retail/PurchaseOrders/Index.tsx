import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import DataTable from "@/Components/DataTable";
import Pagination from "@/Components/Pagination";
import SearchBar from "@/Components/SearchBar";

interface Supplier {
    id: number;
    name: string;
}
interface PurchaseOrder {
    id: number;
    supplier?: Supplier;
    status: string;
    total_amount: number;
    created_at: string;
}

export default function PurchaseOrderIndex({
    purchaseOrder,
}: {
    purchaseOrder: PurchaseOrder[];
}) {
    const { purchaseOrders } = usePage().props as any as {
        purchaseOrders: {
            data: PurchaseOrder[];
            current_page?: number;
            last_page?: number;
            per_page?: number;
            total?: number;
            links?: { url: string | null; label: string; active: boolean }[];
        };
    };
    console.log(purchaseOrders);

    const [search, setSearch] = useState("");

    // Filter frontend (optional)
    const filteredOrders = useMemo(() => {
        if (!search) return purchaseOrders.data;
        return purchaseOrders.data.filter(
            (po) =>
                po.supplier?.toString().includes(search) ||
                po.status.toLowerCase().includes(search.toLowerCase()) ||
                po.total_amount.toString().includes(search) ||
                po.created_at.includes(search)
        );
    }, [search, purchaseOrders.data]);

    const columns = [
        {
            label: "Supplier Name",
            render: (po: PurchaseOrder) => po.supplier?.name ?? "-",
        },
        { label: "Status", render: (po: PurchaseOrder) => (
            <span
                className={
                    po.status.toLowerCase() === "approved"
                        ? "text-green-600 font-semibold"
                        : po.status.toLowerCase() === "rejected"
                        ? "text-red-600 font-semibold"
                        : ""
                }
            >
                {po.status}
            </span>
        ), },
        {
            label: "Total",
            render: (po: PurchaseOrder) => `Rp ${po.total_amount}`,
        },
        {
            label: "Tanggal",
            render: (po: PurchaseOrder) => po.created_at.slice(0, 10),
        },
    ];

    const actions = (po: PurchaseOrder) => {
    const status = po.status.toLowerCase();
        if (status === "approved" || status === "rejected") {
            return (
                <div className="flex space-x-2">
                    <Link
                        href={route("retail.purchase-orders.show", po.id)}
                        className="text-blue-600 hover:underline"
                    >
                        Lihat
                    </Link>
                </div>
            );
        }
        return (
            <div className="flex space-x-2">
                <Link
                    href={route("retail.purchase-orders.show", po.id)}
                    className="text-blue-600 hover:underline"
                >
                    Lihat
                </Link>
                <Link
                    href={route("retail.purchase-orders.edit", po.id)}
                    className="text-yellow-600 hover:underline"
                >
                    Edit
                </Link>
                <Link
                    href={route("retail.purchase-orders.destroy", po.id)}
                    method="delete"
                    className="text-red-600 hover:underline"
                    as="button"
                >
                    Hapus
                </Link>
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-4 max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Daftar Purchase Order
                </h1>
                <div className="flex justify-between items-center">
                    <SearchBar searchTerm={search} onSearch={setSearch} />
                    <Link
                        href={route("retail.purchase-orders.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Buat Purchase Order
                    </Link>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredOrders}
                    actions={actions}
                    currentPage={purchaseOrders.current_page}
                    perPage={purchaseOrders.per_page}
                />
                <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Showing{" "}
                        {((purchaseOrders.current_page ?? 1) - 1) *
                            (purchaseOrders.per_page ?? filteredOrders.length) +
                            1}{" "}
                        to{" "}
                        {Math.min(
                            (purchaseOrders.current_page ?? 1) *
                                (purchaseOrders.per_page ??
                                    filteredOrders.length),
                            purchaseOrders.total ?? filteredOrders.length
                        )}{" "}
                        of {purchaseOrders.total ?? filteredOrders.length}{" "}
                        entries
                    </div>
                    <Pagination links={purchaseOrders.links ?? []} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}