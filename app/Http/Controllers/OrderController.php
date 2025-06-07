<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\POStatusEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(request $request)
    {
    $perPage = $request->input('per_page', 5);
    $orders = Order::with('product')
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);
        return Inertia::render('Supplier/Orders/Index', [
            'title' => 'Orders',
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        return Inertia::render('Supplier/Orders/Show', [
            'title' => 'Order Details',
            'order' => $order,
        ]);
    }

    public function answer(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $order->status = $validated['status'] === 'approved'
            ? POStatusEnum::Approved->value
            : POStatusEnum::Rejected->value;
        $order->save();

        return redirect()->back()->with('success', 'Order status updated!');
    }
}
