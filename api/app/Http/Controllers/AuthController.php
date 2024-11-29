<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->numbers()
                    ->letters()
                    ->mixedCase()
                    ->symbols()
            ],
            'password_confirmation' => 'required'
        ]);

        $user = User::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'You have successfully registered your account.',
            'data' => [
                'user' => $user,
            ],
            'errors' => [],
            'timestamp' => now(),
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 'fail',
                'message' => 'The entered email is not found.',
                'data' => [],
                'errors' => [
                    'email' => [
                        'This email is not registered.'
                    ]
                ],
                'timestamp' => now(),
            ], 422);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Invalid credentials provided.',
                'data' => [],
                'errors' => [],
                'timestamp' => now(),
            ], 401);
        }

        // Generate unique token to be given to user
        $token = $user->createToken($user->name);

        return response()->json([
            'status' => 'success',
            'message' => 'You have logged in successfully.',
            'data' => [
                'user' => $user,
                'token' => $token->plainTextToken
            ],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'You are now logged out.',
            'data' => [],
            'errors' => [],
            'timestamp' => now(),
        ]);
    }
}
