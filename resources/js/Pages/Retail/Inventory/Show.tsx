import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface Inventory {
    id: number;
    product_name: string;
    quantity: number;
    cost_price: number;
    selling_price: number;
    created_at: string;
    updated_at: string;
}

export default function InventoryShow({ auth }: PageProps) {
    const { inventory } = usePage().props as any as { inventory: Inventory };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Detail Inventori</h1>
                    <Link
                        href={route("inventory.index")}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Kembali ke Inventori
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-6 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">Nama Produk</h2>
                        <p className="text-gray-700">{inventory.product_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600">
                                Jumlah Stok
                            </h2>
                            <p className="text-lg">{inventory.quantity}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600">
                                Harga Modal
                            </h2>
                            <p className="text-lg">
                                Rp {inventory.cost_price.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600">
                                Harga Jual
                            </h2>
                            <p className="text-lg">
                                Rp {inventory.selling_price.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-600">
                                Terakhir Diperbarui
                            </h2>
                            <p className="text-lg">
                                {inventory.updated_at.slice(0, 10)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-600">Dibuat Pada</h2>
                        <p className="text-gray-700">{inventory.created_at.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
