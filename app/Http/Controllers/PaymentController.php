<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Payment;
use App\Models\Purchase;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
     public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10); 
        $payments = Payment::with('purchaseOrder')->orderBy('created_at', 'desc')->paginate($per_page);

        $approvedPurchaseOrders = PurchaseOrder::where('status', 'approved')->get();

        return Inertia::render('Retail/Payments/Index', [
            'title' => 'Payment',
            'payments' => $payments,
            'approvedPurchaseOrders' => $approvedPurchaseOrders,
        ]);
    }

    public function show(Payment $payment)
    {
        $payment->load(['purchaseOrder.orders.product']);
        return Inertia::render('Retail/Payments/Show', [
            'title' => 'Payment Details',
            'payment' => $payment,
        ]);
    }

    public function create()
    {
        return Inertia::render('Retail/Payments/Create', [
            'title' => 'Create Payment',
        ]);
    }

    public function update(Request $request, Payment $payment)
{
    $validated = $request->validate([
        'payment_method' => 'required|string|max:255',
        'shipping_address' => 'required|string|max:255',
    ]);

    $payment->payment_method = $validated['payment_method'];
    $payment->status = 'completed';
    $payment->save();

    if ($payment->purchaseOrder && $payment->purchaseOrder->orders) {
        foreach ($payment->purchaseOrder->orders as $order) {
            $order->shipping_address = $validated['shipping_address'];
            $order->save();

            $inventory = Inventory::where('retail_id', $payment->retail_id ?? 1)
            ->where('product_id', $order->product_id)
            ->first();

        if ($inventory) {
            $inventory->quantity += $order->quantity;
            if ($inventory->quantity < 0) {
                $inventory->quantity = 0;
            }
            $inventory->save();
        } else {
            Inventory::create([
                'retail_id' => $payment->retail_id ?? 1,
                'product_id' => $order->product_id,
                'quantity' => $order->quantity,
                'cost_price' => 0,
                'selling_price' => 0,
            ]);
        }
        }
    }

    return redirect()->route('payments.show', $payment->id)
        ->with('success', 'Metode pembayaran berhasil disimpan.');
}
}
