<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $category = Category::inRandomOrder()->first();
        return [
            'name' => $this->faker->word,
            'sku' => $this->faker->word,
            'price' => $this->faker->randomFloat(2, 5, 100),
            'category_id' => $category->id,
            'quantity' => $this->faker->numberBetween(0, 50),
        ];
    }
}
