<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Payment;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
     public function index()
    {
         return Inertia::render('Admin/Dashboard', [
        'stats' => [
            'userCount' => User::count(),
            'supplierCount' => User::role('Supplier')->count(),
            'retailCount' => User::role('Retail')->count(),
            'purchaseOrderCount' => PurchaseOrder::count(),
            'paymentCount' => Payment::count('id'),
            'productCount' => Product::count(),
            'inventoryCount' => Inventory::count('id'),

        ]
    ]);
    }
}
