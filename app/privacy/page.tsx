import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Isla Joya collecte et utilise vos données personnelles.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory pt-20">
      <article className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
        <p className="eyebrow mb-4">Légal</p>
        <h1 className="font-display text-4xl text-noir">Politique de confidentialité</h1>
        <p className="mt-4 text-sm text-noir/50">Dernière mise à jour : juin 2026</p>

        <div className="prose prose-sm mt-10 text-noir/80 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-noir [&_h2]:mt-8 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
          <h2>1. Responsable du traitement</h2>
          <p>
            Isla Joya — Maison de Joaillerie, joignable à{" "}
            <a href={`mailto:${site.email}`} className="text-gold underline">{site.email}</a>.
          </p>

          <h2>2. Données collectées</h2>
          <ul>
            <li>Données de navigation (pages visitées, événements de clic) via Google Analytics 4</li>
            <li>Données de contact fournies via le formulaire wholesale (nom, email, téléphone, entreprise, pays)</li>
            <li>Adresse email pour les notifications early access (formulaire footer)</li>
          </ul>

          <h2>3. Finalités</h2>
          <ul>
            <li>Améliorer l&apos;expérience utilisateur et analyser les performances du site</li>
            <li>Répondre aux demandes wholesale et qualifier les partenaires potentiels</li>
            <li>Envoyer des notifications d&apos;accès anticipé (avec consentement explicite)</li>
          </ul>

          <h2>4. Cookies et traceurs</h2>
          <p>
            Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) et, si vous y consentez,
            des pixels publicitaires (Meta, TikTok). Vous pouvez retirer votre consentement à tout moment
            via la bannière cookie.
          </p>

          <h2>5. Conservation</h2>
          <p>
            Les données de contact wholesale sont conservées 3 ans à compter du dernier contact.
            Les données analytiques sont anonymisées après 14 mois.
          </p>

          <h2>6. Vos droits (RGPD)</h2>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données.
            Pour toute demande, contactez-nous à{" "}
            <a href={`mailto:${site.email}`} className="text-gold underline">{site.email}</a>.
          </p>

          <h2>7. Sous-traitants</h2>
          <ul>
            <li>Google Analytics 4 (mesure d&apos;audience)</li>
            <li>Brevo (envoi d&apos;emails transactionnels)</li>
          </ul>
        </div>
      </article>
    </main>
  );
}
