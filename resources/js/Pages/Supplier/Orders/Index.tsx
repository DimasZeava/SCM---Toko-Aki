import DataTable from '@/Components/DataTable';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PurchaseOrder, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function PurchaseOrders({ auth }: PageProps) {
    const { purchaseOrders = { data: [], current_page: 1, last_page: 1, per_page: 10, total: 0, links: [] } } = usePage().props as {
        purchaseOrders: {
            data: PurchaseOrder[];
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            links: { url: string | null; label: string; active: boolean }[];
        };
    };
    const columns = [
        { label: 'ID', render: (item: any) => item.id },
        { label: 'Retail', render: (item: any) => item.retail?.name || 'N/A' },
        { label: 'Status', render: (item: any) => item.status },
        { label: 'Total', render: (item: any) => `Rp ${item.total_amount}` },
        { label: 'Tanggal', render: (item: any) => new Date(item.created_at).toLocaleDateString() },
    ];

    const actions = (po: any) => (
        <div className="flex space-x-2">
            <Link
                href={route('supplier.orders.show', po.id)}
                className="text-blue-500 hover:underline"
            >
                Detail
            </Link>
        </div>
    );

    const {pendingCount, statusMessage} = usePage().props as any;

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Manajemen Purchase Order</h1>
                <p>Selamat datang, {auth.user.name}</p>
                <div className="mt-6">
                    {pendingCount > 0 && (
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
                            {statusMessage}
                        </div>
                    )}
                    <h2 className="font-semibold mb-2">Daftar Purchase Order</h2>
                   <DataTable
                        data={purchaseOrders.data}
                        columns={columns}
                        actions={actions}/>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Showing{" "}
                        {(purchaseOrders.current_page - 1) * purchaseOrders.per_page + 1} to{" "}
                        {Math.min(
                            purchaseOrders.current_page * purchaseOrders.per_page,
                            purchaseOrders.total
                        )}{" "}
                        of {purchaseOrders.total} entries
                    </div>
                    <Pagination links={purchaseOrders.links} />
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}