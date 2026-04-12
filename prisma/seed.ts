import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const watches = [
    {
      name: 'Aurum Chronograph',
      brand: 'Aurum',
      slug: 'aurum-chronograph',
      price: '$12,500',
      image: '/apex-front.jpg',
      description: 'Classic chronograph with 18k gold case and sapphire crystal.',
      stock: 5,
    },
    {
      name: 'Celestial Tourbillon',
      brand: 'Celeste',
      slug: 'celestial-tourbillon',
      price: '$89,000',
      image: '/macro-watch.jpg',
      description: 'High‑precision tourbillon movement with meteorite dial.',
      stock: 2,
    },
    {
      name: 'Midnight Diver',
      brand: 'DeepSea',
      slug: 'midnight-diver',
      price: '$9,800',
      image: '/luna-front.jpg',
      description: 'Professional dive watch rated to 1000m with helium escape valve.',
      stock: 10,
    },
    {
      name: 'Regatta Racer',
      brand: 'Marina',
      slug: 'regatta-racer',
      price: '$15,200',
      image: '/watch1.jpg',
      description: 'Yacht‑timer complication with flyback chronograph.',
      stock: 4,
    },
    {
      name: 'Heritage Pilot',
      brand: 'Aero',
      slug: 'heritage-pilot',
      price: '$7,300',
      image: '/richard-front.jpg',
      description: 'Vintage-style pilot watch with Breguet numerals.',
      stock: 8,
    },
    {
      name: 'Solar Eclipse',
      brand: 'Photon',
      slug: 'solar-eclipse',
      price: '$22,000',
      image: '/Apex_Watche.webp',
      description: 'Limited edition with black ceramic case and solar dial.',
      stock: 3,
    },
  ];

  for (const watch of watches) {
    await prisma.product.upsert({
      where: { slug: watch.slug },
      update: watch, // update entire record so new images/fields are applied
      create: watch,
    });
  }

  console.log('Seeded', watches.length, 'products');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
