<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'retail_id',
        'product_id',
        'quantity',
        'cost_price',
        'selling_price',
    ];

    public function retail()
    {
        return $this->belongsTo(User::class, 'retail_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
