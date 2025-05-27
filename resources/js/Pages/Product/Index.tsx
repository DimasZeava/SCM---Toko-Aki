import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

const Index = () => {
  const { products } = usePage().props;

  return (
    <AuthenticatedLayout>
        <Head title="Product List" />
        <div>
        <h1 className="text-xl font-bold mb-4">Product List</h1>
        <ul>
            {products.map((product) => (
            <div>
            <li key={product.id} className="mb-2">
                {product.name}
            </li>
            <div className="text-sm text-gray-600">
                <p>{product.description}</p>
                <p>Price: Rp {product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>SKU: {product.sku}</p>
                <p>Created At: {new Date(product.created_at).toLocaleDateString()}</p>
                <p>Updated At: {new Date(product.updated_at).toLocaleDateString()}</p>
            </div>
            <Link href={route('products.edit', product.id)} className="text-blue-500 hover:underline">
                Edit
            </Link>
            <button
                onClick={() => router.delete(route('products.destroy', product.id))}
                className="text-blue-500 hover:underline ml-2 bg-transparent border-none p-0 cursor-pointer"
                type="button"
            >
                Delete
            </button>
            </div>
            ))}
        </ul>
        <Link href={route('products.create')} className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add New Product
            </button>
        </Link>
        </div>
    </AuthenticatedLayout>
  );
}

export default Index;