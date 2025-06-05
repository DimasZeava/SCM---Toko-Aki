import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function InventoryIndex({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Inventori Barang</h1>
                <div className="bg-white rounded shadow p-4">
                    <p className="text-gray-500">Tidak ada data inventori saat ini.</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
