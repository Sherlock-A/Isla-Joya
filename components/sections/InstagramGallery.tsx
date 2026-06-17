import Image from "next/image";
import { Heart } from "lucide-react";
import { site } from "@/lib/site";
import { fetchInstagramPosts } from "@/lib/products";
import { InstagramGlyph } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const grad: Record<number, string> = {
  0: "linear-gradient(150deg,#efe2c2,#c6a15b)",
  1: "linear-gradient(150deg,#ecd6d6,#c08081)",
  2: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  3: "linear-gradient(150deg,#3a3026,#17120d)",
  4: "linear-gradient(150deg,#efe0d1,#d9bca5)",
  5: "linear-gradient(150deg,#ffffff,#e4d8c6)",
  6: "linear-gradient(150deg,#f4e8cd,#e7d3a9)",
  7: "linear-gradient(150deg,#efe2c2,#c6a15b)",
};

const stripes =
  "repeating-linear-gradient(115deg, rgba(255,255,255,0.16) 0 1.5px, transparent 1.5px 13px)";

export async function InstagramGallery() {
  const posts = await fetchInstagramPosts();

  return (
    <section className="bg-pearl/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="@isla.joya"
          title={
            <>
              Follow the <span className="gold-text">light</span>
            </>
          }
          subtitle="Styling, new drops and behind-the-scenes — from Casablanca to Barcelona."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {posts.length > 0
            ? posts.slice(0, 8).map((post, i) => (
                <a
                  key={post.id}
                  href={post.post_url ?? site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl"
                  aria-label={post.caption ?? "Voir sur Instagram"}
                >
                  <Image
                    src={post.image_url}
                    alt={post.caption ?? `Isla Joya Instagram post ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-noir/80 via-noir/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {post.caption && (
                      <div className="translate-y-2 px-3 pb-3 transition-transform duration-500 group-hover:translate-y-0">
                        <p className="line-clamp-2 text-[11px] leading-snug text-ivory/90">
                          {post.caption}
                        </p>
                        <span className="mt-1.5 flex items-center gap-1 text-[11px] text-ivory/60">
                          <Heart className="h-3 w-3 fill-rose text-rose" />
                          {post.likes.toLocaleString("fr-FR")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Instagram icon on hover */}
                  <div className="absolute right-2.5 top-2.5 rounded-full bg-noir/60 p-1.5 opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                    <InstagramGlyph className="h-4 w-4 text-ivory" />
                  </div>
                </a>
              ))
            : /* Fallback gradient tiles when no posts seeded */
              Array.from({ length: 8 }).map((_, i) => (
                <a
                  key={i}
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-xl"
                  style={{ background: grad[i] }}
                  aria-label="Open Isla Joya on Instagram"
                >
                  <div className="absolute inset-0" style={{ backgroundImage: stripes }} />
                  <div className="absolute inset-0 grid place-items-center bg-noir/0 transition duration-500 group-hover:bg-noir/40">
                    <InstagramGlyph className="h-7 w-7 text-ivory opacity-0 transition duration-500 group-hover:opacity-100" />
                  </div>
                </a>
              ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" href={site.instagram} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </Button>
        </div>
      </div>
    </section>
  );
}
