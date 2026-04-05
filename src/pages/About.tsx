import React from 'react';
import { Footer } from '../components/Footer';

export const About = () => (
  <div className="min-h-screen bg-black text-white p-12 space-y-8 max-w-3xl mx-auto">
    <h1 className="text-4xl font-black">À propos de <span className="text-primary">Sky Player</span></h1>
    <p className="text-zinc-400">Sky Player est né d'un constat simple : les lecteurs IPTV actuels sont souvent lourds, instables et inadaptés aux connexions internet variables en Afrique.</p>
    <p className="text-zinc-400">Nous avons créé une solution légère, rapide et intuitive pour vous permettre de profiter de vos abonnements M3U/Xtream dans les meilleures conditions possibles.</p>
    <p className="text-zinc-400 font-bold">Sky Player n'est qu'un lecteur. Nous ne vendons aucun contenu ni serveur.</p>
    <Footer />
  </div>
);
