import DataTable from "@/Components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PurchaseOrder } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Dashboard({ auth }: PageProps) {
    
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


    const {
        lowStockCount,
        lowStockNames,
        totalCompletedPaymentsAmount,
        totalPurchaseOrders,
        recentPurchaseOrders,
        statusCounts,
    } = usePage().props as any as {
        lowStockCount: number;
        lowStockNames: string;
        totalCompletedPaymentsAmount: number;
        totalPurchaseOrders: number;
        recentPurchaseOrders: PurchaseOrder[];
        statusCounts: {
            completed: number;
            pending: number;
            approved: number;
            rejected: number;
        };
    };
    
    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-4">
                {lowStockNames && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
                         ⚠️ Produk stok menipis: {lowStockNames}
                    </div>
                )}
                <h1 className="text-2xl font-bold">Dashboard Retail</h1>
                <p>Selamat datang, {auth.user.name}!</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Total Purchase Order
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">{totalPurchaseOrders}</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">Pembayaran</h2>
                        <p className="text-2xl font-bold text-green-600">
                            Rp {totalCompletedPaymentsAmount.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Inventori Menipis
                        </h2>
                        <p className="text-2xl font-bold text-red-600">
                            {
                                lowStockCount > 0
                                    ? `${lowStockCount} Produk`
                                    : "Tidak ada"
                            }
                        </p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                    <h2 className="font-semibold text-lg">Status Purchase Order</h2>
                    <ul className="space-y-1 mt-2">
                        <li>
                            <span className="font-semibold text-green-600">Approved:</span> {statusCounts.approved}
                        </li>
                        <li>
                            <span className="font-semibold text-gray-500">Pending:</span> {statusCounts.pending}
                        </li>
                        <li>
                            <span className="font-semibold text-blue-600">Completed:</span> {statusCounts.completed}
                        </li>
                        <li>
                            <span className="font-semibold text-red-600">Rejected:</span> {statusCounts.rejected}
                        </li>
                    </ul>
                </div>
                </div>
                <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Terakhir Purchase Order
                        </h2>
                        <DataTable
                            columns={columns}
                            data={recentPurchaseOrders}
                            actions={(po: PurchaseOrder) => (
                                <div className="flex space-x-2">
                                    <a
                                        href={route("retail.purchase-orders.show", po.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Lihat
                                    </a>
                                    {po.status.toLowerCase() !== "approved" && (
                                        <a
                                            href={route("retail.purchase-orders.edit", po.id)}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    )}
                                </div>
                            )} 
                        />
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => window.location.href = route("retail.purchase-orders.create")}
                        >
                            + Buat Purchase Order
                        </button>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
