import { NextRequest, NextResponse } from "next/server";

const LARAVEL = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await fetch(`${LARAVEL}/click-heatmaps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Silent fail — heatmap is non-critical
  }
  return NextResponse.json({ ok: true });
}
