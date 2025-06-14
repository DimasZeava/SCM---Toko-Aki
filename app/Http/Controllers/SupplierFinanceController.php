<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierFinanceController extends Controller
{
    public function index()
    {
        // Ambil semua PO yang sudah approved/paid
        $finance = PurchaseOrder::with('retail')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        // Total pemasukan
        $totalIncome = $finance->sum('total_amount');

        return Inertia::render('Supplier/Finance/Index', [
            'finance' => $finance,
            'totalIncome' => $totalIncome,
        ]);
    }
}
