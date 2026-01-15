import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  Users, 
  Target, 
  CheckCircle2,
  ArrowRight,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface WorkshopModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: "landing" | "methodology" | "results";
  maturityLevel?: number;
}

export function WorkshopModal({ 
  open, 
  onOpenChange, 
  context = "landing",
  maturityLevel 
}: WorkshopModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    challenge: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Demande envoyée", {
      description: "Un expert vous contactera sous 24h pour planifier votre workshop."
    });
    
    setIsSubmitting(false);
    setFormData({ name: "", email: "", company: "", challenge: "" });
    onOpenChange(false);
  };

  const benefits = [
    "Approfondir les résultats de votre assessment",
    "Identifier vos zones de risque et d'opportunité",
    "Définir une roadmap data adaptée à vos enjeux",
    "Découvrir les synergies avec l'écosystème Databricks"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            Workshop exécutif Data & IA
          </DialogTitle>
          <DialogDescription className="text-base">
            Un atelier structuré de 90 minutes pour clarifier votre maturité data, 
            vos risques et vos leviers de valeur.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Left: Benefits */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-4">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                À qui s'adresse ce workshop ?
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• CEO, CFO, CTO, CDO</li>
                <li>• Directeurs de la transformation</li>
                <li>• Responsables data & analytics</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Ce que vous en retirerez
              </h3>
              <ul className="space-y-2">
                {benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                90 minutes
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Visio ou présentiel
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sur RDV
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workshop-name">Nom complet *</Label>
              <Input
                id="workshop-name"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop-email">Email professionnel *</Label>
              <Input
                id="workshop-email"
                type="email"
                placeholder="jean@entreprise.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop-company">Entreprise *</Label>
              <Input
                id="workshop-company"
                placeholder="Nom de votre entreprise"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workshop-challenge">
                Enjeu principal <span className="text-muted-foreground">(optionnel)</span>
              </Label>
              <Textarea
                id="workshop-challenge"
                placeholder="Décrivez brièvement votre contexte ou vos questions..."
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                disabled={isSubmitting}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-primary text-primary-foreground font-semibold py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Demander un créneau
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Un expert vous contactera sous 24h pour planifier le workshop.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
