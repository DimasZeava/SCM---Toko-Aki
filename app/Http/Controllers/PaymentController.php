<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
     public function index()
    {
        return Inertia::render('Retail/Payments/Index', [
            'title' => 'Payments',
        ]);
    }
}
