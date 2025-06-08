<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PurchaseOrder;
use App\POStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(request $request)
    {
        $perPage = $request->input('per_page', 5);
        $purchaseOrders = PurchaseOrder::with('retail')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('Supplier/Orders/Index', [
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['purchaseOrder.retail', 'purchaseOrder.supplier', 'purchaseOrder.orders.product']);
        return Inertia::render('Supplier/Orders/Show', [
            'purchaseOrder' => $order->purchaseOrder,
        ]);
    }

    public function answer(Request $request, PurchaseOrder $purchaseOrder, Order $order)
    {
        $validated = $request->validate([
        'status' => ['required', 'string', 'in:approved,rejected'], // or use POStatusEnum::values()
        ]);

        $status = POStatusEnum::from($validated['status']);
        $purchaseOrder->status = $status->value;
        $purchaseOrder->save();

        $order->status = $status->value;
        $order->save();

        return redirect()->back()->with('success', 'Status updated successfully.');
    }
}
