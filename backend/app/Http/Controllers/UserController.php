<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function profile(Request $request)
    {
        $user = $request->user();
        $totalComments = $user->comments()->count();
        $contributions = $user->comments()->whereHas('post', function ($query) use ($user) {
            $query->where('user_id', '!=', $user->id);
        })->count();

        return response()->json([
            'user' => $user,
            'total_comments' => $totalComments,
            'contributions' => $contributions
        ]);
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    public function posts(Request $request)
    {
        $posts = $request->user()
            ->posts()
            ->with(['tags'])
            ->latest()
            ->paginate(10);

        return response()->json($posts);
    }

    public function drafts(Request $request)
    {
        $drafts = $request->user()
            ->posts()
            ->where('is_published', false)
            ->with(['tags'])
            ->latest()
            ->paginate(10);

        return response()->json($drafts);
    }
}
