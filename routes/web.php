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
        Route::get('retail/dashboard', [RetailDashboardController::class, 'index'])->name('retail.dashboard');
        Route::get('retail/purchase-orders', [PurchaseOrderController::class, 'index'])->name('retail.purchase-orders.index');
        Route::post('retail/purchase-orders', [PurchaseOrderController::class, 'store'])->name('retail.purchase-orders.store');
        Route::get('retail/purchase-orders/create', [PurchaseOrderController::class, 'create'])->name('retail.purchase-orders.create');
        Route::get('retail/purchase-orders/{id}/edit', [PurchaseOrderController::class, 'edit'])->name('retail.purchase-orders.edit');
        Route::put('retail/purchase-orders/{id}', [PurchaseOrderController::class, 'update'])->name('retail.purchase-orders.update');
        Route::delete('retail/purchase-orders/{id}', [PurchaseOrderController::class, 'destroy'])->name('retail.purchase-orders.destroy');
        Route::get('retail/purchase-orders/{id}', [PurchaseOrderController::class, 'show'])->name('retail.purchase-orders.show');
        Route::resource('retail/payments', PaymentController::class);
        Route::resource('retail/inventory', InventoryController::class);
    });

    // Route untuk role Supplier
    Route::middleware(['role:Supplier'])->group(function () {
        Route::get('/supplier/dashboard', [SupplierDashboardController::class, 'index'])->name('supplier.dashboard');
        Route::resource('supplier/products', ProductController::class);
        Route::get('supplier/orders', [OrderController::class, 'index'])->name('supplier.orders.index');
        Route::get('supplier/purchase-orders/{order}', [OrderController::class, 'show'])->name('supplier.orders.show');
        Route::put('/supplier/purchase-orders/{purchaseOrder}/answer', [OrderController::class, 'answer'])->name('supplier.purchase-orders.answer');
    });

    // Route untuk role Admin
    Route::middleware(['role:Admin'])->group(function () {
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('admin/users', UserController::class);
    });

    // Route untuk profile
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});

require __DIR__ . '/auth.php';
