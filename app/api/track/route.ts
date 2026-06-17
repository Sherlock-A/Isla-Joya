import { NextResponse } from "next/server";

const LARAVEL_API = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // fire-and-forget — don't await
    fetch(`${LARAVEL_API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // analytics must never break the page
  }

  return new NextResponse(null, { status: 204 });
}
