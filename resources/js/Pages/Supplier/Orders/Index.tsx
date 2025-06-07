import DataTable from '@/Components/DataTable';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Order, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Orders({ auth }: PageProps) {
    const { orders } = usePage().props as { 
        orders: {
            data: Order[];
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            links: { url: string | null; label: string; active: boolean }[];
        }; 
    };
    const columns = [
        { label: 'ID', render: (item: any) => item.id },
        { label: 'Produk', render: (item: any) => item.product?.name || 'N/A' },
        { label: 'Jumlah', render: (item: any) => item.quantity },
        { label: 'Status', render: (item: any) => item.status },
        { label: 'Tanggal', render: (item: any) => new Date(item.created_at).toLocaleDateString() },
    ]

    const actions = (order: any) => (
        <div className="flex space-x-2">
            <Link
                href={route('supplier.orders.show', order.id)}
                className="text-blue-500 hover:underline"
            >
                Detail
            </Link>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Manajemen Order</h1>
                <p>Selamat datang, {auth.user.name}</p>
                <div className="mt-6">
                    <h2 className="font-semibold mb-2">Daftar Order</h2>
                   <DataTable
                        data={orders.data}
                        columns={columns}
                        actions={actions}/>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                    <div>
                        Showing{" "}
                        {(orders.current_page - 1) * orders.per_page + 1} to{" "}
                        {Math.min(
                            orders.current_page * orders.per_page,
                            orders.total
                        )}{" "}
                        of {orders.total} entries
                    </div>
                    <Pagination links={orders.links} />
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}