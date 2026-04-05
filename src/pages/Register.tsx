import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button, Input } from '../components/ui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Footer } from '../components/Footer';

const COUNTRIES = [
  'Bénin', 'Burkina Faso', 'Burundi', 'Cameroun', 'Centrafrique', 'Comores', 
  'Congo-Brazzaville', 'RDC', 'Côte d\'Ivoire', 'Djibouti', 'Gabon', 'Guinée', 
  'Guinée Équatoriale', 'Madagascar', 'Mali', 'Maroc', 'Maurice', 'Mauritanie', 
  'Niger', 'Rwanda', 'Sénégal', 'Seychelles', 'Tchad', 'Togo', 'Tunisie'
];

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to our backend
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email,
          username,
          phone,
          country,
          role: 'client'
        }),
      });

      alert('Inscription réussie !');
      navigate('/dashboard');
    } catch (error: any) {
      alert('Erreur : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <Logo size={60} className="mb-8" />
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h2 className="text-2xl font-black mb-6">Créer un compte</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="Nom d'utilisateur" value={username} onChange={(e: any) => setUsername(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          <Input label="Mot de passe" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
          <Input label="Téléphone" value={phone} onChange={(e: any) => setPhone(e.target.value)} required />
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400">Pays</label>
            <select 
              value={country} 
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm focus:border-primary outline-none"
            >
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <Button type="submit" className="w-full mt-4" loading={loading}>S'inscrire</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
