import type { ReactNode } from "react";

export default function LegalPage({ title, introduction, children }: { title: string; introduction: string; children: ReactNode }) {
  return <main className="mj-legal-page" lang="fr">
    <header className="mj-legal-header">
      <a className="mj-legal-logo" href="/boutique" aria-label="Retour à YAJI MOVE"><img src="/brand/jy-mark.svg" alt="" width={34} height={52} /><span>YAJI MOVE<small>Yallah, aji move</small></span></a>
      <a className="mj-legal-back" href="/boutique">← Retour à la boutique</a>
    </header>
    <div className="mj-legal-content">
      <p className="mj-legal-eyebrow">YAJI MOVE · INFORMATIONS CLIENTS</p>
      <h1>{title}</h1>
      <p className="mj-legal-intro">{introduction}</p>
      {children}
      <section className="mj-legal-contact" aria-label="Contacter YAJI MOVE">
        <h2>Besoin d&apos;une précision ?</h2>
        <p>Pour une commande, une réclamation ou l&apos;exercice de vos droits, contactez YAJI MOVE via le lien WhatsApp disponible dans la boutique.</p>
        <a href="/boutique#contact">Contacter YAJI MOVE →</a>
      </section>
    </div>
    <footer className="mj-legal-footer">
      <a href="/boutique">Boutique</a>
      <a href="/boutique/suivi">Suivre ma commande</a>
      <a href="/boutique/mentions-legales">Mentions légales</a>
      <a href="/boutique/confidentialite">Confidentialité</a>
      <a href="/boutique/livraison-retours">Livraison et paiement</a>
      <a href="/boutique/conditions-vente">Conditions de vente</a>
    </footer>
  </main>;
}
