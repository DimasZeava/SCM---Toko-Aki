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

  const { data, setData, put, processing, errors } = useForm({
  status: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = purchaseOrder.orders?.[0]?.id;
    if (!orderId) {
      alert('Order ID not found.');
      return;
    }
    put(
      route('supplier.orders.answer', { purchaseOrder: purchaseOrder.id, order: orderId }),
      {
        data: { status: data.status },
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
      <div className="p-6">
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
        <form className="flex gap-2 items-center mt-4" onSubmit={handleSubmit}>
          <select
            name="status"
            value={data.status}
            onChange={e => setData('status', e.target.value)}
            className="border rounded px-2 py-1"
            required
          >
            <option value="">Pilih Status</option>
            <option value="approved">Setujui</option>
            <option value="rejected">Tolak</option>
          </select>
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded"
          >
            Update Status
          </button>
        </form>
        {errors.status && <div className="text-red-500">{errors.status}</div>}
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