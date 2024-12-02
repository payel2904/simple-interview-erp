<?php

namespace App\Models;

use App\Http\Requests\CategoryRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'sku', 'quantity', 'price', 'category_id'];

    protected $appends = ['price'];

    public function getPriceAttribute()
    {
        return number_format($this->attributes['price'], 2, '.', '');
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
