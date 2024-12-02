<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $totalProducts = Product::select('id')->count();
        $totalCategories = Category::select('id')->count();
        return $this->successJsonResponse("found", compact('totalProducts', 'totalCategories'));
    }
}
