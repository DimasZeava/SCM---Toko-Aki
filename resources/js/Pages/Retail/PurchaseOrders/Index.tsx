import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function PurchaseOrderIndex() {
    const { products, purchaseOrders } = usePage().props as {
        products: { id: number; name: string; stock: number }[];
        purchaseOrders: any[];
    };

    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        router.post(route('retail.purchase-orders.store'), {
            product_id: selectedProduct,
            quantity,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Daftar Purchase Order</h1>
                <form onSubmit={handleSubmit} className="mb-4 flex gap-2 items-end">
                    <div>
                        <label className="block text-sm">Pilih Produk</label>
                        <select
                            className="border rounded px-2 py-1"
                            value={selectedProduct ?? ''}
                            onChange={e => setSelectedProduct(Number(e.target.value))}
                            required
                        >
                            <option value="" disabled>Pilih produk</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} (Stok: {product.stock})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm">Jumlah</label>
                        <input
                            type="number"
                            min={1}
                            className="border rounded px-2 py-1"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        + Buat Purchase Order
                    </button>
                </form>
                <div className="bg-white rounded shadow p-4">
                    <h2 className="font-semibold mb-2">Purchase Orders</h2>
                    {purchaseOrders.length === 0 ? (
                        <p className="text-gray-500">Belum ada PO yang dibuat.</p>
                    ) : (
                        <ul>
                            {purchaseOrders.map(po => (
                                <li key={po.id}>
                                    {po.product?.name ?? 'Produk'} - Qty: {po.quantity} - Status: {po.status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}