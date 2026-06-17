import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  business: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  monthlyOrders: z.string().optional(),
});

const LARAVEL_API = process.env.LARAVEL_API_URL ?? "http://localhost:8000/api/v1";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  try {
    const res = await fetch(`${LARAVEL_API}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: parsed.data.name,
        business: parsed.data.business,
        country: parsed.data.country,
        phone: parsed.data.phone,
        whatsapp: parsed.data.whatsapp,
        monthly_orders: parsed.data.monthlyOrders,
        source: "wholesale",
      }),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: res.ok, ...data }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "Service unavailable." }, { status: 503 });
  }
}
