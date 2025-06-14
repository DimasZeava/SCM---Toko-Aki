import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";

interface DashboardStats {
    userCount: number;
    supplierCount: number;
    retailCount: number;
    purchaseOrderCount: number;
    paymentCount: number;
    productCount: number;
    inventoryCount: number;
}

export default function AdminDashboard() {
    const { stats } = usePage().props as any as { stats: DashboardStats };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        label="Total Pengguna"
                        value={stats.userCount}
                        color="blue"
                    />
                    <StatCard
                        label="Total Supplier"
                        value={stats.supplierCount}
                        color="green"
                    />
                    <StatCard
                        label="Total Retail"
                        value={stats.retailCount}
                        color="pink"
                    />
                    <StatCard
                        label="Total Produk"
                        value={stats.productCount}
                        color="yellow"
                    />
                    <StatCard
                        label="Total Inventory (Qty)"
                        value={stats.inventoryCount}
                        color="purple"
                    />
                    <StatCard
                        label="Total Purchase Order"
                        value={stats.purchaseOrderCount}
                        color="indigo"
                    />
                    <StatCard
                        label="Total Pembayaran"
                        value={`Rp ${Number(
                            stats.paymentCount
                        ).toLocaleString()}`}
                        color="red"
                    />
                </div>
                <div className="flex gap-4">
                    <Link
                        href={route("users.index")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Kelola Pengguna
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({
    label,
    value,
    color,
}: {
    label: string;
    value: string | number;
    color: string;
}) {
    const colorMap: Record<string, string> = {
        blue: "text-blue-600",
        green: "text-green-600",
        yellow: "text-yellow-600",
        pink: "text-pink-600",
        purple: "text-purple-600",
        indigo: "text-indigo-600",
        red: "text-red-600",
    };
    return (
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
            <div className={`text-3xl font-bold ${colorMap[color]}`}>
                {value}
            </div>
            <div className="text-gray-600 mt-2 text-center">{label}</div>
        </div>
    );
}
