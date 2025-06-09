import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Payment, PurchaseOrder } from '@/types';
import DataTable from '@/Components/DataTable';

const PaymentShow = () => {
  const { payment } = usePage().props as {
    payment: Payment & { purchase_order?: PurchaseOrder };
  };

  const purchaseOrder = payment.purchase_order;

  type FormData = {
    payment_method: string;
  };

  const { data, setData, put, processing, errors } = useForm<FormData>({
    payment_method: payment.payment_method || '',
    shipping_address: purchaseOrder?.shipping_address || '',
  });

  const handlePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('payments.update', payment.id), {
      onSuccess: () => {
        window.location.href = route('payments.index');
      },
    });
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
        <h1 className="text-xl font-bold mb-4">Detail Pembayaran</h1>
        <div className="mb-4">
          <div>PO ID: {payment.po_id}</div>
          <div>Amount: Rp {payment.amount}</div>
          <div>Status: {payment.status}</div>
          <div>Tanggal: {payment.created_at?.slice(0, 10)}</div>
          <div>
            <span className="font-semibold">Alamat Pengiriman:</span>{' '}
            {purchaseOrder?.shipping_address ?? '-'}
          </div>
        </div>
        <DataTable
          data={purchaseOrder?.orders ?? []}
          columns={columns}
        />
        <form onSubmit={handlePaymentMethod} className="mb-4">
          <label className="block mb-2 font-semibold">Metode Pembayaran</label>
          <select
            value={data.payment_method}
            onChange={e => setData('payment_method', e.target.value)}
            className="border px-3 py-2 rounded w-full mb-2"
            disabled={processing}
            required
          >
            <option value="">Pilih metode pembayaran</option>
            <option value="bca">BCA</option>
            <option value="bni">BNI</option>
            <option value="mandiri">Mandiri</option>
            <option value="cash">Cash</option>
          </select>
          {errors.payment_method && (
            <div className="text-red-500">{errors.payment_method}</div>
          )}

          <label className="block mb-2 font-semibold mt-4">Alamat Pengiriman</label>
            <input
                type="text"
                value={data.shipping_address}
                onChange={e => setData('shipping_address', e.target.value)}
                className="border px-3 py-2 rounded w-full mb-2"
                disabled={processing}
                required
            />
            {errors.shipping_address && (
                <div className="text-red-500">{errors.shipping_address}</div>
            )}

          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Bayar
          </button>
        </form>
      </div>
      <Link
        href={route('payments.index')}
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        &larr; Kembali ke Daftar Pembayaran
      </Link>
    </AuthenticatedLayout>
  );
};

export default PaymentShow;