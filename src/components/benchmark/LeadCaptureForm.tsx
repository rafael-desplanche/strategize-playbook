import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { email: string; phone: string }) => void;
}

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; phone?: string } = {};
    
    if (!email) {
      newErrors.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    } else if (email.includes("gmail") || email.includes("yahoo") || email.includes("hotmail")) {
      newErrors.email = "Merci d'utiliser votre email professionnel";
    }
    
    if (!phone) {
      newErrors.phone = "Téléphone requis";
    } else if (!/^[\d\s+()-]{8,}$/.test(phone)) {
      newErrors.phone = "Format invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ email, phone });
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-3">
          Commencez votre benchmark
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Découvrez votre position par rapport aux leaders de votre secteur
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <div>
          <Input
            type="email"
            placeholder="Email professionnel"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1 animate-fade-up">{errors.email}</p>
          )}
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1 animate-fade-up">{errors.phone}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 btn-primary text-primary-foreground font-semibold text-lg"
        >
          Démarrer le benchmark
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </form>

      {/* Trust indicators */}
      <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Données sécurisées</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">5 min chrono</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Benchmark temps réel</span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        En continuant, vous acceptez notre politique de confidentialité. 
        Vos données ne seront jamais partagées.
      </p>
    </div>
  );
}
