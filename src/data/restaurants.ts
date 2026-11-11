import type { Restaurant } from '@/types';

export const restaurants: Restaurant[] = [
  {
    id: 'pizza-mojo',
    name: 'Pizza Mojo',
    cuisine: ['Pica', 'Italiana'],
    rating: 4.8,
    reviews: 1246,
    etaMinutes: '15-20 min',
    distanceKm: 1.2,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    discount: 10,
    badge: 'Popullore',
    openHours: '11:00–22:30',
    deliveryFeeCents: 300,
    menu: [
      {
        id: 'pm-classic',
        name: 'Pizza Klasike',
        description: 'Salcë domate, mozzarella, basilik dhe vaj ulliri.',
        priceCents: 690,
        category: 'Pica klasike',
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
        tag: 'Popullore',
      },
      {
        id: 'pm-special',
        name: 'Pizza Speciale',
        description: 'Muzdaga, proshutë, qepë, kaper, dhe djath.',
        priceCents: 840,
        category: 'Pica speciale',
        image:
          'https://images.unsplash.com/photo-1548365328-9f547fb9587c?auto=format&fit=crop&w=700&q=80',
        tag: 'Më e kërkuar',
      },
      {
        id: 'pm-cola',
        name: 'Coca-Cola 0.5L',
        description: 'Pije e freskët me gaz.',
        priceCents: 170,
        category: 'Pije',
        image:
          'https://images.unsplash.com/photo-1622483767028-3f66f2b0c3f2?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'pm-salad',
        name: 'Salatë Caesar',
        description: 'Ushqim i freskët me sallatë, kripë, vezë dhe perime.',
        priceCents: 520,
        category: 'Sallata',
        image:
          'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
  {
    id: 'sushi-o',
    name: 'Sushi O',
    cuisine: ['Sushi', 'Japoneze'],
    rating: 4.9,
    reviews: 980,
    etaMinutes: '20-25 min',
    distanceKm: 2.1,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    discount: 15,
    badge: 'Më e vlerësuara',
    openHours: '12:00–23:00',
    deliveryFeeCents: 350,
    menu: [
      {
        id: 'so-roll',
        name: 'Salmon Roll',
        description: 'Rul lope e salmone dhe avokado.',
        priceCents: 760,
        category: 'Roll',
        image:
          'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'so-nigiri',
        name: 'Nigiri mix',
        description: 'Të freskëta me salmone, tuna dhe ton.',
        priceCents: 980,
        category: 'Nigiri',
        image:
          'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'so-miso',
        name: 'Supa Miso',
        description: 'Supa tradicionale me perime dhe sojë.',
        priceCents: 260,
        category: 'Supa',
        image:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
  {
    id: 'burger-bistro',
    name: 'Burger Bistro',
    cuisine: ['Burger', 'American'],
    rating: 4.7,
    reviews: 760,
    etaMinutes: '12-18 min',
    distanceKm: 0.9,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    discount: 12,
    badge: 'Oferta',
    openHours: '10:30–21:30',
    deliveryFeeCents: 250,
    menu: [
      {
        id: 'bb-classic',
        name: 'Classic Burger',
        description: 'Mish, djathë, sallatë dhe qepë.',
        priceCents: 540,
        category: 'Burger',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'bb-chicken',
        name: 'Chicken Burger',
        description: 'Pulë e skuqur me salcë të butë.',
        priceCents: 500,
        category: 'Burger',
        image:
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'bb-fries',
        name: 'Pomfrit',
        description: 'Pomfrit të skuqura me kripë.',
        priceCents: 220,
        category: 'Sidet',
        image:
          'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
  {
    id: 'pasta-locale',
    name: 'Pasta Locale',
    cuisine: ['Pasta', 'Italiana'],
    rating: 4.6,
    reviews: 620,
    etaMinutes: '18-25 min',
    distanceKm: 1.8,
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80',
    discount: 8,
    badge: 'Shëndetshme',
    openHours: '12:00–22:00',
    deliveryFeeCents: 300,
    menu: [
      {
        id: 'pl-alfredo',
        name: 'Pasta Alfredo',
        description: 'Pasta me krem, parmigiano dhe piper.',
        priceCents: 720,
        category: 'Pasta',
        image:
          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'pl-bolognese',
        name: 'Pasta Bolognese',
        description: 'Salcë e mishit me domate dhe erëza.',
        priceCents: 760,
        category: 'Pasta',
        image:
          'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=700&q=80',
      },
      {
        id: 'pl-gelato',
        name: 'Gelato',
        description: 'Ëmbëlsirë e freskët e bërë me pensilina.',
        priceCents: 280,
        category: 'Ëmbëlsira',
        image:
          'https://images.unsplash.com/photo-1570197788417-0e823ef4b9d2?auto=format&fit=crop&w=700&q=80',
      },
    ],
  },
];

export function formatMoney(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}
