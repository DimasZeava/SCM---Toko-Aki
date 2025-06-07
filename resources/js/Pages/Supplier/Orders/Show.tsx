import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage, router } from '@inertiajs/react';

const Show = () => {
  const { order } = usePage().props as { order: any };
  const { data, setData, post, processing, errors } = useForm({
    status: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('supplier.orders.answer', order.id));
  };

  return (
    <AuthenticatedLayout>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Detail Order</h1>
      <div className="mb-4">
        <div>Produk: {order.product?.name}</div>
        <div>Jumlah: {order.quantity}</div>
        <div>Status: {order.status}</div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <select
          className="border rounded px-2 py-1"
          value={data.status}
          onChange={e => setData('status', e.target.value)}
          required
        >
          <option value="" disabled>Pilih aksi</option>
          <option value="approved">Setujui</option>
          <option value="rejected">Tolak</option>
        </select>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kirim Jawaban
        </button>
      </form>
      {errors.status && <div className="text-red-500">{errors.status}</div>}
    </div>
    </AuthenticatedLayout>
  );
};

export default Show;