import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function SupplierDashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Supplier Dashboard</h1>
                <p>Selamat datang, {auth.user.name}</p>
            </div>
        </AuthenticatedLayout>
    );
}