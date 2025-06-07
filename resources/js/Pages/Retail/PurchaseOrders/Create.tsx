import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Product } from "@/types/index.d";

interface Supplier {
    id: number;
    name: string;
}

interface CreateProps {
    products: Product[];
    suppliers: Supplier[];
}

interface CartItem {
    product: Product;
    quantity: number;
}

export default function PurchaseOrderCreate({
    products,
    suppliers,
}: CreateProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [qtyInput, setQtyInput] = useState<{ [id: number]: number }>({});

    // Hitung total dari keranjang
    const totalAmount = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const { data, setData, post, processing, errors } = useForm({
        supplier_id: "",
        status: "pending",
        total_amount: totalAmount,
        items: cart.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
        })),
    });

    // Update total_amount setiap cart berubah
    React.useEffect(() => {
        setData("total_amount", totalAmount);
        setData(
            "items",
            cart.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            }))
        );
    }, [totalAmount, cart]);

    const addToCart = (product: Product, quantity: number) => {
        if (!quantity || quantity < 1) return;
        setCart((prev) => {
            const exist = prev.find((item) => item.product.id === product.id);
            if (exist) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateCartQty = (productId: number, qty: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: qty }
                    : item
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("purchase-orders.store"));
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Buat Purchase Order</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form PO */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded shadow p-6 space-y-4 md:col-span-1"
                    >
                        <div>
                            <label className="block mb-1 font-medium">
                                Nama Supplier
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={data.supplier_id}
                                onChange={(e) =>
                                    setData("supplier_id", e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Pilih Supplier
                                </option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && (
                                <div className="text-red-500 text-sm">
                                    {errors.supplier_id}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Status
                            </label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && (
                                <div className="text-red-500 text-sm">
                                    {errors.status}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Total Amount
                            </label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                value={totalAmount}
                                readOnly
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                            disabled={processing || cart.length === 0}
                        >
                            Simpan PO
                        </button>
                        {cart.length === 0 && (
                            <div className="text-xs text-gray-500 text-center mt-2">
                                Tambahkan produk ke PO sebelum submit.
                            </div>
                        )}
                    </form>

                    {/* Keranjang PO */}
                    <div className="md:col-span-2">
                        <h2 className="text-lg font-semibold mb-2">
                            Keranjang Produk PO
                        </h2>
                        {cart.length === 0 ? (
                            <div className="text-gray-500 mb-4">
                                Belum ada produk di PO.
                            </div>
                        ) : (
                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-full bg-white rounded shadow">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left">
                                                Produk
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                Qty
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                Harga
                                            </th>
                                            <th className="px-3 py-2 text-left">
                                                Subtotal
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.product.id}>
                                                <td className="px-3 py-2">
                                                    {item.product.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="w-16 border rounded px-2 py-1"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateCartQty(
                                                                item.product.id,
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    Rp {item.product.price}
                                                </td>
                                                <td className="px-3 py-2">
                                                    Rp{" "}
                                                    {item.product.price *
                                                        item.quantity}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:underline"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.product.id
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* List Produk Supplier */}
                        <h2 className="text-lg font-semibold mb-2">
                            Produk Supplier
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded shadow p-4 flex flex-col"
                                >
                                    <div className="font-bold text-lg">
                                        {product.name}
                                    </div>
                                    <div className="text-gray-600 mb-2">
                                        {product.description}
                                    </div>
                                    <div className="text-blue-600 font-semibold mb-2">
                                        Rp {product.price}
                                    </div>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <input
                                            type="number"
                                            min={1}
                                            className="w-16 border rounded px-2 py-1"
                                            placeholder="Qty"
                                            value={qtyInput[product.id] || ""}
                                            onChange={(e) =>
                                                setQtyInput((prev) => ({
                                                    ...prev,
                                                    [product.id]: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            onClick={() => {
                                                addToCart(
                                                    product,
                                                    qtyInput[product.id] || 1
                                                );
                                                setQtyInput((prev) => ({
                                                    ...prev,
                                                    [product.id]: 0,
                                                }));
                                            }}
                                        >
                                            Tambah ke PO
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
