<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $fillable = [
        'retail_id',
        'supplier_id',
        'product_id',
        'quantity',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'status' => 'string',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
