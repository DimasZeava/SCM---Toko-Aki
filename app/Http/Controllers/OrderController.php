<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
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

            
        $pendingCount = PurchaseOrder::where('status', POStatusEnum::Pending->value)->count();
        $statusMessage = "Ada {$pendingCount} purchase order yang menunggu persetujuan anda.";

        return Inertia::render('Supplier/Orders/Index', [
            'purchaseOrders' => $purchaseOrders,
            'pendingCount' => $pendingCount,
            'statusMessage' => $statusMessage,
        ]);
    }

    public function show($id)
    {
        $purchaseOrder = PurchaseOrder::with(['retail', 'supplier', 'orders.product'])->findOrFail($id);

        return Inertia::render('Supplier/Orders/Show', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }

    public function answer(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
        'status' => ['required', 'string', 'in:approved,rejected'],
        ]);

        $status = POStatusEnum::from($validated['status']);
        $purchaseOrder->status = $status->value;
        $purchaseOrder->save();

        if ($status->value === 'approved') {
            Payment::create([
                'po_id' => $purchaseOrder->id,
                'amount' => $purchaseOrder->total_amount,
                'payment_method' => '',
                'status' => 'approved',
            ]);
        }

        return redirect()->back()->with('success', 'Status updated successfully.');
    }
}
