
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Users({ auth }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
            </div>
        </AuthenticatedLayout>
    );
}
