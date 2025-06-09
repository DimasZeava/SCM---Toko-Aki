import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Payment } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function PaymentsIndex({ auth }: PageProps) {
    const { payments } = usePage().props as { payments: { data: Payment[] } };

    const columns = [
        {
            label: 'PO ID',
            render: (payment: Payment) => payment.po_id,
        },
        {
            label: 'Amount',
            render: (payment: Payment) => `Rp ${payment.amount}`,
        },
        {
            label: 'Metode',
            render: (payment: Payment) => payment.payment_method,
        },
        {
            label: 'Status',
            render: (payment: Payment) => payment.status,
        },
        {
            label: 'Tanggal',
            render: (payment: Payment) => payment.created_at.slice(0, 10),
        },
    ];

    const actions = (payment: Payment) => {
    if (payment.status === 'completed') {
        return (
            <span className="bg-green-500 text-white px-3 py-1 rounded">
                Terbayar
            </span>
        );
    }
    if (payment.status === 'cancelled') {
        return (
            <span className="bg-red-500 text-white px-3 py-1 rounded">
                Dibatalkan
            </span>
        );
    }
    return (
        <Link
            href={route('payments.show', payment.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
            Bayar
        </Link>
    );
};

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Riwayat Pembayaran</h1>
                <div className="bg-white rounded shadow p-4">
                    <DataTable
                        columns={columns}
                        data={payments.data}
                        actions={actions}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}