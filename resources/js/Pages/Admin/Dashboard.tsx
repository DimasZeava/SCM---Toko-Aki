import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function AdminDashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
        </AuthenticatedLayout>
    );
}