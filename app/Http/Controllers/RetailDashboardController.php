<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RetailDashboardController extends Controller
{
    public function index() {
        return Inertia::render('Retail/Dashboard', [
            'title' => 'Retail Dashboard',
        ]);
    }
}
