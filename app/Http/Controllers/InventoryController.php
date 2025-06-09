<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10);
        $inventories = Inventory::with(['product', 'retail'])
            ->orderBy('created_at', 'desc')
            ->paginate($per_page);

        $allInventories = Inventory::all();
        $lowStock = $allInventories->filter(function ($inv) {
            return $inv->quantity <= 10;
        });

        $lowStockCount = $lowStock->count();

        $lowStockName = $lowStock->map(function ($inv) {
            return $inv->product->name;
        })->implode(', ');

        return Inertia::render('Retail/Inventory/Index', [
            'inventories' => $inventories,
            'lowStockCount' => $lowStockCount,
            'lowStockName' => $lowStockName,
        ]);
    }

    public function show($id)
    {
        $inventory = Inventory::with(['product', 'retail'])->findOrFail($id);
        return Inertia::render('Retail/Inventory/Show', [
            'inventory' => $inventory,
        ]);
    }

    public function edit($id)
    {
        $inventory = Inventory::with(['product', 'retail'])->findOrFail($id);
        return Inertia::render('Retail/Inventory/Edit', [
            'inventory' => $inventory,
        ]);
    }

    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory.index')->with('success', 'Inventory updated.');
    }

    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->delete();

        return redirect()->route('inventory.index')->with('success', 'Inventory deleted.');
    }
}
