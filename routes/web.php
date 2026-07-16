<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KostController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Partner\KostController as PartnerKostController;
use App\Http\Controllers\Partner\RoomController as PartnerRoomController;
use App\Http\Controllers\Partner\BookingController as PartnerBookingController;

// Public routes
Route::get('/', [KostController::class, 'home'])->name('home');
Route::get('/kosts', [KostController::class, 'index'])->name('kosts.index');
Route::get('/kosts/{kost}', [KostController::class, 'show'])->name('kosts.show');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard redirect based on role
    Route::get('dashboard', function () {
        $role = auth()->user()->role;
        if ($role === 'partner') {
            return redirect()->route('partner.dashboard');
        } elseif ($role === 'user') {
            return redirect()->route('bookings.index');
        }
        return inertia('dashboard');
    })->name('dashboard');

    // ============================================
    // User routes (role: user)
    // ============================================
    Route::middleware('role:user')->group(function () {
        Route::post('/kosts/{room}/book', [BookingController::class, 'store'])->name('bookings.store');
        Route::get('/my-bookings', [BookingController::class, 'index'])->name('bookings.index');
        Route::post('/my-bookings/{booking}/pay', [BookingController::class, 'pay'])->name('bookings.pay');
    });

    // ============================================
    // Partner routes (role: partner)
    // ============================================
    Route::middleware('role:partner')->prefix('partner')->name('partner.')->group(function () {
        // Dashboard
        Route::get('/dashboard', [PartnerKostController::class, 'dashboard'])->name('dashboard');

        // Kost CRUD
        Route::resource('kosts', PartnerKostController::class);

        // Room management
        Route::get('/kosts/{kost}/rooms', [PartnerRoomController::class, 'index'])->name('rooms.index');
        Route::post('/kosts/{kost}/rooms', [PartnerRoomController::class, 'store'])->name('rooms.store');
        Route::put('/rooms/{room}', [PartnerRoomController::class, 'update'])->name('rooms.update');
        Route::delete('/rooms/{room}', [PartnerRoomController::class, 'destroy'])->name('rooms.destroy');

        // Booking management
        Route::get('/bookings', [PartnerBookingController::class, 'index'])->name('bookings.index');
        Route::post('/bookings/{booking}/confirm', [PartnerBookingController::class, 'confirm'])->name('bookings.confirm');
        Route::post('/bookings/{booking}/reject', [PartnerBookingController::class, 'reject'])->name('bookings.reject');
    });
});

require __DIR__.'/settings.php';
