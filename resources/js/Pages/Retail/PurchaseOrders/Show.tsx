import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

interface PurchaseOrder {
    id: number;
    retail_id: number;
    supplier_id: number;
    status: string;
    total_amount: number;
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    purchaseOrder: PurchaseOrder;
}

export default function PurchaseOrderShow({ purchaseOrder }: ShowProps) {
    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Detail Purchase Order</h1>
                <div className="bg-white rounded shadow p-4 mb-4">
                    <div><b>ID:</b> {purchaseOrder.id}</div>
                    <div><b>Retail ID:</b> {purchaseOrder.retail_id}</div>
                    <div><b>Supplier ID:</b> {purchaseOrder.supplier_id}</div>
                    <div><b>Status:</b> {purchaseOrder.status}</div>
                    <div><b>Total Amount:</b> Rp {purchaseOrder.total_amount}</div>
                    <div><b>Dibuat:</b> {(new Date(purchaseOrder.created_at)).toLocaleString()}</div>
                </div>
                <Link
                    href={route("purchase-orders.index")}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    &larr; Kembali ke Daftar PO
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
