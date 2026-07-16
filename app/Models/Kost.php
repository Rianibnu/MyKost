<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kost extends Model
{
    protected $fillable = [
        'partner_id',
        'name',
        'description',
        'address',
        'city',
        'rules',
    ];

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
