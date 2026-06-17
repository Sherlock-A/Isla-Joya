import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { slug, type } = await req.json().catch(() => ({}));

  revalidatePath("/", "layout");
  revalidatePath("/products", "layout");
  revalidatePath("/collections", "layout");
  revalidateTag("products", "max");

  if (slug) {
    revalidatePath(`/products/${slug}`);
  }

  return NextResponse.json({ ok: true, revalidated: true });
}
