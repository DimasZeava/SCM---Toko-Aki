<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Supplier/Dashboard', [
            'title' => 'Supplier Dashboard',
        ]);
    }
}
