import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage, Head } from "@inertiajs/react";
import { Product } from "@/types";

interface Inventory {
    id: number;
    product: Product;
    quantity: number;
    cost_price: number;
    selling_price: number;
}

const EditInventory = () => {
    const { inventory } = usePage().props as any as { inventory: Inventory };

    const { data, setData, put, processing, errors } = useForm({
        quantity: inventory.quantity || "",
        cost_price: inventory.cost_price || "",
        selling_price: inventory.selling_price || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("inventory.update", inventory.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Inventory
                </h2>
            }
        >
            <Head title="Edit Inventory" />
            <div className="max-w-4xl mx-auto p-6">
                <h3 className="font-bold text-lg mb-4">
                    Edit Inventory: {inventory.product.name}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Quantity (Stok)
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.quantity && (
                            <div className="text-red-500 text-xs">
                                {errors.quantity}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="cost_price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Harga Modal (Cost Price)
                        </label>
                        <input
                            type="number"
                            id="cost_price"
                            name="cost_price"
                            value={data.cost_price}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.cost_price && (
                            <div className="text-red-500 text-xs">
                                {errors.cost_price}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="selling_price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Harga Jual (Selling Price)
                        </label>
                        <input
                            type="number"
                            id="selling_price"
                            name="selling_price"
                            value={data.selling_price}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.selling_price && (
                            <div className="text-red-500 text-xs">
                                {errors.selling_price}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update Inventory
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditInventory;
