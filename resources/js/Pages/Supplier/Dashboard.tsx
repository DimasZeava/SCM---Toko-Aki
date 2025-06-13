import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage, Link } from "@inertiajs/react";

export interface Retail {
    id: number;
    name: string;
    // tambahkan field lain jika perlu
}

export interface PurchaseOrder {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
    // tambahkan ini:
    retail?: Retail;
    // ...field lain...
}
export default function SupplierDashboard({ auth }: PageProps) {
    const {
        pendingCount,
        statusMessage,
        totalSuppliedProducts,
        totalPurchaseOrders,
        totalPendingOrders,
        totalCompletedOrders,
        recentPurchaseOrders,
    } = usePage().props as any as {
        pendingCount: number;
        statusMessage: string;
        totalSuppliedProducts: number;
        totalPurchaseOrders: number;
        totalPendingOrders: number;
        totalCompletedOrders: number;
        recentPurchaseOrders: PurchaseOrder[];
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-4">
                {pendingCount > 0 && (
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
                        {statusMessage}
                    </div>
                )}
                <h1 className="text-2xl font-bold">Dashboard Supplier</h1>
                <p>Selamat datang, {auth.user.name}!</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Total Produk Supply
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalSuppliedProducts}
                        </p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Total Purchase Order
                        </h2>
                        <p className="text-2xl font-bold text-green-600">
                            {totalPurchaseOrders}
                        </p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">PO Pending</h2>
                        <p className="text-2xl font-bold text-yellow-600">
                            {totalPendingOrders}
                        </p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">PO Selesai</h2>
                        <p className="text-2xl font-bold text-green-600">
                            {totalCompletedOrders}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Link
                        href={route("supplier.finance.index")}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Lihat Pemasukan
                    </Link>
                    <Link
                        href={route("supplier.orders.index")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Lihat Semua Order
                    </Link>
                </div>
                <div className="bg-white shadow rounded p-4 mt-4">
                    <h2 className="font-semibold text-lg mb-2">
                        Purchase Order Terbaru
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Retail
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Total
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Tanggal
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPurchaseOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-4 text-gray-500"
                                        >
                                            Tidak ada data.
                                        </td>
                                    </tr>
                                ) : (
                                    recentPurchaseOrders.map((po, idx) => (
                                        <tr key={po.id} className="border-b">
                                            <td className="px-4 py-2">
                                                {po.retail?.name ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={
                                                        po.status.toLowerCase() ===
                                                        "approved"
                                                            ? "text-green-600 font-semibold"
                                                            : po.status.toLowerCase() ===
                                                              "pending"
                                                            ? "text-yellow-600 font-semibold"
                                                            : po.status.toLowerCase() ===
                                                              "rejected"
                                                            ? "text-red-600 font-semibold"
                                                            : ""
                                                    }
                                                >
                                                    {po.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        po.status
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                Rp {po.total_amount}
                                            </td>
                                            <td className="px-4 py-2">
                                                {po.created_at.slice(0, 10)}
                                            </td>
                                            <td className="px-4 py-2">
                                                <a
                                                    href={route(
                                                        "supplier.orders.show",
                                                        po.id
                                                    )}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
