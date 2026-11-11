export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: string;
  image: string;
  tag?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviews: number;
  etaMinutes: string;
  distanceKm: number;
  image: string;
  discount: number;
  badge: string;
  openHours: string;
  deliveryFeeCents: number;
  menu: MenuItem[];
};

export type CartItem = MenuItem & {
  quantity: number;
  restaurantId: string;
};
