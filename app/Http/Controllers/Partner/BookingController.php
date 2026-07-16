<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $kostIds = Kost::where('partner_id', Auth::id())->pluck('id');

        $bookings = Booking::whereHas('room', function ($query) use ($kostIds) {
            $query->whereIn('kost_id', $kostIds);
        })
            ->with(['user', 'room.kost', 'payment'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Partner/Bookings', [
            'bookings' => $bookings
        ]);
    }

    public function confirm(Booking $booking)
    {
        // Verify ownership
        $kost = $booking->room->kost;
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $booking->update(['status' => 'confirmed']);

        // Kurangi stok kamar
        $room = $booking->room;
        if ($room->stock > 0) {
            $room->decrement('stock');
        }

        return back()->with('success', 'Booking dikonfirmasi!');
    }

    public function reject(Booking $booking)
    {
        $kost = $booking->room->kost;
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $booking->update(['status' => 'rejected']);

        // Refund: set payment status to failed
        if ($booking->payment) {
            $booking->payment->update(['status' => 'failed']);
        }

        return back()->with('success', 'Booking ditolak.');
    }
}
