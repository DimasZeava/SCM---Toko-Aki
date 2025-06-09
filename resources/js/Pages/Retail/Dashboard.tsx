import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Dashboard({ auth }: PageProps) {
    const { lowStockCount, lowStockNames } = usePage().props as any;
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">
                            Total Purchase Order
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">Pembayaran</h2>
                        <p className="text-2xl font-bold text-green-600">
                            Rp 0
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
