<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Kost;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function index(Kost $kost)
    {
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $kost->load('rooms');

        return Inertia::render('Dashboard/Partner/Rooms', [
            'kost' => $kost
        ]);
    }

    public function store(Request $request, Kost $kost)
    {
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $kost->rooms()->create($validated);

        return back()->with('success', 'Kamar berhasil ditambahkan!');
    }

    public function update(Request $request, Room $room)
    {
        $kost = $room->kost;
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price_per_month' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $room->update($validated);

        return back()->with('success', 'Kamar berhasil diperbarui!');
    }

    public function destroy(Room $room)
    {
        $kost = $room->kost;
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $room->delete();

        return back()->with('success', 'Kamar berhasil dihapus!');
    }
}
