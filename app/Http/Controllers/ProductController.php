<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        if ($products = Product::select('id', 'name', 'sku', 'quantity', 'price')->with('category:id,name')->get()->toArray(1)) {
            return $this->successJsonResponse('Product Found', $products);
        }

        return $this->errorJsonResponse('Product Not Found');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if ($product = Product::create($validated)) {
            return $this->successJsonResponse('Product Create Successfully', $product);
        }

        return $this->errorJsonResponse("Failed to create product");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): JsonResponse
    {
        return $this->successJsonResponse('Product Found', $product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product): JsonResponse
    {
        $validated = $request->validated();

        if ($product->fill($validated)->save()) {
            return $this->successJsonResponse('Product Updated Successfully', $product);
        }

        return $this->errorJsonResponse("Failed to update product");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): JsonResponse
    {
        if ($product->delete()) {
            return $this->successJsonResponse("Product Deleted Successfully");
        }

        return $this->errorJsonResponse("Failed to delete product");
    }
}
