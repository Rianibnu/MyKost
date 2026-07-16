<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KostController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Partner\KostController as PartnerKostController;

Route::get('/', [KostController::class, 'home'])->name('home');
Route::get('/kosts', [KostController::class, 'index'])->name('kosts.index');
Route::get('/kosts/{kost}', [KostController::class, 'show'])->name('kosts.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    
    // User routes
    Route::post('/kosts/{room}/book', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/my-bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::post('/my-bookings/{booking}/pay', [BookingController::class, 'pay'])->name('bookings.pay');

    // Partner routes
    Route::prefix('partner')->name('partner.')->group(function () {
        Route::get('/dashboard', [PartnerKostController::class, 'dashboard'])->name('dashboard');
        Route::resource('kosts', PartnerKostController::class);
    });
});

require __DIR__.'/settings.php';
