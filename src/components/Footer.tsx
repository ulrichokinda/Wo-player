import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-zinc-800 mt-12 py-8 text-center text-zinc-500 text-sm">
    <div className="flex justify-center gap-6 mb-4">
      <Link to="/about" className="hover:text-primary">À propos</Link>
      <Link to="/contact" className="hover:text-primary">Contact</Link>
      <Link to="/privacy" className="hover:text-primary">Confidentialité</Link>
      <Link to="/faq" className="hover:text-primary">FAQ</Link>
    </div>
    <p>© 2026 Sky Player. Tous droits réservés.</p>
  </footer>
);
