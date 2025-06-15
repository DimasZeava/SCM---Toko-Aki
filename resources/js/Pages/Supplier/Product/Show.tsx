import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
}

interface ViewProps {
    product: Product;
}

const View = ({ product }: ViewProps) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Product
                </h2>
            }
        >
            <div className="max-w-xl mx-auto mt-8 bg-white shadow rounded p-6">
                <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                <div className="mb-2">
                    <span className="font-semibold">Description:</span>
                    <p>{product.description}</p>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Price:</span>
                    <span> Rp {product.price.toLocaleString()}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Stock:</span>
                    <span> {product.stock}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">SKU:</span>
                    <span> {product.sku}</span>
                </div>
                <Link
                    href={route("products.index")}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    &larr; Kembali ke Daftar Produk
                </Link>
            </div>
        </AuthenticatedLayout>
    );
};

export default View;
