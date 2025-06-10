<?php

namespace App\Providers;

use App\Models\Inventory;
use App\Models\PurchaseOrder;
use App\POStatusEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'csrf_token' => csrf_token(),
            'lowStockCount' => function () {
                return Inventory::where('quantity', '<=', 10)->count();
            },
            'lowStockNames' => function () {
                return Inventory::where('quantity', '<=', 10)
                    ->with('product')
                    ->get()
                    ->pluck('product.name')
                    ->filter()
                    ->unique()
                    ->implode(', ');
            },
            'pendingCount' => function () {
                return PurchaseOrder::where('status', POStatusEnum::Pending->value)->count();
            },
            'statusMessage' => function () {
                $pendingCount = PurchaseOrder::where('status', POStatusEnum::Pending->value)->count();
                return "Ada {$pendingCount} purchase order yang menunggu persetujuan anda.";
            },
        ]);
    }
}
