import { fetchSiteSettings } from "@/lib/products";

export async function AnnouncementBanner() {
  const settings = await fetchSiteSettings();
  const text = settings.announcement;
  if (!text) return null;

  return (
    <div className="bg-gold py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-noir">
      {text}
    </div>
  );
}
