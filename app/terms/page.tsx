import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales",
  description: "Conditions générales d'utilisation et de vente Isla Joya.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory pt-20">
      <article className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
        <p className="eyebrow mb-4">Légal</p>
        <h1 className="font-display text-4xl text-noir">Conditions générales</h1>
        <p className="mt-4 text-sm text-noir/50">Dernière mise à jour : juin 2026</p>

        <div className="prose prose-sm mt-10 text-noir/80 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-noir [&_h2]:mt-8 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions générales régissent l&apos;utilisation du site {site.url} et les relations
            commerciales entre Isla Joya et ses partenaires wholesale.
          </p>

          <h2>2. Commandes wholesale</h2>
          <p>
            Les commandes sont traitées exclusivement via WhatsApp ou email. Toute commande est soumise à
            validation par notre équipe commerciale. Le minimum de commande et les délais sont communiqués
            lors du premier échange.
          </p>

          <h2>3. Prix</h2>
          <p>
            Les prix affichés sont en euros TTC. Isla Joya se réserve le droit de modifier ses tarifs à
            tout moment. Les commandes confirmées sont facturées au prix en vigueur à la date de confirmation.
          </p>

          <h2>4. Livraison</h2>
          <p>
            Les délais de livraison sont communiqués lors de chaque commande. Isla Joya expédie depuis le
            Maroc et l&apos;Espagne. Les frais de port sont calculés selon le volume et la destination.
          </p>

          <h2>5. Retours</h2>
          <p>
            Les bijoux personnalisés ou spécialement fabriqués ne sont pas éligibles au retour.
            Pour tout litige, contactez-nous dans les 14 jours suivant la réception.
          </p>

          <h2>6. Propriété intellectuelle</h2>
          <p>
            Tous les visuels, textes et designs présents sur ce site sont la propriété exclusive d&apos;Isla Joya.
            Toute reproduction est interdite sans accord écrit préalable.
          </p>

          <h2>7. Contact</h2>
          <p>
            Pour toute question :{" "}
            <a href={`mailto:${site.email}`} className="text-gold underline">{site.email}</a>
          </p>
        </div>
      </article>
    </main>
  );
}
