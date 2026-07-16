<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KostController extends Controller
{
    public function home()
    {
        return Inertia::render('welcome');
    }

    public function index(Request $request)
    {
        $query = Kost::query();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where('city', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
        }

        $kosts = $query->with('rooms')->latest()->get();

        return Inertia::render('Kosts/Index', [
            'kosts' => $kosts,
            'filters' => $request->only('search'),
        ]);
    }

    public function show(Kost $kost)
    {
        $kost->load(['rooms', 'partner']);
        return Inertia::render('Kosts/Show', [
            'kost' => $kost,
        ]);
    }
}
