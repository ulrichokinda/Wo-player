import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui';
import { Footer } from '../components/Footer';

export const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const plans = [
    { name: '10 Crédits', price: 15000, credits: 10 },
    { name: '20 Crédits', price: 25750, credits: 20 },
    { name: '50 Crédits', price: 45000, credits: 50 }
  ];

  const paymentMethods = [
    'MTN Mobile Money', 'Orange Money', 'Wave', 'Moov Money', 'Airtel Money', 'Free Money'
  ];

  const handlePayment = async () => {
    if (!selectedPlan || !phoneNumber || !paymentMethod) return alert('Veuillez choisir un pack, un moyen de paiement et entrer votre numéro');
    
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          amount: selectedPlan.price,
          phoneNumber,
          credits_purchased: selectedPlan.credits,
          paymentMethod
        }),
      });
      const data = await response.json();
      alert(data.message || 'Paiement initié. Veuillez valider sur votre téléphone.');
    } catch (error) {
      alert('Erreur lors du paiement');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 space-y-12">
      <h1 className="text-4xl md:text-5xl font-black text-center">Choisir un <span className="text-primary">Pack</span></h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <Card 
            key={plan.name} 
            className={`flex flex-col items-center gap-6 p-8 cursor-pointer transition-all ${selectedPlan?.name === plan.name ? 'border-primary' : 'border-zinc-800'}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-4xl font-black">{plan.price.toLocaleString()} FCFA</p>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <Card className="max-w-xl mx-auto space-y-6">
          <h2 className="text-xl font-bold">Paiement Mobile Money</h2>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map(method => (
              <Button 
                key={method} 
                variant={paymentMethod === method ? 'primary' : 'outline'} 
                onClick={() => setPaymentMethod(method)}
                className="text-[10px]"
              >
                {method}
              </Button>
            ))}
          </div>
          <Input label="Numéro de téléphone" value={phoneNumber} onChange={(e: any) => setPhoneNumber(e.target.value)} placeholder="Ex: 6XXXXXXXX" />
          <Button fullWidth onClick={handlePayment}>Payer {selectedPlan.price.toLocaleString()} FCFA</Button>
        </Card>
      )}
      <Footer />
    </div>
  );
};
