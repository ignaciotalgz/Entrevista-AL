<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

//---INERTIA
use Inertia\Inertia;
use Inertia\Response;
//---

class UserController extends Controller
{
    public function index(): Response 
    {
        $usuarios = User::all();
        return Inertia::render('Usuarios/Index', [
            'usuarios' => $usuarios,
        ]);
    }
}
