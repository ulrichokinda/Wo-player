import React from 'react';
import { Footer } from '../components/Footer';

export const Privacy = () => (
  <div className="min-h-screen bg-black text-white p-12 max-w-3xl mx-auto space-y-6">
    <h1 className="text-4xl font-black">Confidentialité</h1>
    <p className="text-zinc-400">Nous protégeons vos données personnelles. Nous ne collectons que l'email, le téléphone et les préférences de bouquet pour améliorer votre expérience.</p>
    <p className="text-zinc-400">Vos paiements sont sécurisés par nos partenaires locaux (Mobile Money).</p>
    <Footer />
  </div>
);
