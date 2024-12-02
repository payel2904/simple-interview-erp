<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
       if( $categories = Category::select('id', 'name')->get()) {
           return $this->successJsonResponse('Categories Found', $categories);
       }

       return $this->errorJsonResponse('Categories not found');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if($category = Category::create($validated)) {
            return $this-> successJsonResponse('Category Create Successfully', $category);
        }

        return $this->errorJsonResponse('Failed to create category');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): JsonResponse
    {
        return $this->successJsonResponse('Category Found', $category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        $validated = $request->validated();

        if($category->fill($validated)->save()) {
            return $this->successJsonResponse('Category Updated Successfully', $category);
        }

        return $this->errorJsonResponse('Failed to update category');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): JsonResponse
    {
        if (Product::select('id')->where('category_id', $category->id)->exists()) {
            return $this->errorJsonResponse("Dependency Found! Can't delete category");
        }

        if ($category->delete()) {
            return $this->successJsonResponse('Category Deleted Successfully');
        }

        return $this->errorJsonResponse('Failed to delete category');
    }
}
