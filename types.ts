
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'pizzas' | 'carnes' | 'coquetelaria';
  image: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}
