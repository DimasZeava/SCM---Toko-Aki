import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function PaymentsIndex({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Riwayat Pembayaran</h1>
                <div className="bg-white rounded shadow p-4">
                    <p className="text-gray-500">Belum ada pembayaran yang dilakukan.</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
