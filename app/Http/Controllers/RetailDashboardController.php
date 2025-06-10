<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RetailDashboardController extends Controller
{
    public function index() {
        $totalCompletedPaymentsAmount = Payment::where('status', 'completed')->sum('amount');
        $totalPurchaseOrders = PurchaseOrder::count();

        $recentPurchaseOrders = PurchaseOrder::with('supplier')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $statusCounts = [
        'completed' => PurchaseOrder::where('status', 'completed')->count(),
        'pending'   => PurchaseOrder::where('status', 'pending')->count(),
        'approved'  => PurchaseOrder::where('status', 'approved')->count(),
        'rejected'  => PurchaseOrder::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Retail/Dashboard', [
            'title' => 'Retail Dashboard',
            'totalCompletedPaymentsAmount' => $totalCompletedPaymentsAmount,
            'totalPurchaseOrders' => $totalPurchaseOrders,
            'recentPurchaseOrders' => $recentPurchaseOrders,
            'statusCounts' => $statusCounts,
        ]);
    }
}
