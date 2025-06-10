import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function SupplierDashboard({ auth }: PageProps) {
    
    const { pendingCount, statusMessage } = usePage().props as any;

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Supplier Dashboard</h1>
                <p>Selamat datang, {auth.user.name}</p>
                {pendingCount > 0 && (
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
                        {statusMessage}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}