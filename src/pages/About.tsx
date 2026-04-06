import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Card } from '../components/ui';
import { Shield, Zap, Users, Globe, Tv } from 'lucide-react';
import { motion } from 'motion/react';

export const About = () => (
  <div className="min-h-screen bg-black text-white selection:bg-primary/30">
    <Header />
    
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tighter"
        >
          À propos de <span className="text-primary">Sky Player</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          La solution de streaming nouvelle génération, conçue par des passionnés pour répondre aux défis technologiques du continent africain.
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Notre Vision</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Sky Player est né d'un constat simple : les lecteurs IPTV actuels sont souvent trop lourds, instables et inadaptés aux réalités des connexions internet variables en Afrique francophone.
            </p>
            <p>
              Notre mission est de démocratiser l'accès au divertissement numérique de haute qualité en proposant une interface fluide, ultra-rapide et optimisée pour tous les supports : du smartphone à la Smart TV de dernière génération.
            </p>
            <p>
              Nous croyons fermement que la technologie doit s'adapter à l'utilisateur, et non l'inverse. C'est pourquoi Sky Player intègre des algorithmes de mise en cache intelligents pour garantir une lecture sans coupure, même sur des réseaux 3G/4G instables.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-3">
            <Zap className="text-primary" size={32} />
            <span className="text-sm font-bold uppercase tracking-widest">Vitesse</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-3">
            <Shield className="text-primary" size={32} />
            <span className="text-sm font-bold uppercase tracking-widest">Sécurité</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-3">
            <Users className="text-primary" size={32} />
            <span className="text-sm font-bold uppercase tracking-widest">Communauté</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-8 text-center space-y-3">
            <Globe className="text-primary" size={32} />
            <span className="text-sm font-bold uppercase tracking-widest">Afrique</span>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Pourquoi choisir Sky Player ?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Tv size={24} />
            </div>
            <h3 className="text-xl font-bold">Multi-Plateforme</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Compatible avec Android, iOS, Windows, macOS et les Smart TV (Samsung Tizen, LG webOS). Une expérience unifiée sur tous vos écrans.
            </p>
          </Card>
          <Card className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Zéro Latence</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Chargement instantané des listes de lecture et zapping ultra-rapide. Notre moteur de rendu est le plus performant du marché.
            </p>
          </Card>
          <Card className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">Confidentialité</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Nous ne stockons aucune donnée de navigation. Vos listes de lecture restent privées et sécurisées sur votre appareil.
            </p>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Nos Valeurs Fondamentales</h2>
            <p className="text-zinc-400 leading-relaxed">
              Chez Sky Player, nous ne nous contentons pas de coder des applications. Nous bâtissons des ponts entre la technologie et les utilisateurs.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Innovation Inclusive</h4>
                  <p className="text-sm text-zinc-500">Développer des solutions qui fonctionnent partout, peu importe la qualité du réseau.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Transparence Totale</h4>
                  <p className="text-sm text-zinc-500">Être clair sur notre rôle de fournisseur d'outils et non de contenu.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Excellence Technique</h4>
                  <p className="text-sm text-zinc-500">Rechercher constamment la performance maximale et la consommation minimale de ressources.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Card className="h-full flex flex-col justify-center p-10 bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
              <h3 className="text-2xl font-black mb-4 italic text-primary">"La technologie au service de l'émotion."</h3>
              <p className="text-zinc-400 leading-relaxed">
                Nous croyons que le streaming est plus qu'une simple transmission de données ; c'est un moment de partage, de découverte et de détente. Notre rôle est de rendre ce moment invisible techniquement pour qu'il soit inoubliable émotionnellement.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Comment ça marche ?</h2>
          <p className="text-zinc-500">Trois étapes simples pour transformer votre écran en cinéma.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative space-y-4 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-2xl font-black text-primary mx-auto border border-zinc-800">1</div>
            <h4 className="font-bold">Installation</h4>
            <p className="text-sm text-zinc-500">Téléchargez l'application sur votre store favori ou via notre APK direct.</p>
          </div>
          <div className="relative space-y-4 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-2xl font-black text-primary mx-auto border border-zinc-800">2</div>
            <h4 className="font-bold">Configuration</h4>
            <p className="text-sm text-zinc-500">Ajoutez votre lien M3U ou vos identifiants Xtream fournis par votre opérateur.</p>
          </div>
          <div className="relative space-y-4 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-2xl font-black text-primary mx-auto border border-zinc-800">3</div>
            <h4 className="font-bold">Streaming</h4>
            <p className="text-sm text-zinc-500">Profitez de vos chaînes, films et séries préférés en haute définition.</p>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6">
        <h2 className="text-2xl font-bold text-primary italic uppercase tracking-widest">Avertissement Important</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-zinc-300">
          <p className="text-lg font-medium">
            Sky Player est exclusivement un lecteur multimédia (Media Player).
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Nous ne fournissons, ne vendons et n'hébergeons aucun contenu audiovisuel, aucune liste de lecture (playlist) ni aucun abonnement IPTV. 
            L'utilisateur est seul responsable du contenu qu'il ajoute à l'application. Sky Player n'est affilié à aucun fournisseur de contenu tiers et ne cautionne pas le streaming de contenu protégé par le droit d'auteur sans l'autorisation du détenteur des droits.
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);
