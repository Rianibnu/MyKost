<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'kost_id',
        'name',
        'type',
        'capacity',
        'price_per_month',
        'stock',
    ];

    public function kost()
    {
        return $this->belongsTo(Kost::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
