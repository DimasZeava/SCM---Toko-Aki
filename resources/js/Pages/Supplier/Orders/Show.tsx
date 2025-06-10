import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { PurchaseOrder } from '@/types';

const Show = () => {
  const { purchaseOrder } = usePage().props as {
    purchaseOrder: {
      id: number;
      retail: { name: string };
      supplier: { name: string };
      status: string;
      total_amount: number;
      orders: { id: number; product?: { name: string; price: number }; quantity: number }[];
      created_at: string;
      updated_at: string;
    };
  };

 type FormData = {
    status: string;
  };

  const { data, setData, put, processing, errors } = useForm<FormData>({
    status: '',
  });

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    setData('status', status);
    put(
      route('supplier.purchase-orders.answer', { purchaseOrder: purchaseOrder.id }),
      {
        onSuccess: () => setData('status', ''),
      }
    );
  };

  const columns = [
    { label: 'Produk', render: (item: any) => item.product?.name ?? '-' },
    { label: 'Jumlah', render: (item: any) => item.quantity },
    { label: 'Harga', render: (item: any) => item.product?.price ? `Rp ${item.product.price}` : '-' },
    { label: 'Subtotal', render: (item: any) => item.product?.price ? `Rp ${item.quantity * item.product.price}` : '-' },
  ];

  return (
    <AuthenticatedLayout>
      <div className="p-6 card bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Detail Purchase Order</h1>
        <div className="mb-4">
          <div>Retail: {purchaseOrder.retail?.name}</div>
          <div>Supplier: {purchaseOrder.supplier?.name}</div>
          <div>Status: {purchaseOrder.status}</div>
          <div>Total: Rp {purchaseOrder.total_amount}</div>
        </div>
        <h2 className="font-semibold mb-2">Daftar Item</h2>
        <DataTable
          data={purchaseOrder.orders ?? []}
          columns={columns}
        />
        {!['approved', 'rejected'].includes(purchaseOrder.status) && (
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => handleStatusChange('approved')}
              disabled={processing}
              className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded"
            >
              Setujui Purchase Order
            </button>
            <button
              type="button"
              onClick={() => handleStatusChange('rejected')}
              disabled={processing}
              className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded"
            >
              Tolak Purchase Order
            </button>
          </div>
        )}
      </div>
      <Link
        href={route('supplier.orders.index')}
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        &larr; Kembali ke Daftar Order
      </Link>
    </AuthenticatedLayout>
  );
};

export default Show;