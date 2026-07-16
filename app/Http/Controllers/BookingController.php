<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->with(['room.kost', 'payment'])
            ->latest()
            ->get();
            
        return Inertia::render('Dashboard/User/Bookings', [
            'bookings' => $bookings
        ]);
    }

    public function store(Request $request, Room $room)
    {
        $request->validate([
            'start_date' => 'required|date|after_or_equal:today',
            'duration_months' => 'required|integer|min:1',
        ]);

        // Validasi stok
        if ($room->stock < 1) {
            return back()->withErrors(['room' => 'Maaf, kamar ini sudah penuh.']);
        }

        $total_price = $room->price_per_month * $request->duration_months;

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'room_id' => $room->id,
            'start_date' => $request->start_date,
            'duration_months' => $request->duration_months,
            'total_price' => $total_price,
            'status' => 'pending'
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $total_price,
            'payment_method' => 'manual_transfer',
            'status' => 'pending'
        ]);

        return redirect()->route('bookings.index')->with('success', 'Booking berhasil dibuat! Silakan lakukan pembayaran.');
    }

    public function pay(Request $request, Booking $booking)
    {
        // Pastikan hanya user yang punya booking yang bisa bayar
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        // Simulasi dummy payment (auto verify)
        $payment = $booking->payment;
        if ($payment && $payment->status === 'pending') {
            $payment->update([
                'status' => 'verified'
            ]);
            
            // Status booking jadi menunggu konfirmasi partner
            // (biarkan pending, partner yang konfirmasi)
        }

        return back()->with('success', 'Pembayaran berhasil dikonfirmasi! Menunggu persetujuan pemilik kost.');
    }
}
