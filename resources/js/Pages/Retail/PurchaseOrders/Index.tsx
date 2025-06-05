import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function PurchaseOrderIndex({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Daftar Purchase Order</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                    + Buat Purchase Order
                </button>
                <div className="bg-white rounded shadow p-4">
                    <p className="text-gray-500">Belum ada PO yang dibuat.</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
