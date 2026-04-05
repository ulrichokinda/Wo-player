import React from 'react';
import { Footer } from '../components/Footer';

const faqs = [
  { q: "Où puis-je télécharger Sky Player depuis ?", a: "Notre application est disponible en téléchargement sur le magasin Samsung Tizen TV et le Play Store." },
  { q: "Le lecteur Sky Player contient-il des chaînes et d'où puis-je obtenir une liste de lecture ?", a: "Non, Sky Player est un pur lecteur de media où vous pouvez exécuter votre liste de lecture. De cette façon, nous fournissons un lecteur sans contenu de chaînes. De plus, les développeurs d'applications ne sont pas responsables du contenu téléchargé sur Sky Player." },
  { q: "Les frais d'application sont-ils payés mensuellement ?", a: "Sky Player peut être activé après des frais uniques de 4 675 F pour chaque téléviseur/appareil, ou 2 000 F pour 1 an. Vous n'avez pas besoin de payer de frais futurs." },
  { q: "Comment puis-je verrouiller l'adresse MAC de mon téléviseur ?", a: "Vous pouvez verrouiller votre adresse MAC dans les paramètres de l'application en utilisant le bouton Verrouiller MAC pour éviter que votre liste de lecture ne soit réinitialisée par quelqu'un d'autre ou si vous avez partagé votre adresse MAC avec un tiers." },
  { q: "Que se passe-t-il si je télécharge une mauvaise liste/lien M3U ?", a: "Si vous téléchargez une liste non active, l'application vous avertira par un message qui apparaîtra sur votre téléviseur." }
];

export const FAQ = () => (
  <div className="min-h-screen bg-black text-white p-12 max-w-3xl mx-auto space-y-8">
    <h1 className="text-4xl font-black">Questions fréquemment posées</h1>
    <div className="space-y-6">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-lg font-bold text-primary mb-2">{faq.q}</h3>
          <p className="text-zinc-400">{faq.a}</p>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);
