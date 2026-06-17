<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'          => 'required|string|min:2|max:100',
            'email'         => 'nullable|email|max:255',
            'business'      => 'nullable|string|max:150',
            'country'       => 'nullable|string|max:80',
            'phone'         => 'required|regex:/^[+]?[0-9\s\-]{5,25}$/',
            'whatsapp'      => 'nullable|regex:/^[+]?[0-9\s\-]{5,25}$/',
            'monthly_orders'=> 'nullable|string|max:50',
        ]);

        $lead = Lead::create(array_merge($validated, [
            'source' => $request->input('source', 'wholesale'),
            'status' => 'new',
        ]));

        Mail::to(config('mail.from.address'))->queue(new NewLeadMail($lead));

        return response()->json(['ok' => true, 'id' => $lead->id], 201);
    }
}
