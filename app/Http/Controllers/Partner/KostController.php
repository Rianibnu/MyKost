<?php

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class KostController extends Controller
{
    public function dashboard()
    {
        $kosts = Kost::where('partner_id', Auth::id())->withCount('rooms')->get();
        return Inertia::render('Dashboard/Partner/Index', [
            'kosts' => $kosts
        ]);
    }

    public function index()
    {
        return redirect()->route('partner.dashboard');
    }
}
