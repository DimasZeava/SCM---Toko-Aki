<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\User;
use App\POStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10); 
        $purchaseOrders = PurchaseOrder::with('supplier','retail')->orderBy('created_at', 'desc')->paginate($per_page);
        return Inertia::render('Retail/PurchaseOrders/Index', [
            'title' => 'Purchase Orders',
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    public function create()
    {
        $suppliers = User::role('Supplier')->get();
        $products = Product::with('supplier')->get();
        return Inertia::render('Retail/PurchaseOrders/Create', [
            'title' => 'Create Purchase Order',
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    public function edit($id)
    {
        $suppliers = User::role('Supplier')->get();
        $products = Product::all();
        $purchaseOrder = PurchaseOrder::with(['orders.product'])->findOrFail($id);
        return Inertia::render('Retail/PurchaseOrders/Edit', [
            'title' => 'Edit Purchase Order',
            'purchaseOrder' => $purchaseOrder,
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        // Simpan PO utama
        $purchaseOrder = PurchaseOrder::create([
            'retail_id' => Auth::id(),
            'supplier_id' => $validated['supplier_id'],
            'status' => POStatusEnum::Pending->value,
            'total_amount' => $validated['total_amount'],
        ]);

        // Simpan detail produk ke tabel orders
        foreach ($validated['items'] as $item) {
            Order::create([
                'po_id' => $purchaseOrder->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'total_price' => $item['price'] * $item['quantity'],
                'status' => 'pending',
                'shipping_address' => '',
            ]);
        }

        return redirect()->route('retail.purchase-orders.index')->with('success', 'Purchase Order created successfully!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:users,id',
            'status' => 'required|string',
            'total_amount' => 'required|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $purchaseOrder = PurchaseOrder::findOrFail($id);
        $purchaseOrder->update([
            'supplier_id' => $validated['supplier_id'],
            'status' => $validated['status'],
            'total_amount' => $validated['total_amount'],
        ]);

        // Hapus semua detail lama
        $purchaseOrder->orders()->delete();

        // Simpan detail produk baru
        foreach ($validated['items'] as $item) {
            Order::create([
                'po_id' => $purchaseOrder->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'total_price' => $item['price'] * $item['quantity'],
                'status' => 'pending', // atau sesuai kebutuhan
                'shipping_address' => '', // isi jika ada
            ]);
        }

        return redirect()->route('retail.purchase-orders.index')->with('success', 'Purchase Order updated successfully!');
    }

    public function show($id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);
        // Logic to show a specific purchase order
        return Inertia::render('Retail/PurchaseOrders/Show', [
            'title' => 'Purchase Order Details',
            'purchaseOrder' => $purchaseOrder, // Replace with actual data retrieval logic
        ]);
    }

    public function destroy($id)
    {
        $purchaseOrder = PurchaseOrder::findOrFail($id);
        $purchaseOrder->delete();

        return redirect()->route('retail.purchase-orders.index')->with('success', 'Purchase Order deleted successfully!');
    }
}
