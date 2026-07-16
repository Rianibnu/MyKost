<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Kost;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $partner = User::create([
            'name' => 'Juragan Kost',
            'email' => 'partner@example.com',
            'password' => Hash::make('password'),
            'role' => 'partner'
        ]);

        $user = User::create([
            'name' => 'Pencari Kost',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);

        $kost = Kost::create([
            'partner_id' => $partner->id,
            'name' => 'Kost Eksklusif Senayan',
            'description' => 'Kost eksklusif dengan fasilitas lengkap di pusat kota. Dekat dengan perkantoran dan mall.',
            'address' => 'Jl. Senayan Buntu No. 12',
            'city' => 'Jakarta Selatan',
            'rules' => 'Dilarang membawa hewan peliharaan. Jam malam pukul 23:00.'
        ]);

        Room::create([
            'kost_id' => $kost->id,
            'name' => 'Kamar VIP',
            'type' => 'VIP',
            'capacity' => 1,
            'price_per_month' => 2500000,
            'stock' => 5
        ]);

        Room::create([
            'kost_id' => $kost->id,
            'name' => 'Kamar Standard',
            'type' => 'Standard',
            'capacity' => 2,
            'price_per_month' => 1500000,
            'stock' => 10
        ]);
        
        $kost2 = Kost::create([
            'partner_id' => $partner->id,
            'name' => 'Kost Nyaman Dago',
            'description' => 'Kost nyaman dan murah untuk mahasiswa.',
            'address' => 'Jl. Dago Asri No. 9',
            'city' => 'Bandung',
            'rules' => 'Tamu menginap dikenakan biaya tambahan.'
        ]);

        Room::create([
            'kost_id' => $kost2->id,
            'name' => 'Kamar Reguler',
            'type' => 'Reguler',
            'capacity' => 1,
            'price_per_month' => 800000,
            'stock' => 15
        ]);
    }
}
