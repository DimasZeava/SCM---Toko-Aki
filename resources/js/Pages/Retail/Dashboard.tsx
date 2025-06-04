import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold">Dashboard Retail</h1>
                <p>Selamat datang, {auth.user.name}!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">Total Purchase Order</h2>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">Pembayaran</h2>
                        <p className="text-2xl font-bold text-green-600">Rp 0</p>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold text-lg">Inventori Menipis</h2>
                        <p className="text-2xl font-bold text-red-600">0 item</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
