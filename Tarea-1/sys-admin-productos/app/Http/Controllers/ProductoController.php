<?php

namespace App\Http\Controllers;

use App\Models\Producto;

use Illuminate\Http\RedirectResponse;

use Illuminate\Http\Request;
//use Iluminate\Http\Response; COMUN

use Illuminate\Support\Facades\Gate;

//---INERTIA
use Inertia\Inertia;
use Inertia\Response;
//---

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Productos/Index', [
            'productos' => Producto::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'descripcion' => 'required|string|max:255',
            'nombre' => 'required|string',
            'precio' => 'required|numeric',
            'stock' => 'required|numeric',
        ]);
 
        $request->user()->productos()->create($validated);
 
        return redirect(route('productos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto): RedirectResponse
    {
        Gate::authorize('update', $producto);
 
        $validated = $request->validate([
            'descripcion' => 'required|string|max:255',
            'nombre' => 'required|string',
            'precio' => 'required|numeric',
            'stock' => 'required|numeric',
        ]);
 
        $producto->update($validated);
 
        return redirect(route('productos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto): RedirectResponse {
        Gate::authorize('delete', $producto);
 
        $producto->delete();
 
        return redirect(route('productos.index'));
    }
}
