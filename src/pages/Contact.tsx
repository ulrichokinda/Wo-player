import React from 'react';
import { Card, Input, Textarea, Button } from '../components/ui';
import { Footer } from '../components/Footer';

export const Contact = () => (
  <div className="min-h-screen bg-black text-white p-12 max-w-xl mx-auto space-y-8">
    <h1 className="text-4xl font-black">Contactez-nous</h1>
    <Card className="space-y-4">
      <Input label="Nom" />
      <Input label="Email" />
      <Textarea label="Message" />
      <Button fullWidth>Envoyer</Button>
    </Card>
    <p className="text-center text-zinc-500">Ou rejoignez notre support sur WhatsApp : <span className="text-primary">+221 XX XXX XXXX</span></p>
    <Footer />
  </div>
);
