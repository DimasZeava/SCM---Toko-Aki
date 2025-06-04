<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\RetailDashboardController;
use App\Http\Controllers\SupplierDashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route untuk role Retail
    Route::middleware(['role:Retail'])->group(function () {
        Route::get('retail/dashboard', [RetailDashboardController::class, 'index'])->name('dashboard'); // default dashboard retail
        Route::resource('retail/purchase-orders', PurchaseOrderController::class);
        Route::resource('retail/payments', PaymentController::class);
        Route::resource('retail/inventory', InventoryController::class);
    });

    // Route untuk role Supplier
    Route::middleware(['role:Supplier'])->group(function () {
        Route::get('/supplier/dashboard', [SupplierDashboardController::class, 'index'])->name('supplier.dashboard');
        Route::resource('supplier/products', ProductController::class);
        Route::resource('supplier/orders', OrderController::class);
    });

    // Route untuk role Admin
    Route::middleware(['role:Admin'])->group(function () {
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/users', UserController::class);
    });

    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

});

require __DIR__ . '/auth.php';
