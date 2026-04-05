import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const Header = () => (
  <header className="p-6">
    <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors">
      <ArrowLeft size={20} />
      <span>Accueil</span>
    </Link>
  </header>
);
