
import React from 'react';
import { Pizza, Flame, GlassWater, Star, Users, MapPin } from 'lucide-react';
import { MenuItem, StatItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Parmegiana do Casarão",
    description: "Filé mignon premium empanado, coberto com mozzarella gratinada e nosso molho de tomate artesanal fervido na lenha.",
    price: "R$ 138",
    category: "carnes",
    image: "https://drive.google.com/uc?id=1wg2atWjvP3_cJ7imdcFVvC7PGlaL7_UZ" 
  },
  {
    id: 2,
    name: "Pizza de Nutella & Ninho",
    description: "Massa artesanal fina, generosa camada de Nutella genuína com finalização artística em creme de leite ninho.",
    price: "R$ 94",
    category: "pizzas",
    image: "https://drive.google.com/uc?id=1soDqd2pwW_kfo7z8wHTspD8kHjsN0JKx" 
  },
  {
    id: 3,
    name: "Pizza Tradicional XV",
    description: "O clássico que nos consagrou: mozzarella, manjericão fresco da horta e o segredo do nosso molho.",
    price: "R$ 82",
    category: "pizzas",
    image: "https://drive.google.com/uc?id=1XMSPpr3CmSfoM3s1xxFR2KDqPPGuwGK4" 
  },
  {
    id: 4,
    name: "Coquetel Autoral",
    description: "Mixologia clássica com um toque rústico de ingredientes locais e infusões da casa.",
    price: "R$ 45",
    category: "coquetelaria",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000"
  }
];

export const STATS: StatItem[] = [
  { label: "Avaliações no Google", value: "4.8 ★", icon: "Star" },
  { label: "Anos de Tradição", value: "+15", icon: "History" },
  { label: "Clientes Satisfeitos", value: "50k+", icon: "Users" },
  { label: "Ingredientes Locais", value: "100%", icon: "Leaf" }
];
