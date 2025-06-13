<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupplierDashboardController extends Controller
{
    public function index()
    {
        // Semua produk (tanpa filter supplier_id)
        $totalSuppliedProducts = Product::count();

        // Semua PO (tanpa filter supplier_id)
        $purchaseOrders = PurchaseOrder::query();

        $totalPurchaseOrders = $purchaseOrders->count();
        $totalPendingOrders = (clone $purchaseOrders)->where('status', 'pending')->count();
        $totalCompletedOrders = (clone $purchaseOrders)->where('status', 'approved')->count();

        // PO terbaru (misal 5 terakhir, tanpa filter supplier_id)
        $recentPurchaseOrders = PurchaseOrder::with('retail')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $pendingCount = $totalPendingOrders;
        $statusMessage = $pendingCount > 0 ? "Ada $pendingCount Purchase Order yang perlu diproses." : "";

        return Inertia::render('Supplier/Dashboard', [
            'totalSuppliedProducts' => $totalSuppliedProducts,
            'totalPurchaseOrders' => $totalPurchaseOrders,
            'totalPendingOrders' => $totalPendingOrders,
            'totalCompletedOrders' => $totalCompletedOrders,
            'recentPurchaseOrders' => $recentPurchaseOrders,
            'pendingCount' => $pendingCount,
            'statusMessage' => $statusMessage,
        ]);
    }
}
