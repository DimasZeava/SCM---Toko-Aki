<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $products = Product::with('supplier')->orderBy('created_at', 'desc')->paginate($perPage);
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Product/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'sku' => 'required|string|max:255',
        ]);
        $validated['supplier_id'] = Auth::id();
        // Create the product
        Product::create($validated);

        // Redirect or return as needed
        return redirect()->route('products.index')->with('success', 'Product created!');
    }

    public function show($id) {}

    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'sku' => 'required|string|max:255',
        ]);
        if ($product->supplier_id !== Auth::id()) {
        abort(403);
    }
        $product->update($validated);
        return redirect()->route('products.index')->with('success', 'Product updated!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted!');
    }
}
