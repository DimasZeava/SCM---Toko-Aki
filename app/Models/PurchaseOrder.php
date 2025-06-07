<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'retail_id',
        'supplier_id',
        'status',
        'total_amount',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'po_id');
    }

    public function supplier()
    {
        return $this->belongsTo(User::class, 'supplier_id');
    }
    public function retail()
    {
        return $this->belongsTo(User::class, 'retail_id');
    }
}
