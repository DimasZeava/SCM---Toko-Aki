<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index() {
        return Inertia::render('Retail/PurchaseOrders/Index', [
            'title' => 'Purchase Orders',
        ]);
    }
}
