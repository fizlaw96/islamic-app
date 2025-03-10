<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Ensure the user is logged in
        if (!Auth::check()) {
            return redirect('/login');
        }

        // Check if the user's role is in the allowed roles
        if (!in_array(Auth::user()->role, $roles)) {
            abort(403, 'Unauthorized access');
        }

        return $next($request);
    }
}
