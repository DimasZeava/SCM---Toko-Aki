<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index(Request $request) {
        $products = Product::all();
        $purchaseOrders = $products;
        return Inertia::render('Retail/PurchaseOrders/Index', [
            'title' => 'Purchase Orders',
            'products' => $products,
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $supplier = \App\Models\User::role('Supplier')->first();

        PurchaseOrder::create([
            'retail_id' => Auth::id(),
            'supplier_id' => $supplier ? $supplier->id : null,
            'total_amount' => Product::find($validated['product_id'])->price * $validated['quantity'],
            'status' => 'pending',
        ]);

        Order::create([
            'po_id' => PurchaseOrder::latest()->first()->id,
            'product_id' => $validated['product_id'],
            'quantity' => $validated['quantity'],
            'total_price' => Product::find($validated['product_id'])->price * $validated['quantity'],
            'status' => 'pending',
            'shipping_address' => $request->input('shipping_address', 'Default Address'),
        ]);

        return redirect()->back()->with('success', 'Purchase Order created!');
    }
}
