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

    public function create()
    {
        return Inertia::render('Dashboard/Partner/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'rules' => 'nullable|string',
        ]);

        $validated['partner_id'] = Auth::id();

        Kost::create($validated);

        return redirect()->route('partner.dashboard')->with('success', 'Kost berhasil ditambahkan!');
    }

    public function edit(Kost $kost)
    {
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Dashboard/Partner/Edit', [
            'kost' => $kost
        ]);
    }

    public function update(Request $request, Kost $kost)
    {
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'rules' => 'nullable|string',
        ]);

        $kost->update($validated);

        return redirect()->route('partner.dashboard')->with('success', 'Kost berhasil diperbarui!');
    }

    public function destroy(Kost $kost)
    {
        if ($kost->partner_id !== Auth::id()) {
            abort(403);
        }

        $kost->delete();

        return redirect()->route('partner.dashboard')->with('success', 'Kost berhasil dihapus!');
    }
}
